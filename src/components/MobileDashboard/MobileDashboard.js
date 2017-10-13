import React, { Component } from 'react';
import MobileDashMainPage from './MobileDashMainPage/MobileDashMainPage';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import MobilePortfolio from './MobilePortfolio/MobilePortfolio';
import MobileWallet from './MobileWallet/MobileWallet';
import MobileViewAllCoins from './MobileViewAllCoins/MobileViewAllCoins';
import { connect } from 'react-redux';
import './mobiledashboard.css';

class MobileDashboard extends Component {
	constructor(props) {
		super(props);

		this.interval;

		this.state = {
			currentCurrency: false,
			mobileDashboardPage: 'All Coins'
		};

		this.handleDashboardNavClick = this.handleDashboardNavClick.bind(this);
		this.handleAddCurrencyClick = this.handleAddCurrencyClick.bind(this);
	}

	componentDidMount() {
		this.props.addCurrenciesToState().then(() => {
			if (this.props.currencies.length > 0) {
				this.props.getCurrentCurrency(this.props.currencies[0].symbol).then(() => {
					this.setState({ currentCurrency: true });
				});

				this.interval = setInterval(() => {
					this.props.getCurrentCurrency(this.props.currentCurrency.symbol);
				}, 5000);
			}
		});
	}

	handleAddCurrencyClick() {
		this.setState({ mobileDashboardPage: 'All Coins' });
	}

	handleDashboardNavClick(listItem) {
		switch (listItem.dataset.target) {
			case 'Dashboard':
				this.setState({ mobileDashboardPage: 'Dashboard' });
				break;
			case 'Portfolio':
				this.setState({ mobileDashboardPage: 'Portfolio' });
				break;
			case 'All Coins':
				this.setState({ mobileDashboardPage: 'All Coins' });
				break;
			case 'Wallets':
				this.setState({ mobileDashboardPage: 'Wallets' });
				break;
			default:
				this.setState({ mobileDashboardPage: 'Dashboard' });
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		const showDashboard = this.state.mobileDashboardPage === 'Dashboard';
		const showPortfolio = this.state.mobileDashboardPage === 'Portfolio';
		const showWallets = this.state.mobileDashboardPage === 'Wallets';
		const showAllCoins = this.state.mobileDashboardPage === 'All Coins';
		return (
			<div className="mobile--dashboard">
				<MobileNavigation
					currentPage={this.state.mobileDashboardPage}
					handleDashboardNavClick={this.handleDashboardNavClick}
				/>
				{showDashboard && (
					<MobileDashMainPage
						getCurrentCurrency={this.props.getCurrentCurrency}
						currentCurrency={this.state.currentCurrency}
						currencies={this.props.currencies}
						handleAddCurrencyClick={this.handleAddCurrencyClick}
					/>
				)}
				{showPortfolio && <MobilePortfolio />}
				{showWallets && <MobileWallet />}
				{showAllCoins && <MobileViewAllCoins allCurrencies={this.props.allCurrencies} />}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currencies: state.selectedCurrencies,
	currentCurrency: state.currentCurrency
});

export default connect(mapStateToProps)(MobileDashboard);
