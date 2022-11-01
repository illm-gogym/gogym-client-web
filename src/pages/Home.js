import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Aside from '../components/Aside';

import {Icon} from "../asset/js/icon";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			memberList: [
				{id: '221003', name: '김문수', date: '22.10.03', reservation: 1},
				{id: '221001', name: '김동수', date: '22.10.01', reservation: 0},
				{id: '220920', name: '라강민', date: '22.09.20', reservation: 0},
				{id: '228010', name: '이선아', date: '22.08.10', reservation: 0}
			]
		}
	}

	componentDidMount() {

	}

	render() {
		const {memberList} = this.state;
		return (
			<div id={'wrap'} className={classNames('home_wrap')}>
				<Aside link={''}/>
				<div className="container">
					<h2 className={'blind'}>회원 관리</h2>
					<div className={'notify_area'}>

					</div>
					<div className={'section'}>
						<div className={'article'}>
							<div className={'article_content'}>
								<strong className={'title'}>새로운 회원을 등록하세요.</strong>
								<p className={'description'}>신규 회원을 등록하고 한눈에 관리해 보세요!</p>
							</div>
							<Link to={'/register'} className={'btn_article'} >
								회원 등록하기
							</Link>
						</div>
					</div>
					<div className={'section'}>
						<h3>회원 ({memberList.length}명)</h3>
						<ul className={'member_list'}>
							{memberList.map((value, index) =>
								<li key={`hash--${value.id}`} className={'item'}>
									<strong>{value.name}</strong>
									<span className={'date'}>{value.date}</span>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;

