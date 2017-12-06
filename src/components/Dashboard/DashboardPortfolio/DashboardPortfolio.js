import React, { Component } from 'react';
import { database, auth } from '../../../firebase';
import map from 'lodash/map';
import DashboardPortfolioChart from './DashboardPortfolioChart/DashboardPortfolioChart';
import DashboardPortfolioPieChart from './DashboardPortfolioPieChart/DashboardPortfolioPieChart';
import DashboardPortfolioActivityLog from './DashboardPortfolioActivityLog/DashboardPortfolioActivityLog';
import DashboardPortfolioDistributionLog from './DashboardPortfolioDistributionLog/DashboardPortfolioDistributionLog';
import DashboardPortfolioInformation from './DashboardPortfolioInformation/DashboardPortfolioInformation';
import './dashboardportfolio.css';

class DashboardPortfolio extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hasDataToShow: false
		};
	}

	componentDidMount() {
		const databaseRef = database.ref(`/users/${auth.currentUser.uid}/currencies`);

		databaseRef.once('value', snapshot => {
			const currencies = snapshot.val();

			map(currencies, currency => {
				if (currency.wallet && currency.wallet.amount) {
					this.setState({ hasDataToShow: true });
					return;
				}
			});
		});
	}

	render() {
		let dashboardInformation;
		if (this.state.hasDataToShow) {
			dashboardInformation = '';
		} else {
			dashboardInformation = (
				<DashboardPortfolioInformation handleAddWalletClick={this.props.handleAddWalletClick} />
			);
		}

		return (
			<div className="dashboard--portfolio">
				{dashboardInformation}
				<div className="dashboard--portfolio--primary--content">
					<DashboardPortfolioChart />
					<DashboardPortfolioActivityLog />
				</div>
				<div className="dashboard--portfolio--secondary--content">
					<DashboardPortfolioDistributionLog />
					<DashboardPortfolioPieChart />
				</div>
			</div>
		);
	}
}

export default DashboardPortfolio;
