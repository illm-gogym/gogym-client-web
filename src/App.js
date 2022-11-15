import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from 'pages/Home';
import Join from 'pages/Join';
import Register from 'pages/Register';
import Schedule from 'pages/Schedule';

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
						<Route exact path={`/`} element={<Home/>} />
						<Route path={`/join`} element={<Join/>} />
						<Route path={`/register`} element={<Register/>} />
						<Route path={`/schedule`} element={<Schedule/>} />
					</Routes>
				</BrowserRouter>
			</>
		);
	}
}

export default App;