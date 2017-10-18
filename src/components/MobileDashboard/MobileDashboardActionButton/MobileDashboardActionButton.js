import React, { Component } from 'react';
import './mobileactionbutton.css';

class MobileDashboardActionButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			scrolling: false,
			clicked: false
		};

		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentWillMount() {
		window.addEventListener('touchstart', this.handleTouchMove);
		window.addEventListener('touchend', this.handleTouchEnd);
	}

	componentWillUnmount() {
		window.removeEventListener('touchstart', this.handleTouchMove);
		window.removeEventListener('touchend', this.handleTouchEnd);
	}

	handleTouchMove() {
		if (this.state.clicked === false) {
			this.setState({ scrolling: true });
		}
	}

	handleTouchEnd() {
		this.setState({ scrolling: false });
	}

	handleClick() {
		this.setState({ clicked: !this.state.clicked });
	}

	render() {
		let actionButtonClasses;
		if (this.state.scrolling) {
			actionButtonClasses = 'mobile--currencies--add--button';
		} else {
			actionButtonClasses = 'mobile--currencies--add--button visible opacity';
		}

		let actionButtonContainerClasses;
		if (this.state.clicked) {
			actionButtonContainerClasses = 'mobile--currencies--action--buttons visible opacity';
		} else {
			actionButtonContainerClasses = 'mobile--currencies--action--buttons';
		}

		return (
			<div className="mobile--currencies--button--container">
				<div className={actionButtonClasses} onClick={this.handleClick}>
					<i className="fa fa-plus" aria-hidden="true" />
					<div className="mobile--currencies--action--buttons--container">
						<div className={actionButtonContainerClasses}>
							<div className="mobile--action--button--add">
								<i className="fa fa-folder" aria-hidden="true" />
							</div>
							<div className="mobile--action--button--add" onClick={this.props.handleAddCurrencyClick}>
								<i className="fa fa-circle" aria-hidden="true" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MobileDashboardActionButton;