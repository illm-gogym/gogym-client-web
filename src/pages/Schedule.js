import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import 'react-calendar/dist/Calendar.css';

import Aside from 'components/Aside';
import Calenders from 'components/Calendars';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			trainerList: [
				{id:'10101', name: '김동수'},
				{id:'10102', name: '김문수'},
				{id:'10103', name: '라강민'},
				{id:'10104', name: '이선아'},
				{id:'10105', name: '조영은'},
			],
			memberList: [
				{id:'20101', name: '한예슬'},
				{id:'20102', name: '김태희'},
				{id:'20103', name: '한가인'},
				{id:'20104', name: '비'},
				{id:'20105', name: '전지현'},
			],
			originTaskList: [
				{'date': '2022. 11. 01 09:20', 'member': '한예슬'},
				{'date': '2022. 11. 01 12:20', 'member': '김태희'},
				{'date': '2022. 11. 16 17:20', 'member': '비'},
				{'date': '2022. 11. 25 06:20', 'member': '한가인'},
				{'date': '2022. 11. 27 20:20', 'member': '전지현'},
				{'date': '2022. 11. 28 06:20', 'member': '한가인'},
			],
			taskList: [
				{'date': '2022. 11. 01 09:20', 'member': '한예슬'},
				{'date': '2022. 11. 01 12:20', 'member': '김태희'},
				{'date': '2022. 11. 16 17:20', 'member': '비'},
				{'date': '2022. 11. 25 06:20', 'member': '한가인'},
				{'date': '2022. 11. 27 20:20', 'member': '전지현'},
				{'date': '2022. 11. 28 06:20', 'member': '한가인'},
			]
		};
	}

	componentDidMount() {
	}

	onSelectMember = (e) => {
		var name = e.target.innerText;
		var list = [];
		this.state.originTaskList.map((value, index) => {
			if(name === value.member )
				list.push(value);
		})
		this.setState({
			...this.state,
			taskList: list,
		})
	}

	render() {
		const {trainerList, memberList, taskList} = this.state;
		return (
			<div id={'wrap'} className={classNames('schedule_wrap')}>
				<Aside link={'schedule'}/>
				<div className="container">
					<div className={'notify_area'}>
						<h2>스케줄 관리</h2>
					</div>
					<div className={'section'}>
						<div className={'article'}>
							<div className={'article_content'}>
								<strong className={'title'}>10.20 일정 (5개)</strong>
								<p className={'description'}>김문수, 라강민 님</p>
							</div>
							<Link to={'/register'} className={'btn_article'} >
								일정 확인하기
							</Link>
						</div>
					</div>

					<div className={'section'}>
						<div className={'tab_area'}>
							<div className={'tab'}>
								<input type="radio" id={'part_trainer'} name={'check'} checked={true} />
								<label htmlFor="part_trainer">트레이너</label>
							</div>
							<div className={'list_area'}>
								<ul className={'trainer_list'}>
									{trainerList.map((value, index) =>
										<li className={'item'}>
											<input type="radio" id={`${value.id}--${index}`} className={'input_check'} name={'trainer'}/>
											<label htmlFor={`${value.id}--${index}`} className={'input_label'}>
												<span className={'text'}>{value.name}</span>
											</label>
										</li>
									)}
								</ul>
							</div>
							<div className={'tab'}>
								<input type="radio" id={'part_member'}  name={'check'} />
								<label htmlFor="part_member">회원</label>
							</div>
							<div className={'list_area'}>
								<ul className={classNames('trainer_list', 'member')}>
									{memberList.map((value, index) =>
										<li className={'item'}>
											<input type="radio" id={`${value.id}--${index}`} className={'input_check'} name={'trainer'}/>
											<label htmlFor={`${value.id}--${index}`} className={'input_label'} onClick={(e) => this.onSelectMember(e)}>
												<span className={'text'}>{value.name}</span>
											</label>
										</li>
									)}
								</ul>
							</div>
						</div>
					</div>

					<div className={'section'}>
						<Calenders taskList={taskList} />
					</div>
				</div>
			</div>
		);
	}
}

export default Home;

