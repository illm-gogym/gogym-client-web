import { useState } from 'react';
import Calendar from 'react-calendar';
import React from "react";

function Calenders() {
	const [date, setDate] = useState(new Date());

	const taskList = [
		{'date': '2022-10-25 12:20:30', 'member': '한예슬'},
		{'date': '2022-10-26 12:20:30', 'member': '김태희'},
		{'date': '2022-10-26 12:20:30', 'member': '비'},
		{'date': '2022-10-27 12:20:30', 'member': '전지현'},
	];

	const checkTask = (activeStartDate, date, view) => {
		var taskArr = taskList.map((value, index) => {
			var currentDate = new Date(value.date);
			if(date.getMonth() === currentDate.getMonth() && date.getDate() === currentDate.getDate() ) {
				return value.member;
			}
		});

		return taskArr.map((value, index) =>
			value !== undefined ? <span className={'task'}>{value}</span> : null
		)

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
					// tileContent={
					// 	({ activeStartDate, date, view }) => {
					// 		return view === 'month' && date.getDay() === 0 ?
					// 			<p>It's Sunday!</p>: null
					// 	}
					// }
				/>
			</div>
			<p className='text-center'>
				<span className='bold'>Selected Date:</span>{' '}
				{date.toDateString()}
			</p>
		</>
	);
}

export default Calenders;