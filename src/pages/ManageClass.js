import React from 'react';
import classNames from 'classnames';
import {Icon} from "asset/js/icon";

import {getAuthToken, getAuthTrainerId} from 'Util/Authentication';
import {dateFormatYYYYDDMM, dateFormatGetTime} from 'Util/DateFormat';
import Aside from 'components/Aside';
import {useParams, useLocation, useNavigate, Link} from "react-router-dom";
import axios from "axios";
import {nanoid} from "nanoid";

function withParams(Component) {
	return props => <Component {...props} params={useParams()} location={useLocation()} navigate={useNavigate()}/>;
}

class ManageClass extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			personal: {
				date: "",
				name: "",
				user_phone: "",
			},
			isLoadDate: false,
		}
	}

	historyBack = () => {
		this.props.navigate(-1);
	}

	componentDidMount() {
		const { personal } = this.props.location.state;

		this.setState({
			personal: personal,
			isLoadDate: true,
		});

		console.log(personal);
	}

	render() {
		const {isLoadDate, personal} = this.state;
		return (
			<div id={'wrap'} className={classNames('manage_wrap')}>
				<Aside link={'/manage'}/>
				<div className="container">
					<div className={'notify_area'}>
						<h2>
							<button type={'button'} className={'btn_back'} onClick={this.historyBack}><Icon.ic24BulletArrowLeft333/></button>
							 회원 관리
						</h2>
					</div>

					<div className={classNames('section', 'full')}>
						{isLoadDate &&
							<>
								<div className={'title'}>
									{dateFormatYYYYDDMM(personal.reservation.start_time, '.', 'day')}
								</div>
								<p className={'class_description'}>
									{dateFormatGetTime(personal.reservation.start_time)}~{dateFormatGetTime(personal.reservation.end_time)} 수업 메모
								</p>
							</>
						}
					</div>
				</div>
			</div>
		);
	}
}

export default withParams(ManageClass);
