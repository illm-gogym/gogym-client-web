import { useState } from 'react';
import React from "react";
import { Eventcalendar, getJson, localeKo } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.scss';

function Timeline() {
	const view = React.useMemo(() => {
		return {
			timeline: {
				type: 'week'
			}
		};
	}, []);

	const myResources = [{
		id: 1,
		name: 'Ryan',
		color: '#e9ec12'
	}];

	const myEvents = React.useMemo(() => {
		return [{
			start: '2022-11-02T121:00',
			end: '2022-11-02T22:00',
			title: '전지현 님',
			resource: 1
		}, {
			start: '2022-11-02T22:00',
			end: '2022-11-02T23:00',
			title: '김태희 님',
			resource: 1
		}]
	}, []);
	//
	// const myResources = React.useMemo(() => {
	// 	return [{
	// 		id: 1,
	// 		name: '김문수 선생님',
	// 		color: '#e20000'
	// 	}, {
	// 		id: 2,
	// 		name: '김동수 선생님',
	// 		color: '#76e083'
	// 	}, {
	// 		id: 3,
	// 		name: '조영은 선생님',
	// 		color: '#4981d6'
	// 	}, {
	// 		id: 4,
	// 		name: '라강민 선생님',
	// 		color: '#e25dd2'
	// 	}, {
	// 		id: 5,
	// 		name: '이선아 선생님',
	// 		color: '#1dab2f'
	// 	}]
	// }, []);

	return (

		//<Eventcalendar
		//	theme="ios"
		//	themeVariant="light"
		//	view={view}
		//	data={myEvents}
		//	locale={localeKo}
		//	resources={myResources}
		// />
		<Eventcalendar
			view={{
				schedule: {
					type: 'week'
				}
			}}
			data={myEvents}
			resources={myResources}
		/>
	);
}

export default Timeline;
