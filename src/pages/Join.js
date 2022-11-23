import React from 'react';
import classNames from 'classnames';
import {Icon} from "asset/js/icon";

import Modal from "components/Modal";

import axios from "axios";

class Join extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
			userInfo: {
				gym_id: 1800,
				name: "",
				password: "",
				phone: "",
				role: "ROLE_ADMIN",
				trainer_id: ""
			}
		}
	}

	openModal = () => {
		this.setState({
			modalOpen: true
		});
	};

	closeModal = () => {
		this.setState({
			modalOpen: false
		});
		this.setInputReset();
	};

	setInputReset = () => {
		this.setState({
			userInfo: {
				name: "",
				password: "",
				phone: "",
				role: "ROLE_ADMIN",
				trainer_id: ""
			}
		});
	}

	setUserInfoApi = async () => {
		try{
			let userInfo = JSON.parse(JSON.stringify(this.state.userInfo));
			const requestOption ={
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache',
					'Accept': 'application/json'
				},
				// withCredentials: true
			};

			await axios.post("http://3.35.226.16:8080/api/auth/trainer/signup" ,
				JSON.stringify(userInfo), requestOption )

				.then(res =>{
					const resData = JSON.parse(JSON.stringify(res.data));
					console.log(resData);
					this.openModal();
				})
				.catch(ex=>{
					console.log("login requset fail : " + ex);
				})
				.finally(()=>{console.log("login request end")});
		}catch(e){
			console.log(e);
		}
	}

	onInputChange = (e) => {
		var target = e.target;

		this.setState({
			userInfo: {
				...this.state.userInfo,
				[target.name]: target.value,
			}
		});
	}

	render() {
		const {userInfo, modalOpen} = this.state;

		return (
			<div id={'wrap'} className={classNames('join_wrap')}>
				<h1 className={'title'}>
					<span className="blind">GoGym</span>
					{ <Icon.logoGo/>}
					{ <Icon.logoGym/>}
					{ <Icon.logoAdmin className={'logo_admin'}/>}
				</h1>
				<p className={'description'}>PT 회원 가입 서비스 (관리자용)</p>

				<div className={'form'}>
					<label htmlFor="form_id">아이디</label>
					<input id={'form_id'} type="text" name={'trainer_id'} value={userInfo.trainer_id} placeholder={'아이디를 입력해 주세요'} onChange={(e) =>this.onInputChange(e)} />
				</div>

				<div className={'form'}>
					<label htmlFor="form_pwd">비밀번호</label>
					<input id={'form_pwd'} type="password" name={'password'} value={userInfo.password} placeholder={'비밀번호를 입력해 주세요'} onChange={(e) =>this.onInputChange(e)} />
				</div>

				<div className={'form'}>
					<label htmlFor="form_name">이름</label>
					<input id={'form_name'} type="text" name={'name'} value={userInfo.name} placeholder={'이름을 입력해 주세요'} onChange={(e) =>this.onInputChange(e)} />
				</div>

				<div className={'form'}>
					<label htmlFor="form_phone">전화번호</label>
					<input id={'form_phone'} type="text" name={'phone'} value={userInfo.phone} placeholder={'전화번호를 입력해 주세요'} onChange={(e) =>this.onInputChange(e)} />
				</div>

				<button type={'submit'} className={'btn_login'} onClick={this.setUserInfoApi}>회원가입</button>

				<Modal open={modalOpen} close={this.closeModal} header="관리자 가입이 완료되었습니다.">
					<div className={'title'}><strong>{userInfo.trainer_id}</strong> 님의 ID와 PW가 생성되었습니다.</div>

					{/*this.setInputReset();*/}
				</Modal>
			</div>
		);
	}
}

export default Join;

