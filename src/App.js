import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Home from 'pages/Home';
import Join from 'pages/Join';
import Register from 'pages/Register';
import Schedule from 'pages/Schedule';
import Login from 'pages/Login';
import Manage from 'pages/Manage';
import ManageClass from 'pages/ManageClass';

import UserHome from 'pages/User/UserHome';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<>
				{/*<Schedule />*/}
				<BrowserRouter basename={process.env.PUBLIC_URL}>
					<Routes>
						<Route path="/" element={<Navigate replace to="manage"/>} />
						<Route exact path={'manage'} element={<Home/>} />
						<Route exact path={'manage/detail'} element={<Manage/>} />
						<Route exact path={'manage/class'} element={<ManageClass/>} />
						{/*<Route path={'manage'} element={<Home/>}>*/}
							{/*<Route path={':personalName'} element={<Manage/>} />*/}
						{/*</Route>*/}
						<Route path={'join'} element={<join/>} />
						<Route path={'login'} element={<Login/>}>
							<Route path={':personalType'} element={<Login/>} />
						</Route>
						<Route path={'login'} element={<Login/>} />
						<Route path={'register'} element={<Register/>} />
						<Route path={'schedule'} element={<Schedule/>}>
							<Route path={':personalType'} element={<Schedule/>} />
						</Route>

						<Route path={'user'} element={<UserHome/>} />

					</Routes>
				</BrowserRouter>
			</>
		);
	}
}

export default App;