import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Join from './pages/Join';
import Register from './pages/Register';
import Schedule from './pages/Schedule';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<>
				<Router>
					<Route exact path='/' component={Home} />
					<Route path='/join' component={Join} />
					<Route path='/register' component={Register} />
					<Route path='/schedule' component={Schedule} />
				</Router>
			</>
		);
	}
}

export default App;

