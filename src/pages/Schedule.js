import React from 'react';
import classNames from 'classnames';
import {Icon} from "asset/js/icon";
import 'react-calendar/dist/Calendar.css';

import Aside from 'components/Aside';
import Modal from "components/Modal";
import ChkBox from "components/ChkBox";

import WeekCalenders from 'components/WeekCalenders';
import CalenderWeekday from 'components/CalenderWeekday';
import {getAuthToken, getAuthTrainerId} from 'Util/Authentication';

import { useParams } from "react-router-dom";
import { nanoid } from 'nanoid';
import axios from "axios";


function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

class Schedule extends React.Component {
	constructor(props) {
		super(props);

		this.calendarRef = React.createRef();

		this.state = {
			modalOpen: false,
			selectCard: false,
			selectCardIndex: -1,
			trainerList: [
				// {id:'10101', name: '김동수'},
			],
			memberList: [],
			originTaskList: [
				// {'date': '2022. 11. 21 09:00', 'name': '한예슬'},
			],
			taskList: [
				// {'date': '2022. 11. 21 09:00', 'name': '한예슬'},
			],
			addScheduleList: [],
			addSchedule: {
				name: null,
				date: this.dateFormatYYYYMMDD(new Date()),
				start_time: null,
				end_time: null,
				description: '',
				user_phone: null,
				usage_state: -1
			},
			selectMember: 'all',
		};
	}

	openModal = () => {
		this.setState({
			modalOpen: true
		});
	};

	closeModal = () => {
		this.addUserReservationApi();

		this.setState({
			modalOpen: false,
			originTaskList: [
				...this.state.originTaskList,
				...this.makeOriginData(),
			],
			taskList: [
				...this.state.taskList,
				...this.makeOriginData(),
			]
		});

	};

	makeOriginData = () => {
		var list = [];

		this.state.addScheduleList.map((value, index)=> {
			var newDate = new Date(`${value.date} ${value.start_time}`);
			list.push({name: value.name, date: newDate});
		})

		this.setState({
			addScheduleList : []
		})
		return list;
	}

	onSelectMember = (e, value) => {
		if(!value.user_phone) {
			const list = this.state.memberList.map((value, index) => {
				value.checkState = !value.checkState;
				return value;
			})
			this.setState({
				memberList: list
			});
		}
		this.setState({
			selectMember: value.user_phone,
		});
	}

	onAddSchedule = (e) => {
		this.openModal();
	}

	getUserPhone = (name) => {
		let phone = null;
		this.state.memberList.map((value, index) => {
			if(value.name === name) {
				phone = value.user_phone;
			}
		});

		return phone;
	}

