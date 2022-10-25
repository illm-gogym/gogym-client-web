import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Join from './pages/Join';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id={'wrap'}>
				<Router>
					<Route exact path='/' component={Home} />
					<Route path='/join' component={Join} />
				</Router>
			</div>
		);
	}
}

export default App;

