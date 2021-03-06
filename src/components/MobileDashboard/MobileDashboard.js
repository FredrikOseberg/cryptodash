import React, { Component } from 'react';
import MobileDashMainPage from './MobileDashMainPage/MobileDashMainPage';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import MobilePortfolio from './MobilePortfolio/MobilePortfolio';
import MobileWallet from './MobileWallet/MobileWallet';
import MobileViewAllCoins from './MobileViewAllCoins/MobileViewAllCoins';
import MobileDashboardActionButton from './MobileDashboardActionButton/MobileDashboardActionButton';
import MobileAddWallet from './MobileAddWallet/MobileAddWallet';
import MobileSettings from './MobileSettings/MobileSettings';
import MobileSupport from './MobileSupport/MobileSupport';
import { connect } from 'react-redux';
import { debounce } from '../../common/helpers';
import './mobiledashboard.css';

class MobileDashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentCurrency: false,
			mobileDashboardPage: 'Dashboard',
			actionButtonStick: false
		};

		this.handleDashboardNavClick = this.handleDashboardNavClick.bind(this);
		this.setDefaultState = this.setDefaultState.bind(this);
		this.setPage = this.setPage.bind(this);
		this.handleScrollBound = debounce(this.handleScroll.bind(this), 25);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		window.addEventListener('scroll', this.handleScrollBound, false);
		document.body.style.height = 'auto';

		this.interval = setInterval(() => {
			this.props.getCurrentCurrency(this.props.currentCurrency.symbol);
		}, 5000);

		this.setState({ currentCurrency: true });
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScrollBound, false);
		document.body.style.height = '100%';
		clearInterval(this.interval);
		console.log('unmounting dashboard');
	}

	handleScroll() {
		let bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
		if (
			bottom &&
			(this.state.mobileDashboardPage === 'Dashboard' || this.state.mobileDashboardPage === 'Wallets')
		) {
			this.setState({ actionButtonStick: true }, () => {
				window.scrollTo(0, document.body.scrollHeight);
			});
		} else {
			this.setState({ actionButtonStick: false });
		}
	}

	setDefaultState() {
		this.setState({ mobileDashboardPage: 'Dashboard' });
	}

	setPage(page) {
		this.setState({ mobileDashboardPage: page });
	}

	handleDashboardNavClick(listItem) {
		switch (listItem.dataset.target) {
			case 'Dashboard':
				this.setState({ mobileDashboardPage: 'Dashboard' });
				this.setState({ actionButtonStick: false });
				break;
			case 'Portfolio':
				this.setState({ mobileDashboardPage: 'Portfolio' });
				this.setState({ actionButtonStick: false });
				break;
			case 'All Coins':
				this.setState({ mobileDashboardPage: 'All Coins' });
				this.setState({ actionButtonStick: false });
				break;
			case 'Wallets':
				this.setState({ mobileDashboardPage: 'Wallets' });
				this.setState({ actionButtonStick: false });
				break;
			case 'Settings':
				this.setState({ mobileDashboardPage: 'Settings' });
				this.setState({ actionButtonStick: false });
				break;
			case 'Support Me':
				this.setState({ mobileDashboardPage: 'Support Me' });
				this.setState({ actionButtonStick: false });
				break;
			default:
				this.setState({ mobileDashboardPage: 'Dashboard' });
				this.setState({ actionButtonStick: false });
		}
	}

	render() {
		let portfolioExists = this.props.currencies.filter(currency => {
			return (
				currency.wallet && currency.wallet.wallet && currency.wallet.amount && currency.wallet.amount !== '0'
			);
		});

		const showDashboard = this.state.mobileDashboardPage === 'Dashboard';
		const showPortfolio = this.state.mobileDashboardPage === 'Portfolio';
		const showWallets = this.state.mobileDashboardPage === 'Wallets';
		const showAllCoins = this.state.mobileDashboardPage === 'All Coins';
		const showAddWallet = this.state.mobileDashboardPage === 'Add Wallet';
		const showSettings = this.state.mobileDashboardPage === 'Settings';
		const showSupport = this.state.mobileDashboardPage === 'Support Me';
		let showActionButton =
			this.state.mobileDashboardPage !== 'Settings' &&
			this.state.mobileDashboardPage !== 'All Coins' &&
			this.state.mobileDashboardPage !== 'Support Me';

		if (this.state.mobileDashboardPage === 'Portfolio') {
			if (portfolioExists.length > 0) {
				showActionButton = false;
			} else {
				showActionButton = true;
			}
		}
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
				{showSupport && <MobileSupport />}
				{showActionButton && (
					<MobileDashboardActionButton setPage={this.setPage} bottomOfPage={this.state.actionButtonStick} />
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
