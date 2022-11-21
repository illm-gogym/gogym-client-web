import React from "react";

import {Icon} from "asset/js/icon";

class WeekCalenders extends React.Component {
	constructor(props) {
		super(props);

		this.props = {
			...props,
		}

		this.state = {
			date: null,
			week: null,
			weekList: []
		}
	}

	componentDidMount = () => {
		let now = new Date();
		let date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		let week = this.makeWeekArr(date);
		this.setState({
			date, week
		})
	};

	makeWeekArr = date => {
		let day = date.getDay();
		let week = [];
		for (let i = 0; i < 7; i++) {
			let newDate = new Date(date.valueOf() + 86400000 * (i - day));
			week.push([i, newDate]);
		}
		return week;
	};

	onPressArrowLeft = () => {
		let newDate = new Date(this.state.date.valueOf() - 86400000 * 7);
		let newWeek = this.makeWeekArr(newDate);
		this.setState({
			date: newDate,
			week: newWeek
		})
	};

	onPressArrowRight = () => {
		let newDate = new Date(this.state.date.valueOf() + 86400000 * 7);
		let newWeek = this.makeWeekArr(newDate);
		this.setState({
			date: newDate,
			week: newWeek
		})
	};

	onClickDay = (e) => {
		alert(e.target.value);
	}

	timeOneDay = (date) => {
		let tempList = [];
		for(let i=0; i<24; i++) {
			tempList.push({date: new Date(date.setHours(date.getHours() + 1)), info: null});
		}
		const timeButton = tempList.map((value, index) =>
			<button type={'button'} className={'btn_day'} onClick={(e) => this.onClickDay(e)} value={`${value.date.toLocaleDateString()} ${value.date.toLocaleTimeString()}`}>

			</button>
		)
		return <div>{timeButton}</div>
	}

	timeLeftDay = () => {
		let tempList = [];
		for(let i=1; i<=24; i++) {
			tempList.push({time: i});
		}
		const timeButton = tempList.map((value, index) =>
			<span className={'time'}>
				{value.time/12 < 1 || value.time%12 == 0  ? '오전' : '오후'} {value.time%12 === 0 ? '12' : value.time%12}시
			</span>
		)
		return <div className={'time_area'}>{timeButton}</div>
	}

	// setCalenderDate = () => {
	// 	this.props.taskList.map((value, index) =>
	//
	// 	)
	// }

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
					{this.timeLeftDay()}
					{week !== null && week.map((value, index) => {
						return (
							<div className={'day'}>
								<div className={'main'}>
									<span className={'text'}>{WEEKDAY[(value[1]).getDay()]}</span>
									<em className={'num'}>{(value[1]).getDate()}</em>
								</div>
								{this.timeOneDay(value[1])}
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}

export default WeekCalenders;