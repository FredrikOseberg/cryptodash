import React, { Component } from 'react';
import './dashboardactionbutton.css';

class DashboardActionButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clicked: false
		};

		this.handleActionButtonClick = this.handleActionButtonClick.bind(this);
		this.handleNavigationClick = this.handleNavigationClick.bind(this);
	}

	handleActionButtonClick() {
		this.setState({ clicked: !this.state.clicked });
	}

	handleNavigationClick(event) {
		const component = event.currentTarget.dataset.target;
		this.props.showSidebar();
		this.props.setSidebarComponent(component);
	}

	render() {
		let walletButtonClasses, exchangeClasses, portfolioClasses, allcoinsClasses;
		if (this.state.clicked) {
			walletButtonClasses = 'dashboard--action--button--wallet visible opacity transition';
			exchangeClasses = 'dashboard--action--button--exchange visible opacity transition';
			portfolioClasses = 'dashboard--action--button--portfolio visible opacity transition';
			allcoinsClasses = 'dashboard--action--button--allcoins visible opacity transition';
		} else {
			walletButtonClasses = 'dashboard--action--button--wallet';
			exchangeClasses = 'dashboard--action--button--exchange';
			portfolioClasses = 'dashboard--action--button--portfolio';
			allcoinsClasses = 'dashboard--action--button--allcoins';
		}

		return (
			<div className="dashboard--action--button" onClick={this.handleActionButtonClick}>
				<i className="fa fa-cogs" aria-hidden="true" />
				<div className={walletButtonClasses} onClick={this.handleNavigationClick} data-target="wallet">
					<i className="fa fa-folder" aria-hidden="true" />
				</div>
				<div className={exchangeClasses} data-target="exchange" onClick={this.handleNavigationClick}>
					<i className="fa fa-exchange" aria-hidden="true" />
				</div>
				<div className={portfolioClasses} data-target="portfolio" onClick={this.handleNavigationClick}>
					<i className="fa fa-money" aria-hidden="true" />
				</div>
				<div className={allcoinsClasses} data-target="allcoins" onClick={this.handleNavigationClick}>
					<i className="fa fa-plus" aria-hidden="true" />
				</div>
			</div>
		);
	}
}

export default DashboardActionButton;
