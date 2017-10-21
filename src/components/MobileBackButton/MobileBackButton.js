import React, { Component } from 'react';
import './mobilebackbutton.css';

class MobileBackButton extends Component {
	constructor(props) {
		super(props);

		this.handleBackClick = this.handleBackClick.bind(this);
	}

	handleBackClick() {
		if (this.props.emailReset) {
			this.props.history.push('/signin');
		} else {
			this.props.history.push('/');
		}
	}

	render() {
		return (
			<div className="mobile--back" onClick={this.handleBackClick}>
				<i className="fa fa-arrow-left" aria-hidden="true" />
			</div>
		);
	}
}

export default MobileBackButton;
