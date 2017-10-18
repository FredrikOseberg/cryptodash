import React, { Component } from 'react';
import MobileDashMainPage from './MobileDashMainPage/MobileDashMainPage';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import MobilePortfolio from './MobilePortfolio/MobilePortfolio';
import MobileWallet from './MobileWallet/MobileWallet';
import MobileViewAllCoins from './MobileViewAllCoins/MobileViewAllCoins';
import MobileDashboardActionButton from './MobileDashboardActionButton/MobileDashboardActionButton';
import MobileAddWallet from './MobileAddWallet/MobileAddWallet';
import MobileSettings from './MobileSettings/MobileSettings';
import { connect } from 'react-redux';
import './mobiledashboard.css';

class MobileDashboard extends Component {
	constructor(props) {
		super(props);

		this.interval;

		this.state = {
			currentCurrency: false,
			mobileDashboardPage: 'Dashboard'
		};

		this.handleDashboardNavClick = this.handleDashboardNavClick.bind(this);
		this.handleAddCurrencyClick = this.handleAddCurrencyClick.bind(this);
		this.handleAddWalletClick = this.handleAddWalletClick.bind(this);
		this.setDefaultState = this.setDefaultState.bind(this);
	}

	componentDidMount() {
		this.props.addCurrenciesToState().then(() => {
			if (this.props.currencies.length > 0) {
				console.log(this.props.currencies[0].symbol);
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

	handleAddWalletClick() {
		this.setState({ mobileDashboardPage: 'Add Wallet' });
	}

	setDefaultState() {
		this.setState({ mobileDashboardPage: 'Dashboard' });
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
			case 'Settings':
				this.setState({ mobileDashboardPage: 'Settings' });
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
		const showAddWallet = this.state.mobileDashboardPage === 'Add Wallet';
		const showSettings = this.state.mobileDashboardPage === 'Settings';
		const showActionButton = this.state.mobileDashboardPage !== 'Settings';
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
					/>
				)}
				{showPortfolio && <MobilePortfolio />}
				{showWallets && <MobileWallet />}
				{showAllCoins && <MobileViewAllCoins allCurrencies={this.props.allCurrencies} />}
				{showAddWallet && <MobileAddWallet setDefaultState={this.setDefaultState} />}
				{showSettings && <MobileSettings />}
				{showActionButton && (
					<MobileDashboardActionButton
						handleAddCurrencyClick={this.handleAddCurrencyClick}
						handleAddWalletClick={this.handleAddWalletClick}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currencies: state.selectedCurrencies,
	currentCurrency: state.currentCurrency
});

export default connect(mapStateToProps)(MobileDashboard);
