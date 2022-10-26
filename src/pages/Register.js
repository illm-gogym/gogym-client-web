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
			<div id={'wrap'} className={classNames('register_wrap')}>
				<Aside link={'register'}/>
				<div className="container">
					<div className={'notify_area'}>
						<h2>회원 등록</h2>
					</div>

					<form className="form_area">
						<div className={'form_box'}>
							<input type="text" className={'form_input'} placeholder={'이름을 입력해 주세요'} required={'true'}/>
							<label className={'form_label'}>이름</label>
						</div>
						<div className={'form_box'}>
							<input type="text" className={'form_input'} placeholder={'생년월일을 입력해 주세요'} required={'true'}/>
							<label className={'form_label'}>생년월일</label>
							<p className={'form_detail'}>예) 1992.02.28</p>
						</div>
						<div className={'form_box'}>
							<input type="text" className={'form_input'} placeholder={'01012345678'} required={'true'}/>
							<label className={'form_label'}>전화번호</label>
							<p className={'form_detail'}>‘-’ 없이 입력해 주세요 </p>
						</div>
						<div className={'form_box'}>
							<input type="text" className={'form_input'} placeholder={'주소를 입력해 주세요'} required={'true'}/>
							<label className={'form_label'}>주소</label>
						</div>
						<div className={'form_box'}>
							<input type="text" className={'form_input'} placeholder={'0'} required={'true'}/>
							<label className={'form_label'}>수강권 (횟수)</label>
							<p className={'form_detail'}>안내문구 작성하기</p>
						</div>
					</form>

					<div className={'register_area'}>
						<button type={'submit'} className={'btn_register'} disabled={'true'}>등록 완료</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;

