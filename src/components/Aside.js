import React from "react";
import {Icon} from "../asset/js/icon";
import classNames from "classnames";
import {Link} from "react-router-dom";
import $ from 'jquery';

class Aside extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			centerName : '헬스장 이름 최대 노출 얼마나 할지 정해볼까요?',
			centerNameEditable: false,
			userImage: {
				imageSrc:  '/images/@sample_profile.png' ,
				setImageSrc: '',
			},
			manageList: [
				{title:'회원 관리', icon: <Icon.ic24TrendingUp/>, router: '', active: false},
				{title:'스케줄 관리', icon: <Icon.ic24Summery/>, router: 'schedule', active: false},
			],
		};

		this.onCheckRouter();
	}

	componentDidMount() {
	}

	onCheckRouter = () => {
		const currentPage = this.props.link;
		{this.state.manageList.map((value, index) => {
				if(value.router === currentPage) {
					value.active = true;
				} else {
					value.active = false;
				}
			}
		)}
	}

	editableName = (e) => {
		this.setState({
			centerNameEditable: !this.state.centerNameEditable,
		});
	}

	editNameChange = (e) => {
		if(e.key === 'Enter') { // enter
			this.setState({
				centerNameEditable: false,
			});
		} else {
			this.setState({
				centerName: e.target.value,
			});
		}
	}

	onClickManage = (e) => {
		// console.log(this.props.link);
	}

	encodeFileToBase64 = (fileBlob) => {
		const reader = new FileReader();
		reader.readAsDataURL(fileBlob);
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
		const {centerName, centerNameEditable, userImage, manageList} = this.state;
		return (
			<div className={'aside'}>
				<div className={'aside_header'}>
					<h1 className={'company'}>
						{ <Icon.logoSmallGo/>}
						{ <Icon.logoSmallGym/>}
						{ <Icon.logoSmallAdmin className={'logo_admin'} />}
					</h1>
					<div className={'profile'}>
						<div className="thumb_area">
							<div className={'thumbnail'}>
								<img src={ userImage.setImageSrc !== '' ? userImage.setImageSrc : userImage.imageSrc} alt=""/>
							</div>

							<input type="file" id={'userProfile'} className={'input_file'} onChange={(e) => { this.encodeFileToBase64(e.target.files[0]);}} />
							<label htmlFor="userProfile" className={'label_file'}> <Icon.ic12Pencil/> </label>
						</div>

						<div className={'information'}>
							<div className={classNames('name_area',  {'edit': centerNameEditable})}>
								<div  className={classNames('name')}>
									{centerName}
								</div>
								<textarea spellCheck="false" className={classNames('input_name', '')} onKeyPress={(e) => { this.editNameChange(e) }} >
									{centerName}
								</textarea>
								<button type={'button'} className={'btn_edit'} onClick={this.editableName}>
									<Icon.ic8Pencil/>
								</button>
							</div>
							<p className={'description'}>정현규 트레이너</p>
							<button type={'button'} className={'btn_setting'}>
								<Icon.ic14Setting/> 계정설정
							</button>
						</div>
					</div>
				</div>
				<div className={'aside_content'}>
					<ul className={'menage_list'}>
						{manageList.map((value, index) =>
							<li key={`manage-${value.router}`} className={'item'} onClick={this.onClickManage}>
								<Link to={value.router}  className={classNames('link', {'active' : value.active} )}>
									{value.icon}
									{value.title}
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		);
	}
}

export default Aside;