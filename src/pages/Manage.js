import React from 'react';
import classNames from 'classnames';
import {Icon} from "asset/js/icon";

import {getAuthToken, getAuthTrainerId} from 'Util/Authentication';
import {dateFormatYYYYDDMM} from 'Util/DateFormat';
import Aside from 'components/Aside';
import {useParams, useLocation, useNavigate, Link} from "react-router-dom";
import axios from "axios";
import {nanoid} from "nanoid";

function withParams(Component) {
	return props => <Component {...props} params={useParams()} location={useLocation()} navigate={useNavigate()}/>;
}

class Manage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			personal: {
				date: "",
				name: "",
				user_phone: "",
			},
			personalList: [],
			isLoadDate: false,
		}
	}

	historyBack = () => {
		this.props.navigate(-1);
	}

	getUserNameReservationApi = async (value) => {
		try{
			// console.log(value);
			const param = JSON.parse(JSON.stringify({
				user_phone: value
			}));
			const requestOption ={
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache',
					'Accept': 'application/json',
					Authorization: `Bearer ${getAuthToken()}`,
				},
			};
			await axios.post("http://13.125.53.84:8080/api/auth/reservation/all/user",
				JSON.stringify(param), requestOption )
				.then(res =>{
					const resData = JSON.parse(JSON.stringify(res.data));
					axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
					// console.log(resData.data);
					this.setState({
						personalList : [
							...resData.data
						]
					})
				})
				.catch(ex=>{
					console.log("login requset fail : " + ex);
					// console.log(ex.response.status);
				})
				.finally(()=>{console.log("login request end")});
		}catch(e){
			console.log(e.response);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.personalList.length !== prevState.personalList.length) {
			console.log('ttt');
			this.setState({
				isLoadDate: true,
			});
		}
	}

	componentDidMount() {
		const { personal } = this.props.location.state;

		this.setState({
			personal: personal,
		});
		this.getUserNameReservationApi(personal.user_phone);
	}

	render() {
		const { personal, personalList, isLoadDate } = this.state;

		const getPersonalList = personalList.map((value, index) =>
			<li className={'item'} key={nanoid()}>
				<span className={classNames('index')}>
					{personalList.length - index}
				</span>
				<span className={classNames('date')}>
					{dateFormatYYYYDDMM(value.reservation.start_time, '.', 'day')}
				</span>
				<span className={classNames('state', {'prearrange' : value.reservation.usage_state === -1} )}>
					{value.reservation.usage_state === -1 ? '예정' : '완료'}
				</span>
				<span className={'detail'}>
					<Link to={`/manage/class`} state={{personal:value}} className={'btn_detail'}>
						수업 보기
					</Link>
				</span>
			</li>
		);

		return (
			<div id={'wrap'} className={classNames('manage_wrap')}>
				<Aside link={'/manage'}/>
				<div className="container">
					<div className={'notify_area'}>
						<h2>
							<button type={'button'} className={'btn_back'} onClick={this.historyBack}><Icon.ic24BulletArrowLeft333/></button>
							개인 관리
						</h2>
					</div>

					<div className={classNames('section', 'full')}>
						<div className={'manage_header'}>
							<div className={'header_area'}>
								<strong>{personal.name}</strong>
								<button type={'button'} className={'btn_edit'}>
									<Icon.ic12Pencil666/>
									회원 정보 수정
								</button>
							</div>

							<ul className={'sort_list'}>
								<li className={'item'}>
									<input id={'sort_all'} type="radio" name={'sort'} />
									<label htmlFor="sort_all">전체</label>
								</li>
								<li className={'item'}>
									<input id={'sort_planned'} type="radio" name={'sort'}/>
									<label htmlFor="sort_planned">예정</label>
								</li>
								<li className={'item'}>
									<input id={'sort_finish'} type="radio" name={'sort'}/>
									<label htmlFor="sort_finish">완료</label>
								</li>
							</ul>
						</div>

						<div className={'manage_content'}>
							<div className={'personal_list'}>
								{isLoadDate ? getPersonalList : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withParams(Manage);
