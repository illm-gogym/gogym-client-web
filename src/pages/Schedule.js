import React from 'react';
import classNames from 'classnames';
import {Icon} from "asset/js/icon";
import 'react-calendar/dist/Calendar.css';

import Aside from 'components/Aside';
import Modal from "components/Modal";
import Calenders from 'components/Calendars';
import WeekCalenders from 'components/WeekCalenders';

import { useParams } from "react-router-dom";
import { nanoid } from 'nanoid';
import axios from "axios";

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

class Schedule extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modalOpen: false,
			selectCard: false,
			selectCardIndex: -1,
			trainerList: [
				{id:'10101', name: '김동수'},
				{id:'10102', name: '김문수'},
				{id:'10103', name: '라강민'},
				{id:'10104', name: '이선아'},
				{id:'10105', name: '조영은'},
			],
			memberList: [],
			originTaskList: [
				{'date': '2022. 11. 21 09:00', 'name': '한예슬'},
				{'date': '2022. 11. 21 12:00', 'name': '김태희'},
				{'date': '2022. 11. 26 17:00', 'name': '비'},
				{'date': '2022. 11. 25 11:00', 'name': '한가인'},
				{'date': '2022. 11. 23 20:30', 'name': '전지현'},
				{'date': '2022. 11. 24 10:30', 'name': '한가인'},
			],
			taskList: [
				{'date': '2022. 11. 21 09:00', 'name': '한예슬'},
				{'date': '2022. 11. 21 12:00', 'name': '김태희'},
				{'date': '2022. 11. 26 17:00', 'name': '비'},
				{'date': '2022. 11. 25 11:00', 'name': '한가인'},
				{'date': '2022. 11. 23 20:30', 'name': '전지현'},
				{'date': '2022. 11. 24 10:30', 'name': '한가인'},
			],
			addScheduleList: [],
			addSchedule: {
				name: null,
				date: null,
				startTime: null,
				endTime: null,
				description: null
			},
			trainerId: {
				trainer_id: "bellgym"
			}
		};
	}

	openModal = () => {
		this.setState({
			modalOpen: true
		});
	};

	closeModal = () => {
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
			var newDate = new Date(`${value.date} ${value.startTime}`);
			list.push({name: value.name, date: newDate});
		})

		this.setState({
			addScheduleList : []
		})
		return list;
	}

	componentDidMount() {
		const { personalType } = this.props.params;
		this.setState({
			personalType: personalType,
		});
		// this.getUserInfoApi();
	}

	onSelectMember = (e) => {
		var name = e.target.innerText;
		var list = [];
		this.state.originTaskList.map((value, index) => {
			if(name === value.name )
				list.push(value);
		})
		this.setState({
			taskList: list,
		})
	}

	onAddSchedule = (e) => {
		this.openModal();
	}

	onInputChange = (e) => {
		var target = e.target;

		this.setState({
			addSchedule : {
				...this.state.addSchedule,
				[target.name]: target.value
			}
		})
	}

	onCardReset = () => {
		this.setState({
			addSchedule: {
				name: '',
				date: '',
				startTime: '',
				endTime: '',
				description: ''
			},
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
				startTime: data.startTime,
				endTime: data.endTime,
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
			]
		})
	}

	getUserInfoApi = async () => {
		try{
			let trainerId = this.state.trainerId;
			const requestOption ={
				params : trainerId,
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache',
					'Accept': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('access-token')}`,
					// 'Authorization': `${localStorage.getItem('access-token')}`
				},
			};
			await axios.get("http://3.35.226.16:8080/api/auth/trainer/userall", requestOption )
				.then(res =>{
					const resData = JSON.parse(JSON.stringify(res.data));
					axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access-token')}`;
					console.log(resData);
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

	render() {
		const { modalOpen, trainerList, memberList, taskList, addScheduleList, addSchedule, selectCard} = this.state;
		const { personalType } = this.props.params;
		return (
			<div id={'wrap'} className={classNames('schedule_wrap')}>
				<Aside link={'/schedule'}/>
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
								<ul className={'person_list'}>
									{personalType === 'member' ?
										memberList.map((value, index) =>
											<li className={'item'}>
												<input type="radio" id={`${value.ins_dtm}--${index}`} className={'input_check'} name={'member'}/>
												<label htmlFor={`${value.ins_dtm}--${index}`} className={'input_label'} onClick={(e) => this.onSelectMember(e)}>
													<span className={'text'}>{value.name}</span>
												</label>
											</li>
										) :
										trainerList.map((value, index) =>
											<li className={'item'}>
												<input type="radio" id={`${value.id}--${index}`} className={'input_check'} name={'trainer'}/>
												<label htmlFor={`${value.id}--${index}`} className={'input_label'} onClick={(e) => this.onSelectMember(e)}>
													<span className={'text'}>{value.name}</span>
												</label>
											</li>
										)
									}
								</ul>
							</div>
						</div>

						<div className={'calender_wrap'}>
							{personalType === 'member' &&
								<button type={'button'} className={'btn_add'} onClick={(e) => this.onAddSchedule(e)}>일정 추가</button>
							}
							{/*<Calenders taskList={taskList} />*/}
							<WeekCalenders taskList={taskList}  />
						</div>
					</div>
				</div>

				<Modal open={modalOpen} close={this.closeModal} header="일정 추가하기" submit={`일정 ${addScheduleList.length}개 추가하기`}>
					<div className={'schedule_add_area'}>
						<div className={'plus_area'}>
							<button type={'button'} className={'btn_plus'} onClick={this.onCardReset}><Icon.ic24Plus/></button>
							<ul className={'plus_list'}>
								{addScheduleList.map((value, index) =>
									<li className={'item'}>
										<div className={'inner'} key={nanoid()} onClick={(e) => this.onClickCard(e, index)}>
											<div className={'text'}>{value.date}</div>
											<div className={'text'}>
												{value.startTime}~{value.endTime}
											</div>
											<div className={'text'}>{value.name}</div>
										</div>
										<button type={'button'} className={'btn_delete'}  onClick={(e) => this.onRemoveCard(e, index)}><Icon.ic14Close/></button>
									</li>
								)}
							</ul>
						</div>
						<div className={'plus_input_area'}>
							<label htmlFor="plus_date">날짜</label> <input type="date" id={'plus_date'} onChange={(e) =>this.onInputChange(e)} className={'input'} name={'date'} value={addSchedule.date}/>
						</div>
						<div className={'plus_input_area'}>
							<label htmlFor="plus_time">시간</label>
							<input type="time" id={'plus_time'} className={'input'} onChange={(e) =>this.onInputChange(e)} name={'startTime'} value={addSchedule.startTime}/>
							<span className={'dash'}>-</span>
							<input type="time"  id={'plus_time'} className={'input'} onChange={(e) =>this.onInputChange(e)} name={'endTime'} value={addSchedule.endTime}/>
						</div>
						<div className={'plus_input_area'}>
							<label htmlFor="plus_member">회원</label> <input type="text" id={'plus_member'} className={'input'} onChange={(e) =>this.onInputChange(e)} name={'name'} value={addSchedule.name}/>
						</div>
						<div className={'plus_input_area'}>
							<label htmlFor="plus_description">설명</label> <textarea id={'plus_description'} className={'input'} rows={'4'} onChange={(e) =>this.onInputChange(e)} name={'description'} value={addSchedule.description}/>
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