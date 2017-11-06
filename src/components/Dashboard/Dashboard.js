import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import DashboardMainPage from './DashboardMainPage/DashboardMainPage';
import Exchange from '../Exchange/Exchange';
import Nav from '../Nav/Nav';
import Settings from './Settings/Settings';
import Footer from '../Footer/Footer';
import Wallet from './Sidebar/Wallet/Wallet';
import Sidebar from './Sidebar/Sidebar';

class Dashboard extends Component {
	// Get the users currencies from the database and save it to component state
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			showDashboard: false,
			showDashboardMainPage: false,
			showAllCurrencies: true,
			displaySidebar: false,
			currentCurrency: false,
			settingsPage: 'Personal Info',
			firstload: true,
			sidebarComponent: '',
			dashboardPage: 'Dashboard',
			dashboardPages: [
				{ name: 'Dashboard', icon: 'fa fa-tachometer' },
				{ name: 'Exchange', icon: 'fa fa-exchange' },
				{ name: 'Settings', icon: 'fa fa-cog' },
				{ name: 'Wallets', icon: 'fa fa-folder' }
			]
		};

		this.handleDashboardNavClick = this.handleDashboardNavClick.bind(this);
		this.showSidebar = this.showSidebar.bind(this);
		this.setSidebarComponent = this.setSidebarComponent.bind(this);
		this.handleAddWalletClick = this.handleAddWalletClick.bind(this);
	}
	componentDidMount() {
		if (this.state.firstload) {
			this.props.addCurrenciesToState().then(() => {
				if (this.props.currencies.length > 0) {
					this.props.getCurrentCurrency(this.props.currencies[0].symbol).then(() => {
						this.setState({ loading: false });
						this.setState({ showDashboard: true });
						this.setState({ currentCurrency: true });
					});

					this.interval = setInterval(() => {
						this.props.getCurrentCurrency(this.props.currentCurrency.symbol);
					}, 5000);
				} else {
					this.setState({ loading: false });
					this.setState({ showDashboard: true });
				}
				this.setState({ firstload: false });
			});
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	showSidebar() {
		this.setState({ displaySidebar: !this.state.displaySidebar }, () => {
			if (this.state.displaySidebar === false) {
				this.setState({ sidebarComponent: '' });
			}
		});
	}

	setSidebarComponent(component) {
		this.setState({ sidebarComponent: component });
	}

	handleAddWalletClick() {
		this.setState({ dashboardPage: 'Settings' });
		this.setState({ settingsPage: 'Wallets' });
		this.setState({ displaySidebar: false });
	}

	handleDashboardNavClick(event) {
		const li = event.currentTarget;
		switch (li.dataset.target) {
			case 'Dashboard':
				this.setState({ dashboardPage: 'Dashboard' });
				break;
			case 'Exchange':
				this.setState({ dashboardPage: 'Exchange' });
				break;
			case 'Settings':
				this.setState({ dashboardPage: 'Settings' });
				break;
			case 'Wallets':
				this.setState({ dashboardPage: 'Wallets' });
				break;
			default:
				this.setState({ dashboardPage: 'Dashboard' });
		}
	}

	render() {
		const showDashboard = this.state.dashboardPage === 'Dashboard' && this.state.currentCurrency === true;
		const showExchange = this.state.dashboardPage === 'Exchange';
		const showSettings = this.state.dashboardPage === 'Settings';
		const showWallets = this.state.dashboardPage === 'Wallets';

		const dashboard = (
			<div className="dashboard">
				<Header />
				<div className="dashboard--navigation">
					<div className="container dashboard--container">
						<Nav
							pages={this.state.dashboardPages}
							onClickHandler={this.handleDashboardNavClick}
							currentPage={this.state.dashboardPage}
						/>
					</div>
				</div>
				<div className="dashboard--content">
					<div className="container">
						<div className="dashboard--container">
							{showDashboard && (
								<DashboardMainPage
									getCurrentCurrency={this.props.getCurrentCurrency}
									handleAddWalletClick={this.handleAddWalletClick}
								/>
							)}
							{showSettings && <Settings startPage={this.state.settingsPage} />}
							{showExchange && <Exchange />}
							{showWallets && <Wallet handleAddWalletClick={this.handleAddWalletClick} />}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
		return (
			<div className="dashboard--outer--container">
				{this.state.loading && <Loading />}
				{this.state.showDashboard && dashboard}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currencies: state.selectedCurrencies,
	firstCurrency: state.selectedCurrencies[0],
	currentCurrency: state.currentCurrency,
	localCurrency: state.localCurrency
});

export default connect(mapStateToProps)(Dashboard);
