import React from 'react';
import {Icon} from "asset/js/icon";

class ChkBox extends React.Component {
	// 생성자
	constructor(props) {
		super(props);
		// 초기화
		console.log(this.props.label);
		this.state = {
			// checked: this.props.checkState !== null? this.props.checkState : false,
			checked: this.props.label.checkState? this.props.label.checkState : false,
		}
	}

	render() {
		// 체크 해제
		let chk_yn = <i class="chk_box"></i>;
		// 체크되어 있는지 확인
		if(this.state.checked) {
			// chk_yn = `●`
			chk_yn = <i className="chk_box"><Icon.ic11Check/></i>
		}

		// 클릭 이벤트
		const click = (e) => {
			const val = !this.state.checked;
			this.setState({checked: val});

			if(val) {
				this.props.onSelectMember(e, this.props.label);
			}
		}

		// 렌더링할 내용 반환
		return (
			<div onClick={click} className={'item'}>
				{chk_yn}{this.props.label.name}
			</div>
		)
	}
}

export default ChkBox;