	onInputChange = (e) => {
		var target = e.target;

		if(target.name === 'start_time') {
			const time = e.target.value;
			let now = new Date();
			let date = new Date(`${now.getFullYear()} ${now.getMonth()} ${now.getDate()} ${time}`);
			let endTime = `${date.getHours() + 1}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
			console.log(endTime);

			this.setState({
				addSchedule : {
					...this.state.addSchedule,
					[target.name]: target.value,
					end_time: endTime,
				}
			})
		} else if (target.name === 'name') {
			const phone = this.getUserPhone(target.value);
			this.setState({
				addSchedule : {
					...this.state.addSchedule,
					[target.name]: target.value,
					user_phone: phone,
				}
			})
		} else {
			this.setState({
				addSchedule : {
					...this.state.addSchedule,
					[target.name]: target.value,
				}
			})
		}
	}

	onCardReset = () => {
		this.setState({
			addSchedule: {
				name: '',
				date: this.dateFormatYYYYMMDD(new Date()),
				start_time: '',
				end_time: '',
				description: ''
			},
			selectCardIndex: -1,
			selectCard: false,
		})
	}

	onClickCard = (e, index) => {
		var data = this.state.addScheduleList[index];

		this.setState({
			selectCard: true,
			selectCardIndex: index,
			addSchedule: {
				name: data.name,
				date: data.date,
				start_time: data.start_time,
				end_time: data.end_time,
				description: data.description
			},
		})
	}

	onCopy = (e, index) => {
		var data = this.state.addScheduleList[index];
		var newSchedule = {
			name: data.name,
			date: data.date,
			start_time: data.start_time,
			end_time: data.end_time,
			description: data.description
		};

		this.setState({
			selectCardIndex: index + 1,
			selectCard: true,
			addScheduleList : [
				...this.state.addScheduleList,
				newSchedule
			],
			addSchedule: {
				name: data.name,
				date: data.date,
				start_time: data.start_time,
				end_time: data.end_time,
				description: data.description
			},
		})
	}

	onSubmit = () => {
		this.setState({
			addScheduleList: [
				...this.state.addScheduleList,
				this.state.addSchedule,
			],
		})
		this.onCardReset();
	}

	onModify = () => {
		var tempList = this.state.addScheduleList;
		tempList.splice(this.state.selectCardIndex, 1, this.state.addSchedule);

		this.setState({
			addScheduleList: [
				...tempList
			],
			selectCardIndex: -1,
			selectCard: false,
		})
		this.onCardReset();
	}

	onRemoveCard = (e, index) => {
		var tempList = this.state.addScheduleList;
		tempList.splice(index, 1);

		this.setState({
			addScheduleList : [
				...tempList
			],
			selectCard: false,
		})
	}

	dateFormatYYYYMMDD = (date) => {
		let month = date.getMonth() + 1;
		let day = date.getDate();

		month = month >= 10 ? month : '0' + month;
		day = day >= 10 ? day : '0' + day;
		return date.getFullYear() + '-' + month + '-' + day ;
	}

	dateFormatHHMM = (date) => {
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let hour = date.getHours();
		let minute = date.getMinutes();

		month = month >= 10 ? month : `0${month}`;
		day = day >= 10 ? day : `0${day}`;
		hour = hour >= 10 ? hour : `0${hour}`;
		minute = minute >= 10 ? minute : `0${minute}`;

		return date.getFullYear() + '-'+ month + '-' + day + 'T' + hour + ':' + minute;
	}

	getTrainerUserApi = async () => {
		try{
			const requestOption ={
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache',
					'Accept': 'application/json',
					Authorization: `Bearer ${getAuthToken()}`,
					// 'Authorization': `${localStorage.getItem('access-token')}`
				},
			};
			await axios.get("http://13.125.53.84:8080/api/auth/trainer/userall", requestOption )
				.then(res =>{
					const resData = JSON.parse(JSON.stringify(res.data));
					axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
					this.setState({
						memberList : [
							...resData.data
						]
					})
				})
				.catch(ex=>{
					console.log("login requset fail : " + ex);
				})
				.finally(()=>{console.log("login request end")});
		}catch(e){
			console.log(e);
		}
	}

	makeSendScheduleList = () => {
		this.state.addScheduleList.map((value, index) => {
				let startDate = new Date(`${value.date} ${value.start_time}`);
				let endDate= new Date(`${value.date} ${value.end_time}`);
				value.start_time = this.dateFormatHHMM(startDate);
				value.end_time = this.dateFormatHHMM(endDate);
				value.user_phone = this.getUserPhone(value.name);
				value.usage_state = '-1';
				delete value.date;
				delete value.name;
			}
		)
	}

	addUserReservationApi = async () => {
		try{
			this.makeSendScheduleList();
			const obj = { reservations : this.state.addScheduleList };
			const scheduleList = JSON.parse(JSON.stringify(obj));
			console.log(scheduleList);
			const requestOption ={
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache',
					'Accept': 'application/json',
					Authorization: `Bearer ${getAuthToken()}`,
				}
			};
			await axios.post("http://13.125.53.84:8080/api/auth/reservation/add" ,
				JSON.stringify(scheduleList), requestOption )
				.then(res =>{
					const resData = JSON.parse(JSON.stringify(res.data));
					axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
					// console.log(resData);
					window.location.reload('/schedule/member');
				})
				.catch(ex=>{
					console.log("login requset fail : " + ex);
				})
				.finally(()=>{console.log("login request end")});
		}catch(e){
			console.log(e);
		}
	}

	makeCheckMemberList = () => {
		const list = this.state.memberList.map((value, index) => {
				value.checkState = true;
				return value;
			}
		)

		this.setState({
			memberList : list
		})
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevState.memberList.length !== this.state.memberList.length) {
			this.makeCheckMemberList();
		}
	}

	componentDidMount() {
		const { personalType } = this.props.params;
		this.setState({
			personalType: personalType,
		});
		this.getTrainerUserApi();
		// this.getUserReservationApi();
	}

	render() {
		const { modalOpen, trainerList, memberList, taskList, addScheduleList, addSchedule, selectCard, selectCardIndex, selectMember} = this.state;
		const { personalType } = this.props.params;
		const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
		return (
			<div id={'wrap'} className={classNames('schedule_wrap')}>
				<Aside link={'/schedule'} personalType={personalType}/>
				<div className="container">
					<div className={'notify_area'}>
						<h2>스케줄 관리</h2>
					</div>

					<div className={'section'}>
						<div className={'tab_area'}>
							<div className={'tab'}>
								<strong className={'text'}>{personalType === 'member' ? '내 회원' : '트레이너'}</strong>
								<button className={'btn_menu'}><Icon.ic20BulletArrow/></button>
							</div>
							<div className={'list_area'}>
								<div className={'person_list'}>
									{personalType === 'member' ?
										<>
										<ChkBox label={{name: '전체보기', user_phone: false, checkState: true}} onSelectMember={this.onSelectMember} checkState={true}/>
										{memberList.map((value, index) => {
											return	<ChkBox label={value} onSelectMember={this.onSelectMember} />
										})}
										</> :
										trainerList.map((value, index) =>
											<div className={'item'} key={nanoid()}>
												<input type="radio" id={`${value.id}--${index}`} className={'input_check'} name={'trainer'}/>
												<label htmlFor={`${value.id}--${index}`} className={'input_label'} onClick={(e) => this.onSelectMember(e)}>
													<span className={'text'}>{value.name}</span>
												</label>
											</div>
										)
									}
								</div>
							</div>
						</div>

						<div className={'calender_wrap'}>
							{personalType === 'member' &&
								<button type={'button'} className={'btn_add'} onClick={(e) => this.onAddSchedule(e)}><Icon.ic16AddSchedule/>일정 추가</button>
							}
							{/*<Calenders />*/}
							<CalenderWeekday selectMember={selectMember}/>
							{/*<CalenderWeekday getUserReservationApi={this.getUserReservationApi} taskList={this.state.taskList} />*/}
							{/*<WeekCalenders taskList={taskList} getUserReservationApi={this.getUserReservationApi} getTimeUserReservationApi={this.getTimeUserReservationApi} />*/}

						</div>
					</div>
				</div>

				<Modal open={modalOpen} close={this.closeModal} header="일정 추가하기" submit={`일정 ${addScheduleList.length}개 추가하기`}>
					<div className={'schedule_add_area'}>
						<div className={'plus_area'}>
							<button type={'button'} className={'btn_plus'} onClick={this.onCardReset}><Icon.ic24Plus/></button>
							<ul className={'plus_list'}>
								{addScheduleList.map((value, index) =>
									<li className={classNames('item', {selected: index === selectCardIndex? true : false})} key={nanoid()}>
										<div className={'inner'} onClick={(e) => this.onClickCard(e, index)}>
											<div className={'name'}>{value.name}</div>
											<div className={'text'}>{value.date} {WEEKDAY[new Date(value.date).getDay()]} </div>
											<div className={'text'}>
												{value.start_time}~{value.end_time}
											</div>
										</div>
										<button type={'button'} className={'btn_delete'} onClick={(e) => this.onRemoveCard(e, index)}><Icon.ic14Close/></button>
										<button type={'button'} className={'btn_copy'} onClick={(e) => this.onCopy(e, index)}><Icon.ic14Copy/></button>
									</li>
								)}
							</ul>
						</div>
						<div className={'plus_input_area'}>
							<label htmlFor="plus_date">날짜</label> <input type="date" id={'plus_date'} onChange={(e) =>this.onInputChange(e)} className={'input'} name={'date'} value={addSchedule.date || ''}/>
						</div>
						<div className={'plus_input_area'}>
							<label htmlFor="plus_start_time">시간</label>
							<input type="time" id={'plus_start_time'} className={'input'} onChange={(e) =>this.onInputChange(e)} name={'start_time'} value={addSchedule.start_time || ''}/>
							<span className={'dash'}>-</span>
							<input type="time" id={'plus_end_time'} className={'input'} onChange={(e) =>this.onInputChange(e)} name={'end_time'} value={addSchedule.end_time || ''}/>
						</div>
						<div className={'plus_input_area'}>
							<label htmlFor="plus_member">회원</label>
							{/*<input type="text" id={'plus_member'} className={'input'} onChange={(e) =>this.onInputChange(e)} name={'name'} value={addSchedule.name || ''}/>*/}
							<select name="" id="plus_member" className={'input'} value={addSchedule.name || '회원선택'} name={'name'} onChange={(e) =>this.onInputChange(e)}>
								<option disabled>회원선택</option>
								{memberList.map((value, index) =>
									<option className={'item'} key={nanoid()} value={value.name} >
										{value.name}
									</option>
								)}
							</select>
						</div>
						<div className={'plus_input_area'}>
							<label htmlFor="plus_description">설명</label> <textarea id={'plus_description'} className={'input'} rows={'4'} onChange={(e) =>this.onInputChange(e)} name={'description'} value={addSchedule.description || ''}/>
						</div>
						{selectCard ?
							<button className={'btn_add'} type={'button'} onClick={this.onModify}>수정하기</button>
							: <button className={'btn_add'} type={'button'} onClick={this.onSubmit}>등록하기</button>
						}
					</div>
				</Modal>
			</div>
		);
	}
}

export default withParams(Schedule);

// getUserReservationApi = async () => {
// 	try{
// 		const requestOption ={
// 			// params : param,
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'Cache-Control': 'no-cache',
// 				'Accept': 'application/json',
// 				Authorization: `Bearer ${getAuthToken()}`,
// 			},
// 		};
// 		await axios.get("http://13.125.53.84:8080/api/auth/reservation/all", requestOption )
// 			.then(res =>{
// 				const resData = JSON.parse(JSON.stringify(res.data));
// 				axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken}`;
// 				// console.log(resData);
// 				this.setState({
// 					taskList : [
// 						...resData.data
// 					]
// 				})
// 				return resData.data;
// 			})
// 			.catch(ex=>{
// 				console.log("login requset fail : " + ex);
// 				// console.log(ex.response.status);
// 			})
// 			.finally(()=>{console.log("login request end")});
// 	}catch(e){
// 		console.log(e.response);
// 	}
// }