import React, { Component } from 'react';
import './dashboardportfolioactivitylogpaginationbutton.css';

class DashboardPortfolioActivityLogPaginationButton extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		const pageName = event.target.dataset.name;
		console.log(pageName);
		this.props.handlePageChange(pageName);
	}

	render() {
		let buttonClasses;
		if (this.props.name === this.props.currentPage.name) {
			buttonClasses =
				'dashboard--portfolio--activity--log--pagination--button dashboard--portfolio--activity--log--pagination--button--active';
		} else {
			buttonClasses = 'dashboard--portfolio--activity--log--pagination--button';
		}

		return (
			<button onClick={this.handleClick} data-name={this.props.name} className={buttonClasses}>
				{this.props.pageNumber}
			</button>
		);
	}
}

export default DashboardPortfolioActivityLogPaginationButton;
