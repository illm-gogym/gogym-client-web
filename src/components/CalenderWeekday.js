import React from 'react';
import $ from "jquery";
import {Icon} from "asset/js/icon";
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import {getAuthToken, getAuthTrainerId} from 'Util/Authentication';
import {dateFormatResetWithTime, dateFormatReset} from 'Util/DateFormat';
import axios from "axios";

const palette = [];

class CalendarWeekday extends React.Component {

	constructor(props) {
		super(props);
		this.calendarRef = React.createRef();
		this.state = {
			calenderOption: {
				viewType: "Week",
				headerDateFormat: `yyyy-MM-d`, //dddd_d
				headerHeight: '60',
				durationBarVisible: true,
				cellHeight: '15',
				startDate: this.makeNewDate(new Date()),
				events: [
					// {
					// 	id: 1,
					// 	text: "Event 1",
					// 	start: "2022-12-07T10:30:00",
					// 	end: "2022-12-07T11:30:00",
					//  backColor: "#6aa84f"
					// }
				],
				onBeforeEventRender: args => {
					// console.log(args);
				},
				onTimeRangeSelected : args => {
					// this.calendar.message("Selected range: " + args.start.toString("hh:mm tt") + " - " + args.end.toString("hh:mm tt"));
					// console.log(args.start);
					// console.log(args.end);
				},
				afterRender : args => {
				},
				onEventMove : args => {
				}
			},
			periodStartDate: '',
			periodEndDate: ''
		};
	}

	makeNewDate = (now) => {
		return new Date(now.getFullYear(), now.getMonth(), now.getDate())
	}

	get calendar() {
		return this.calendarRef.current.control;
	}

	onPressArrowLeft = () => {
		const date = this.state.calenderOption.startDate,
		newDate = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
		this.setState({
			calenderOption: {
				...this.state.calenderOption,
				startDate: newDate
			},
			periodStartDate: new Date(this.state.periodStartDate.getTime() - 7 * 24 * 60 * 60 * 1000),
			periodEndDate: new Date(this.state.periodEndDate.getTime() - 7 * 24 * 60 * 60 * 1000),
		})
	}

	onPressArrowRight = () => {
		const date = this.state.calenderOption.startDate,
			newDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
		this.setState({
			calenderOption: {
				...this.state.calenderOption,
				startDate: newDate
			},
			periodStartDate: new Date(this.state.periodStartDate.getTime() + 7 * 24 * 60 * 60 * 1000),
			periodEndDate: new Date(this.state.periodEndDate.getTime() + 7 * 24 * 60 * 60 * 1000),
		})
	}

	setChangeHeader = () => {
		const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
		let start= '', end= '';
		$('.calendar_default_colheader_inner').each(function (index, item) {
			const text = $(item).text();
			const date = new Date(text);
			let today = new Date();
			today = new Date(dateFormatResetWithTime(today));
			let checkToday = date.getTime() === today.getTime() ? true: false;

			let changeText = `<span class='day ${ checkToday? 'today': ''}'>${WEEKDAY[index]}</span> <strong class='num ${ checkToday? 'today': ''}'>${text.split('-')[2]}</strong>`;
			$(item).html(changeText);
		});
	}

	setInitPeriod() {
		const endDate = new Date(this.calendar.visibleEnd().value);
		this.setState({
			periodStartDate: this.calendar.visibleStart(),
			periodEndDate: new Date(endDate.setDate(endDate.getDate() - 1)),
		});
	}

	dateCalenderTime = (val) => {
		const date = new Date(val);
		let hour = date.getHours();
		let minute = date.getMinutes();

		hour = hour >= 10 ? hour : '0' + hour;
		minute = minute >= 10 ? minute : '0' + minute;

		return hour + ':' + minute;
	}

	makeTaskList = (dataList) => {
		dataList.map((value, index) => {
				value.id = value.reservation.reservation_id;
				value.text = `${value.user.name}
				 			(${this.dateCalenderTime(value.reservation.start_time)}~${this.dateCalenderTime(value.reservation.end_time)})`;
				value.start = value.reservation.start_time;
				value.end = value.reservation.end_time;
				delete value.reservation;
				delete value.user;
			}
		)
		this.setState({
			calenderOption: {
				...this.state.calenderOption,
				events: dataList
			}
		});
	}

	setChangeReservation = (value) => {
		if(!value) {
			this.getUserReservationApi();
		} else {
			this.getUserNameReservationApi(value);
		}
	}

	getUserReservationApi = async () => {
		try{
			const requestOption ={
				// params : param,
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache',
					'Accept': 'application/json',
					Authorization: `Bearer ${getAuthToken()}`,
				},
			};
			await axios.get("http://13.125.53.84:8080/api/auth/reservation/all", requestOption )
				.then(res =>{
					const resData = JSON.parse(JSON.stringify(res.data));
					axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken}`;
					// console.log(resData);
					this.makeTaskList(resData.data);

				})
				.catch(ex=>{
					console.log("login requset fail : " + ex);
					// console.log(ex.response.status);
				})
				.finally(()=>{console.log("login request end")});
		}catch(e){
			console.log(e.response);
		}
	}

	getUserNameReservationApi = async (value) => {
		console.log('name');
		try{
			// console.log(value);
			const param = JSON.parse(JSON.stringify({
				user_phone: value
			}));
			console.log(param);
			const requestOption ={
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache',
					'Accept': 'application/json',
					Authorization: `Bearer ${getAuthToken()}`,
				},
			};
			await axios.post("http://13.125.53.84:8080/api/auth/reservation/all/user",
				JSON.stringify(param), requestOption )
				.then(res =>{
					const resData = JSON.parse(JSON.stringify(res.data));
					axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
					this.makeTaskList(resData.data);
				})
				.catch(ex=>{
					console.log("login requset fail : " + ex);
					// console.log(ex.response.status);
				})
				.finally(()=>{console.log("login request end")});
		}catch(e){
			console.log(e.response);
		}
	}

	componentDidUpdate(prevProps) {
		this.setChangeHeader();

		if(this.props.selectMember !== prevProps.selectMember && this.props.selectMember !== 'all') {
			this.setChangeReservation(this.props.selectMember);
		}
	}

	componentDidMount() {
		this.setChangeHeader();
		this.setInitPeriod();
		this.getUserReservationApi();
	}

	render() {
		return (
			<div className={'calender_weekday_wrap'}>
				<div className={'period_header'}>
					<button className={'btn_prev'} onClick={this.onPressArrowLeft}><Icon.ic20BulletArrow/></button>
					<strong className={'period'}>{dateFormatReset(new Date(this.state.periodStartDate), '.')}~{dateFormatReset(new Date(this.state.periodEndDate), '.', 'day')}</strong>
					<button className={'btn_next'} onClick={this.onPressArrowRight}><Icon.ic20BulletArrow/></button>
				</div>
				<DayPilotCalendar
					{...this.state.calenderOption}
					ref={this.calendarRef}
				/>
			</div>
		);
	}
}

export default CalendarWeekday;