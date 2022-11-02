import React from 'react';
import classNames from 'classnames';
import {Icon} from "../asset/js/icon";

class Join extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		return (
			<div id={'wrap'} className={classNames('join_wrap')}>
				<h1 className={'title'}>
					<span className="blind">GoGym</span>
					{ <Icon.logoGo/>}
					{ <Icon.logoGym/>}
					{ <Icon.logoAdmin className={'logo_admin'}/>}
				</h1>
				<p className={'description'}>PT 회원 예약 서비스 (관리자용)</p>
				
				<div className={'form'}>
					<label htmlFor="form_email">이메일</label>
					<input id={'form_email'} type="text" placeholder={'이메일 주소를 입력해 주세요'}/>
				</div>

				<div className={'form'}>
					<label htmlFor="form_pwd">비밀번호</label>
					<input id={'form_pwd'} type="text" placeholder={'비밀번호를 입력해 주세요'}/>
				</div>

				<button type={'submit'} className={'btn_login'}>로그인</button>
			</div>
		);
	}
}

export default Join;

