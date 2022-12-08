export function dateFormatWithTime(date, splice='-') {
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hour = date.getHours();
	let minute = date.getMinutes();

	month = month >= 10 ? month : '0' + month;
	day = day >= 10 ? day : '0' + day;
	hour = hour >= 10 ? hour : '0' + hour;
	minute = minute >= 10 ? minute : '0' + minute;

	return date.getFullYear() + splice + month + splice + day + ' ' + hour + ':' + minute;
}

export function dateFormatYYYYDDMM(date, splice='-', type='default') {
	date = new Date(date);
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hour = date.getHours();
	let minute = date.getMinutes();

	month = month >= 10 ? month : '0' + month;
	day = day >= 10 ? day : '0' + day;

	if(type === 'day') {
		const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
		let week = WEEKDAY[date.getDay()];
		return date.getFullYear() + splice + month + splice + day + ' ' + week + '요일';
	} else {
		return date.getFullYear() + splice + month + splice + day;
	}
}


export function dateFormatReset(date, splice='-', type='full') {
	let month = date.getMonth() + 1;
	let day = date.getDate();
	month = month >= 10 ? month : '0' + month;
	day = day >= 10 ? day : '0' + day;

	if(type === 'day')
		return month + splice + day;
	else
		return date.getFullYear() + splice + month + splice + day;
}

export function dateFormatResetWithTime(date, splice='-') {
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hour = date.getHours();
	let minute = date.getMinutes();

	month = month >= 10 ? month : '0' + month;
	day = day >= 10 ? day : '0' + day;
	hour = '00';
	minute = '00';

	return date.getFullYear() + splice + month + splice + day + ' ' + hour + ':' + minute;
}

export function dateFormatGetTime(date) {
	date = new Date(date);
	let hour = date.getHours();
	let minute = date.getMinutes();

	hour = hour >= 10 ? hour : '0' + hour;
	minute = minute >= 10 ? minute : '0' + minute;

	return hour + ':' + minute;
}
// export