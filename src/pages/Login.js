import React from 'react';
import classNames from 'classnames';
import {Icon} from "asset/js/icon";
import axios from "axios";

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modalOpen: false,
			loginInfo: {
				password: '',
				trainerId: ''
			},
		}
	}

	loginApi = async () => {
		try{
			let loginInfo = JSON.parse(JSON.stringify(this.state.loginInfo));
			const requestOption ={
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache',
					'Accept': 'application/json'
				}
			};
			await axios.post("http://3.35.226.16:8080/api/authenticate" ,
				JSON.stringify(loginInfo), requestOption )

				.then(res =>{
					const accessToken = JSON.parse(JSON.stringify(res.data));
					localStorage.setItem('access-token', accessToken.token);
					console.log(accessToken);
					// API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
					axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
					localStorage.setItem('login-id', loginInfo.trainerId);
				})
				.catch(ex=>{
					console.log("login requset fail : " + ex);
					alert('로그인 정보를 확인해주세요.')
				})
				.finally(()=>{console.log("login request end")});
		}catch(e){
			console.log(e);
		}
	}

	onInputChange = (e) => {
		var target = e.target;

		this.setState({
			loginInfo: {
				...this.state.loginInfo,
				[target.name]: target.value,
			}
		});
	}

	render() {
		const { loginInfo } = this.state;
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
					<input id={'form_email'} type="text" placeholder={'이메일 주소를 입력해 주세요'} name={'trainerId'} value={loginInfo.trainerId || ''} onChange={(e) =>this.onInputChange(e)}/>
				</div>

				<div className={'form'}>
					<label htmlFor="form_pwd">비밀번호</label>
					<input id={'form_pwd'} type="password" placeholder={'비밀번호를 입력해 주세요'} name={'password'} value={loginInfo.password || ''} onChange={(e) =>this.onInputChange(e)} />
				</div>

				<button type={'submit'} className={'btn_login'} onClick={this.loginApi}>로그인</button>
			</div>
		);
	}
}

export default Login;

