import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { database, auth } from '../../firebase';
import { addCurrency, clearCurrency } from '../../actions/currencies';
import { addCurrentCurrency } from '../../actions/currentCurrency';
import CurrencyStatCard from './CurrencyStatCard/CurrencyStatCard';
import CurrencyPortfolio from './CurrencyPortfolio/CurrencyPortfolio';
import Header from '../Header/Header';
import LineChart from './LineChart/LineChart';
import Loading from '../Loading/Loading';
import DashboardMainPage from './DashboardMainPage/DashboardMainPage';
import Exchange from '../Exchange/Exchange';
import Nav from '../Nav/Nav';
import Settings from './Settings/Settings';
import DashboardActionButton from '../DashboardActionButton/DashboardActionButton';
import Sidebar from './Sidebar/Sidebar';
import map from 'lodash/map';

class Dashboard extends Component {
	// Get the users currencies from the database and save it to component state
	constructor(props) {
		super(props);

		this.interval;

		this.state = {
			loading: true,
			showDashboard: false,
			showDashboardMainPage: false,
			showAllCurrencies: true,
			displaySidebar: false,
			currentCurrency: false,
			firstload: true,
			sidebarComponent: '',
			dashboardPage: 'Dashboard',
			dashboardPages: [
				{ name: 'Dashboard', icon: 'fa fa-tachometer' },
				{ name: 'Exchange', icon: 'fa fa-exchange' },
				{ name: 'Settings', icon: 'fa fa-cog' }
			]
		};

		this.addCurrenciesToState = this.addCurrenciesToState.bind(this);
		this.getCurrentCurrency = this.getCurrentCurrency.bind(this);
		this.handleDashboardNavClick = this.handleDashboardNavClick.bind(this);
		this.showSidebar = this.showSidebar.bind(this);
		this.setSidebarComponent = this.setSidebarComponent.bind(this);
	}
	componentDidMount() {
		if (this.state.firstload) {
			this.props.clearCurrencyFromState();
			this.addCurrenciesToState().then(() => {
				if (this.props.currencies.length > 0) {
					this.getCurrentCurrency(this.props.currencies[0].symbol);
					this.interval = setInterval(() => {
						this.getCurrentCurrency(this.props.currentCurrency.symbol);
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

	getCurrentCurrency(symbol) {
		axios.get(`https://coincap.io/page/${symbol}`).then(response => {
			this.setState({ loading: false });
			this.setState({ showDashboard: true });
			const obj = {
				name: response.data.display_name,
				price: response.data.price_usd,
				symbol: response.data.id,
				percentage: response.data.cap24hrChange,
				id: response.data._id
			};
			this.props.addCurrentCurrencyToState(obj);
			this.setState({ currentCurrency: true });
		});
	}

	addCurrenciesToState() {
		return new Promise(resolve => {
			const user = auth.currentUser;
			const databaseRef = database.ref('users/' + user.uid + '/currencies');
			databaseRef.once('value', snapshot => {
				const currencies = snapshot.val();
				// Lodash Object Map
				map(currencies, currency => {
					this.props.addCurrencyToState({ payload: currency });
				});
				resolve();
			});
		});
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
			default:
				this.setState({ dashboardPage: 'Dashboard' });
		}
	}

	render() {
		const showDashboard = this.state.dashboardPage === 'Dashboard' && this.state.currentCurrency === true;
		const showExchange = this.state.dashboardPage === 'Exchange';
		const showSettings = this.state.dashboardPage === 'Settings';

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
							{showDashboard && <DashboardMainPage getCurrentCurrency={this.getCurrentCurrency} />}
							{showSettings && <Settings />}
							{showExchange && <Exchange />}
							<DashboardActionButton
								showSidebar={this.showSidebar}
								setSidebarComponent={this.setSidebarComponent}
							/>
							<Sidebar
								show={this.state.displaySidebar}
								showSidebar={this.showSidebar}
								component={this.state.sidebarComponent}
								allCurrencies={this.props.allCurrencies}
							/>
						</div>
					</div>
				</div>
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

const mapDispatchToProps = dispatch => ({
	addCurrencyToState(obj) {
		dispatch(addCurrency(obj));
	},
	addCurrentCurrencyToState(obj) {
		dispatch(addCurrentCurrency(obj));
	},
	clearCurrencyFromState() {
		dispatch(clearCurrency());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
