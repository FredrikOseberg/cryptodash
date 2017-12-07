import React, { Component } from 'react';
import './dashboardportfolioinformation.css';

class DashboardPortfolioInformation extends Component {
	constructor(props) {
		super(props);

		this.handleButtonClick = this.handleButtonClick.bind(this);
	}

	handleButtonClick() {
		this.props.handleAddWalletClick();
	}

	render() {
		let dashboardInformation;
		let dashboardHeader;
		if (this.props.pending) {
			dashboardInformation = (
				<div className="dashboard--portfolio--information--paragraph--container">
					<p>
						You have added a record that tracks your portfolio, however you do not yet have enough
						datapoints to display the graph correctly.
					</p>
					<p>
						A snapshot of your portfolio value is taken each day. Once you have two data points, your graph
						will start to display your portfolio movements.
					</p>
				</div>
			);

			dashboardHeader = (
				<h1>
					Portfolio Status:{' '}
					<span className="dashboard--portfolio--information--header--higlight">Pending</span>
				</h1>
			);
		} else {
			dashboardInformation = (
				<div className="dashboard--portfolio--information--paragraph--container">
					<p>The data below is not yet representative of your portfolio.</p>
					<p>
						Once you add your own data, the graph will use dummy data until you have at least two data
						points.
					</p>
				</div>
			);

			dashboardHeader = <h1>Important Information</h1>;
		}
		return (
			<div className="dashboard--portfolio--information">
				<div className="dashboard--portfolio--information--icon">
					<i className="fa fa-exclamation-triangle" aria-hidden="true" />
				</div>
				<div className="dashboard--portfolio--information--container">
					{dashboardHeader}
					{dashboardInformation}
				</div>
				<div className="dashboard--portfolio--add">
					<button onClick={this.handleButtonClick} className="dashboard--portfolio--add--button">
						+
					</button>
				</div>
			</div>
		);
	}
}

export default DashboardPortfolioInformation;
