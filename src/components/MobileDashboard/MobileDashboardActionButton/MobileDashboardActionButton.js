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
		this.handleAddWalletClick = this.handleAddWalletClick.bind(this);
		this.handleAddCurrencyClick = this.handleAddCurrencyClick.bind(this);
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

	handleAddWalletClick() {
		this.props.setPage('Wallets');
	}

	handleAddCurrencyClick() {
		this.props.setPage('All Coins');
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

		let buttonMarkup;
		if (this.props.bottomOfPage) {
			buttonMarkup = (
				<div
					className="mobile--currencies--add--button visible opacity mobile--currencies--add--button--bottom"
					onClick={this.handleClick}
				>
					<i className="fa fa-plus" aria-hidden="true" />
					<div className="mobile--currencies--action--buttons--container">
						<div className={actionButtonContainerClasses}>
							<div className="mobile--action--button--add" onClick={this.handleAddWalletClick}>
								<i className="fa fa-folder" aria-hidden="true" />
							</div>
							<div className="mobile--action--button--add" onClick={this.handleAddCurrencyClick}>
								<i className="fa fa-circle" aria-hidden="true" />
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			buttonMarkup = (
				<div className={actionButtonClasses} onClick={this.handleClick}>
					<i className="fa fa-plus" aria-hidden="true" />
					<div className="mobile--currencies--action--buttons--container">
						<div className={actionButtonContainerClasses}>
							<div className="mobile--action--button--add" onClick={this.handleAddWalletClick}>
								<i className="fa fa-folder" aria-hidden="true" />
							</div>
							<div className="mobile--action--button--add" onClick={this.handleAddCurrencyClick}>
								<i className="fa fa-circle" aria-hidden="true" />
							</div>
						</div>
					</div>
				</div>
			);
		}

		return <div className="mobile--currencies--button--container">{buttonMarkup}</div>;
	}
}

export default MobileDashboardActionButton;
