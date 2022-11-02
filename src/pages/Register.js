import React from 'react';
import classNames from 'classnames';

import Aside from 'components/Aside';
import Modal from "components/Modal";

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modalOpen: false,
		}
	}

	componentDidMount() {
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
	};

	onSubmit = () => {
		console.log('tt');
		this.openModal();
	}


	render() {
		const {modalOpen} = this.state;

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
						<button type={'submit'} className={'btn_register'} disabled={false} onClick={this.onSubmit} >등록 완료</button>
					</div>
				</div>

				<Modal open={modalOpen} close={this.closeModal} header=" ">
					<div className={'title'}><strong>조영은</strong> 님의 ID와 PW가 생성되었습니다.</div>
					<p className={'description'}>
						회원전용 앱을 설치한 후 아래 아이디와 비밀번호를 입력할 수 있습니다. <br/>
						아이디는 휴대폰 번호이며 비밀번호는 휴대폰 번호 뒷 4자리 입니다.
					</p>
					<ul className={'user_information'}>
						<li className={'row'}>
							<span className={'cell'}>ID</span>
							<span className={'cell'}>01012345678</span>
						</li>
						<li className={'row'}>
							<span className={'cell'}>PW</span>
							<span className={'cell'}>1234</span>
						</li>
					</ul>
				</Modal>
			</div>
		);
	}
}

export default Home;

