import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Aside from '../components/Aside';
import Calenders from '../components/Calendars';


import {Icon} from "../asset/js/icon";

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
			]
		};
	}

	componentDidMount() {
	}

	render() {
		const {trainerList} = this.state;
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
						<ul className={'trainer_list'}>
							{trainerList.map((value, index) =>
								<li className={'item'}>
									<input type="checkbox" id={`${value.id}--${index}`} className={'input_check'}/>
									<label htmlFor={`${value.id}--${index}`} className={'input_label'}>
										<span className={'text'}>{value.name}</span>
									</label>
								</li>
							)}
						</ul>
					</div>

					<div className={'section'}>
						{/*<div className={'calendar-container'}>*/}
							{/*<Calendar />*/}
						{/*</div>*/}
						<Calenders />
					</div>
				</div>
			</div>
		);
	}
}

export default Home;

