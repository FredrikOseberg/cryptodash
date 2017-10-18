import React, { Component } from 'react';
import './mobileactionbutton.css';

class MobileDashboardActionButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			scrolling: false
		};

		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
	}

	componentWillMount() {
		window.addEventListener('touchmove', this.handleTouchMove);
		window.addEventListener('touchEnd', this.handleTouchEnd);
		window.addEventListener('pointerdown', this.handleTouchMove);
		window.addEventListener('pointerup', this.handleTouchEnd);
	}

	componentWillUnmount() {
		window.removeEventListener('touchmove', this.handleTouchMove);
		window.removeEventListener('touchEnd', this.handleTouchEnd);
		window.removeEventListener('pointerdown', this.handleTouchMove);
		window.removeEventListener('pointerup', this.handleTouchEnd);
	}

	handleTouchMove() {
		console.log('touching');
		this.setState({ scrolling: true });
	}

	handleTouchEnd() {
		console.log('not moving');
		this.setState({ scrolling: false });
	}

	render() {
		let actionButtonClasses;
		if (this.state.scrolling) {
			actionButtonClasses = 'mobile--currencies--add--button';
		} else {
			actionButtonClasses = 'mobile--currencies--add--button visible opacity';
		}

		return (
			<div className="mobile--currencies--button--container">
				<div className={actionButtonClasses} onClick={this.props.handleAddCurrencyClick}>
					<i className="fa fa-plus" />
				</div>
			</div>
		);
	}
}

export default MobileDashboardActionButton;
