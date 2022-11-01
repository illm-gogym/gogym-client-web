import { useState } from 'react';
import Calendar from 'react-calendar';
import React from "react";
import $ from 'jquery';

import Modal from './Modal';

function Calenders() {
	const [date, setDate] = useState(new Date());
	const taskList = [
		{'date': '2022-11-01 09:20', 'member': '한예슬'},
		{'date': '2022-11-01 12:20', 'member': '김태희'},
		{'date': '2022-11-16 17:20', 'member': '비'},
		{'date': '2022-11-25 06:20', 'member': '한가인'},
		{'date': '2022-11-27 20:20', 'member': '전지현'},
	];

	const [modalOpen, setModalOpen] = useState(false);
	const openModal = () => {
		setModalOpen(true);
	};
	const closeModal = () => {
		setModalOpen(false);
	};

	const onClickDay = (value, event) => {
		// console.log($(event.target).text());
		console.log(changeDateFormat(value));
	}

	const changeDateFormat = (value) => {
		return value.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
	}

	const checkTask = (activeStartDate, date, view) => {
		var taskArr = taskList.map((value, index) => {
			var currentDate = new Date(value.date);
			if(date.getMonth() === currentDate.getMonth() && date.getDate() === currentDate.getDate() ) {
				return { member:value.member, time: currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} ;
			}
		});

		return <span className={'task_area'}>{taskArr.map((value, index) =>
			value !== undefined ? <span className={'task'}>{value.member} {value.time}</span> : null
		)}</span>

		// return taskList.map((value, index) => {
		// 	var currentDate = new Date(value.date);
		// 	if(date.getMonth() === currentDate.getMonth() && date.getDate() === currentDate.getDate() ) {
		// 		return value.member;
		// 	} else {
		// 		return null;
		// 	}
		// }).map((value, index) =>
		// 	<span className={'task'}>{value}</span>
		// );
	};

	return (
		<>
			<div className='calendar-container'>
				<Calendar
					onChange={setDate}
					value={date}
					className={'task_calendar'}
					tileClassName={'task_calender_tile'}
					formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
					tileContent={ ({ activeStartDate, date, view }) => checkTask(activeStartDate, date, view) }
					onClickDay={(value, event) => onClickDay(value, event)}
				/>
			</div>
			<p className='text-center'>
				<span className='bold'>Selected Date:</span>{' '}
				{date.toDateString()}
			</p>

			<Modal open={modalOpen} close={closeModal} header="오늘의 일정">
				<ul className={'day_list'}>
					<li className={'item'}>
						<span className={'text'}>14:00 강민호 님</span>
						<button type={'button'} className={'btn_manage'}>회원관리</button>
					</li>
					<li className={'item'}>
						<span className={'text'}>18:30 정솔 님</span>
						<button type={'button'} className={'btn_manage'}>회원관리</button>
					</li>
					<li className={'item'}>
						<span className={'text'}>14:00 강민호 님</span>
						<button type={'button'} className={'btn_manage'}>회원관리</button>
					</li>
				</ul>
			</Modal>
			<button onClick={openModal}>모달팝업</button>
		</>
	);
}

export default Calenders;