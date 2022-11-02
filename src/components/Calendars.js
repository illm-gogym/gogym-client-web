import { useState } from 'react';
import Calendar from 'react-calendar';
import React from "react";

import Modal from './Modal';

function Calenders() {
	const [date, setDate] = useState(new Date());
	const taskList = [
		{'date': '2022. 11. 01 09:20', 'member': '한예슬'},
		{'date': '2022. 11. 01 12:20', 'member': '김태희'},
		{'date': '2022. 11. 01 09:20', 'member': '한예슬'},
		{'date': '2022. 11. 01 12:20', 'member': '김태희'},
		{'date': '2022. 11. 01 09:20', 'member': '한예슬'},
		{'date': '2022. 11. 01 12:20', 'member': '김태희'},
		{'date': '2022. 11. 16 17:20', 'member': '비'},
		{'date': '2022. 11. 25 06:20', 'member': '한가인'},
		{'date': '2022. 11. 27 20:20', 'member': '전지현'},
	];

	const [dayList, setDayList] = useState([]);

	const [modalOpen, setModalOpen] = useState(false);
	const openModal = () => {
		setModalOpen(true);
	};
	const closeModal = () => {
		setModalOpen(false);
	};

	const onClickDay = (value, event) => {
		var clickDay = dateSplitDay(value);

		setDayList(() => {return []});

		taskList.map((value, index) => {
			var day = dateSplitDay(new Date(value.date)),
				time = dateSplitTime(day);
			if(day === clickDay) {
				setDayList((prevState) => {
					return [{'member': value.member, 'time': time}, ...prevState];
				})
			}
		});

		openModal();
	}

	const dateSplitDay = (value) => {
		return value.toLocaleDateString('ko-KR');
	}

	const dateSplitTime = (value) => {
		return value.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
	}

	const checkTask = (activeStartDate, date, view) => {
		var taskArr = taskList.map((value, index) => {
			var currentDate = new Date(value.date);
			var options = { hour: "numeric", minute: "numeric", hour12: false };
			if(date.getMonth() === currentDate.getMonth() && date.getDate() === currentDate.getDate() ) {
				return { member:value.member, time: currentDate.toLocaleTimeString("en-US", options)} ;
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
					{dayList.map((value, index) =>
						<li className={'item'}>
							<span className={'text'}>
								<strong>{value.time}</strong> {value.member} 님
							</span>
							<button type={'button'} className={'btn_manage'}>회원관리</button>
						</li>
					)}
				</ul>
			</Modal>
		</>
	);
}

export default Calenders;