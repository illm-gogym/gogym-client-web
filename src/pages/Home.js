import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import {Icon} from "../asset/js/icon";

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state={
			centerName : '헬스장 이름 일이삼사오육 이삼사오육칠팔구십',
			centerNameEditable: false,
			userImage: {
				imageSrc:  '../asset/img/@sample_profile.png' ,
				setImageSrc: '',
			}
		}
	}

	componentDidMount() {
	}

	editableName = () => {
		this.setState({
			centerNameEditable: !this.state.centerNameEditable,
		});
	}

	editKeydown = (e) => {
		if(e.which == 13) { // enter
			this.setState({
				centerNameEditable: false,
			});
		}
	}

	onClickManage = (e) => {
		console.log(e);
	}

	encodeFileToBase64 = (fileBlob) => {
		const reader = new FileReader();
		reader.readAsDataURL(fileBlob)
		console.log(fileBlob);
		if((fileBlob.type).includes('image/'))
			return new Promise((resolve) => {
				reader.onload = () => {
					this.setState({
						userImage: {
							setImageSrc: reader.result
						},
					});
					resolve();
				};
			});
		else {
			alert('이미지 파일이 아닙니다');
		}
	};

	render() {
		const {centerName, centerNameEditable, userImage} = this.state;
		const manageList = [
			{title:'회원 관리', icon: <Icon.ic24TrendingUp/>, router: 'manage', active: true},
			{title:'회원 등록', icon: <Icon.ic24Summery/>, router: 'register', active: false},
		];
		return (
			<div className={'home_wrap'}>
				<div className={'aside'}>
					<div className={'aside_header'}>
						<div className={'company'}>
							{ <Icon.logoSmallGo/>}
							{ <Icon.logoSmallGym/>}
							{ <Icon.logoSmallAdmin className={'logo_admin'} />}
						</div>
						<div className={'profile'}>
							<div className={'thumbnail'}>
								<img src={ userImage.setImageSrc !== null ? userImage.setImageSrc : require(userImage.imageSrc) } alt=""/>

								<input type="file" id={'userProfile'} className={'input_file'} onChange={(e) => { this.encodeFileToBase64(e.target.files[0]);}} />
								<label htmlFor="userProfile" className={'label_file'}> <Icon.ic12Pencil/> </label>
							</div>

							<div className={'information'}>
								<div className={'name_area'}>
									<div className={'input_name'} contentEditable={centerNameEditable} onKeyDown={e => this.editKeydown(e)} suppressContentEditableWarning={true} >
										{centerName}
									</div>
									<button type={'button'} className={'btn_edit'} onClick={this.editableName}>
										<Icon.ic8Pencil/>
									</button>
								</div>
								<p className={'description'}>일반 판매 작가</p>
								<button type={'button'} className={'btn_setting'}>
									<Icon.ic14Setting/> 계정설정
								</button>
							</div>
						</div>
					</div>
					<div className={'aside_content'}>
						<ul className={'menage_list'}>
							{manageList.map((value, index) =>
								<li key={`index--${value.router}`} className={'item'} onClick={this.onClickManage}>
									<Link to={value.router}  className={classNames('link', {'active' : value.active} )}>
										{value.icon}
										{value.title}
									</Link>
								</li>
							)}
						</ul>
					</div>
				</div>
				<div className="container">

				</div>
			</div>
		);
	}
}

export default Home;

