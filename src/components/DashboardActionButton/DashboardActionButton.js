import React, { Component } from 'react';
import './dashboardactionbutton.css';

class DashboardActionButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clicked: false
		};

		this.handleActionButtonClick = this.handleActionButtonClick.bind(this);
		this.handleWalletButtonClick = this.handleWalletButtonClick.bind(this);
	}

	handleActionButtonClick() {
		this.setState({ clicked: !this.state.clicked });
	}

	handleWalletButtonClick(event) {
		const component = event.currentTarget.dataset.target;
		console.log(component);
		this.props.showSidebar();
		this.props.setSidebarComponent(component);
	}

	render() {
		let walletButtonClasses, exchangeClasses;
		if (this.state.clicked) {
			walletButtonClasses = 'dashboard--action--button--wallet visible opacity transition';
			exchangeClasses = 'dashboard--action--button--exchange visible opacity transition';
		} else {
			walletButtonClasses = 'dashboard--action--button--wallet';
			exchangeClasses = 'dashboard--action--button--exchange';
		}
		return (
			<div className="dashboard--action--button" onClick={this.handleActionButtonClick}>
				<i className="fa fa-cogs" aria-hidden="true" />
				<div className={walletButtonClasses} onClick={this.handleWalletButtonClick} data-target="wallet">
					<i className="fa fa-folder" aria-hidden="true" />
				</div>
				<div className={exchangeClasses} data-target="exchange">
					<i className="fa fa-exchange" aria-hidden="true" />
				</div>
			</div>
		);
	}
}

export default DashboardActionButton;
