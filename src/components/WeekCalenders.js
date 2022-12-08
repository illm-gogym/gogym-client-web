import React from "react";

import {Icon} from "asset/js/icon";
import classNames from 'classnames';
import {nanoid} from "nanoid";
import axios from "axios";
import {dateFormatResetWithTime} from 'Util/DateFormat';
import {getAuthToken, getAuthTrainerId} from 'Util/Authentication';

class WeekCalenders extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			date: null,
			week: null,
			weekList: [],
			scheduleList: [],
		}

	}

	makeCalender = () => {
		let now = new Date();
		let date = this.makeNewDate(now);
		let day = date.getDay();
		let week = [];
		for (let i = 0; i < 7; i++) {
			let newDate = new Date(date.valueOf() + 86400000 * (i - day));
			week.push([i, newDate]);
		}
		this.setState({
			date, week
		});
		return week;
	}

	makeWeekArr = date => {
		let day = date.getDay();
		let week = [];
		for (let i = 0; i < 7; i++) {
			let newDate = new Date(date.valueOf() + 86400000 * (i - day));
			week.push([i, newDate]);
		}
		// console.log(week);
		return week;
	};

	initDate = (date) => {
		let newDate = new Date(this.makeNewDate(date).valueOf());
		let newWeek = this.makeWeekArr(newDate);
		this.setState({
			date: newDate,
			week: newWeek
		})

		return newWeek;
	}

	onPressArrowLeft = () => {
		let newDate = new Date(this.state.date.valueOf() - 86400000 * 7);
		let newWeek = this.makeWeekArr(newDate);
		this.setState({
			date: newDate,
			week: newWeek
		})

		// this.props.getUserReservationApi(newWeek[0][1], newWeek[6][1]);
	};

	onPressArrowRight = () => {
		let newDate = new Date(this.state.date.valueOf() + 86400000 * 7);
		let newWeek = this.makeWeekArr(newDate);
		this.setState({
			date: newDate,
			week: newWeek
		})

		this.props.getTimeUserReservationApi(newWeek[0][1], newWeek[6][1]);
	};

	onClickDay = (e) => {
		alert(e.target.value);
	}

	makeNewDate = (now) => {
		return new Date(now.getFullYear(), now.getMonth(), now.getDate())
	}

	timeOneBase = (date) => {
		let tempList = [];
		for(let i=0; i<24; i++) {
			tempList.push({date: new Date(date.setHours(date.getHours() + 1)), info: null});
		}
		const timeButton = tempList.map((value, index) =>
			<div className={'base_day'}></div>
		)
		return <div className={'base_area'} key={nanoid()}>{timeButton}</div>
	}

	timeOneDay = (date) => {
		const taskList = this.props.taskList;
		// const scheduleList = this.state.scheduleList;
		let newTaskList = [];

		taskList.map((value, index) => {
			let newDate = this.makeNewDate(new Date(value.start_time)),
				valueDate = this.makeNewDate(date);
			if(newDate.getTime() === valueDate.getTime()) {
				const timeDate = new Date(value.start_time);
				newTaskList.push({date: newDate, hour: timeDate.getHours(), time: timeDate.getMinutes(), name: value.user_phone});
			}
		});

		const timeButton = newTaskList.map((value, index) =>
			<button type={'button'} className={classNames('btn_task', `time_${value.hour}`, {'half': value.time >= 30})}
					onClick={(e) => this.onClickDay(e)}
					value={`${value.date.toLocaleDateString()} ${value.hour} ${value.time}`}>
				{value.name} <br/>
				(
					{value.hour}:{value.time < 10 ? `0${value.time}` : value.time }
					~
					{value.hour + 1}:{value.time < 10 ? `0${value.time}` : value.time }
				)
			</button>
		)

		return <div className={'task_area'} key={nanoid()}>{timeButton}</div>
	}

	timeLeftDay = () => {
		let tempList = [];
		for(let i=1; i<=24; i++) {
			tempList.push({time: i});
		}
		const timeButton = tempList.map((value, index) =>
			<span className={'time'}>
				{value.time/12 < 1 || value.time/12 >= 2  ? '오전' : '오후'} {value.time%12 === 0 ? '12' : value.time%12}시
			</span>
		)
		return <div className={'time_area'} key={nanoid()}>{timeButton}</div>
	}



	componentDidMount = () => {
		// const week = this.makeCalender();
		// let now = new Date();
		// let newDate = new Date(now.valueOf());
		// let week = this.makeWeekArr(newDate);
		// this.setState({
		// 	date: newDate,
		// 	week: week
		// })

		const week = this.initDate(new Date());

		// const selectMember = this.props.selectMember;
		// this.getUserReservationApi(week[0][1], week[6][1]);
		this.props.getUserReservationApi(week[0][1], week[6][1]);
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.state.week === prevState.week && this.props.taskList === prevProps.taskList) {
			// this.makeCalender();

			this.initDate(new Date());
			// console.log('같은가바유')
		} else if (this.state.week !== prevState.week && this.props.taskList !== prevProps.taskList){
			// console.log('다른가바유')
		} else if (this.state.week !== prevState.week && this.props.taskList === prevProps.taskList) {
			// console.log('이건뭔가')
		}

		if (this.state.week === prevState.week) {
			// console.log(this.state.week)

		}

		if (this.state.week !== prevState.week) {
			// console.log(this.state.week);
			// console.log('다른가바유')
			// this.props.getUserReservationApi(this.state.week[0][1], this.state.week[6][1]);
		}

		if(this.props.taskList === prevProps.taskList) {
			// console.log('props 같은가바유')
		}

		if(this.props.taskList !== prevProps.taskList) {
			// console.log('props 다른가바유')
		}
	}

	render() {
		const {week} = this.state;
		const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
		return (
			<div className={'WeekCalender_wrap'}>
				<div className={'week_header'}>
					<button className={'btn_prev'} onClick={this.onPressArrowLeft}><Icon.ic20BulletArrow/></button>
					<em className={'period'}>{week !== null && `${(week[0][1]).toLocaleDateString('ko-kr')} - ${(week[6][1]).toLocaleDateString('ko-kr')}`}</em>
					<button className={'btn_next'} onClick={this.onPressArrowRight}><Icon.ic20BulletArrow/></button>
				</div>
				<div className={'week_content'}>
					<div className={'week_day_header'}>
					{week !== null && week.map((value, index) => {
						let now = this.makeNewDate(new Date());
						let thisDate = this.makeNewDate((value[1]));
						const nowCheck = thisDate.getTime() === now.getTime() ? true : false;
						return (
							<div className={classNames('main', {'today': nowCheck})}>
								<span className={'text'}>{WEEKDAY[(value[1]).getDay()]}</span>
								<em className={'num'}>{(value[1]).getDate()}</em>
							</div>
						)
					})}
					</div>
					<div className={'week_day_content'}>
						{this.timeLeftDay()}
						{week !== null && week.map((value, index) => {
							return (
								<div className={'day_area'}>
									{this.timeOneDay(value[1])}
									{this.timeOneBase(value[1])}
								</div>
							)
						})}
					</div>
				</div>
			</div>
		)
	}
}

export default WeekCalenders;