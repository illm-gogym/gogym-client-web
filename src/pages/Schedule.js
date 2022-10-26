import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Aside from '../components/Aside';

import {Icon} from "../asset/js/icon";

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		return (
			<div id={'wrap'} className={classNames('schdule_wrap')}>
				<Aside link={'schedule'}/>
				<div className="container">
					<div className={'notify_area'}>
						<h2>스케줄 관리</h2>
					</div>
					<div className={'section'}>
						<div className={'article'}>
							<div className={'article_content'}>
								<strong className={'title'}>10.20 일정 (5개)</strong>
								<p className={'description'}>김문수, 라강민 님</p>
							</div>
							<Link to={'/register'} className={'btn_article'} >
								일정 확인하기
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;

