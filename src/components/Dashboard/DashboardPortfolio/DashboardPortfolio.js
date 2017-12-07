import React, { Component } from 'react';
import { database, auth } from '../../../firebase';
import map from 'lodash/map';
import { connect } from 'react-redux';
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
			hasDataToShow: false,
			hasDataPoints: false
		};

		this.checkFirebaseForPortfolio = this.checkFirebaseForPortfolio.bind(this);
	}

	componentDidMount() {
		this.checkFirebaseForPortfolio();
		this.checkFirebaseForDataPoints();
	}

	checkFirebaseForPortfolio() {
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

	checkFirebaseForDataPoints() {
		const databaseRef = database.ref(`/users/${auth.currentUser.uid}/portfolio`);
		const dataPointsArr = [];

		databaseRef.once('value', snapshot => {
			const dataPoints = snapshot.child('data').val();

			map(dataPoints, dataPoint => {
				dataPointsArr.push(dataPoint);
			});

			if (dataPointsArr.length >= 2) {
				this.setState({ hasDataPoints: true });
			}
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

		let dataInformationPending;
		if (this.state.hasDataToShow && this.state.hasDataPoints) {
			dataInformationPending = '';
		} else if (this.state.hasDataToShow && !this.state.hasDataPoints) {
			dataInformationPending = (
				<DashboardPortfolioInformation handleAddWalletClick={this.props.handleAddWalletClick} pending={true} />
			);
		}

		return (
			<div className="dashboard--portfolio">
				{dashboardInformation}
				{dataInformationPending}
				<div className="dashboard--portfolio--primary--content">
					<DashboardPortfolioChart hasDataToShow={this.state.hasDataToShow} />
					<DashboardPortfolioActivityLog handleAddWalletClick={this.props.handleAddWalletClick} />
				</div>
				<div className="dashboard--portfolio--secondary--content">
					<DashboardPortfolioDistributionLog />
					<DashboardPortfolioPieChart />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currencies: state.selectedCurrencies
});

export default connect(mapStateToProps)(DashboardPortfolio);
