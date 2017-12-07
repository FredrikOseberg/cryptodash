import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database, auth } from '../../firebase';
import firebase from '../../firebase';
import { addLocalCurrency } from '../../actions/localCurrency';
import { addPrice, addCurrency, clearCurrency } from '../../actions/currencies';
import { clearLocalCurrency } from '../../actions/localCurrency';
import axios from 'axios';
import { addTotalPortfolioValue } from '../../actions/portfolio';
import Loading from '../Loading/Loading';
import Landing from '../../components/Landing/Landing';
import Onboarding from '../../components/Onboarding/Onboarding';
import Dashboard from '../../components/Dashboard/Dashboard';
import MobileDashboard from '../MobileDashboard/MobileDashboard';
import MobileLanding from '../MobileLanding/MobileLanding';
import { addCurrentCurrency } from '../../actions/currentCurrency';
import { convertPriceToLocalCurrency } from '../../common/helpers';
import { isMobile } from '../HoC/IsMobile';
import map from 'lodash/map';

class DashboardWrapper extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showOnboarding: false,
			showDashboard: false,
			showLanding: false,
			showLoading: true,
			allCurrencies: [],
			globalData: {}
		};

		this.getCoinData = this.getCoinData.bind(this);
		this.initDashboard = this.initDashboard.bind(this);
		this.getCurrentCurrency = this.getCurrentCurrency.bind(this);
		this.addCurrenciesToState = this.addCurrenciesToState.bind(this);
		this.getFrequentCoinData = this.getFrequentCoinData.bind(this);
		this.getAllCoinData = this.getAllCoinData.bind(this);
		this.clearLocalCurrency = this.clearLocalCurrency.bind(this);
		this.addCurrencyPrice = this.addCurrencyPrice.bind(this);
		this.setIntervalToGetCoinData = this.setIntervalToGetCoinData.bind(this);
		this.setLocalCurrency = this.setLocalCurrency.bind(this);
		this.showLandingPage = this.showLandingPage.bind(this);
		this.getGlobalData = this.getGlobalData.bind(this);
		this.setTotalPortfolioValue = this.setTotalPortfolioValue.bind(this);
		this.getFrequentPortfolioValue = this.getFrequentPortfolioValue.bind(this);
		this.dataSetup = this.dataSetup.bind(this);
	}

	componentDidMount() {
		console.log('mounting dashboardwrapper');
		this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({ showLanding: false });
				this.initDashboard();
			} else {
				this.showLandingPage();
			}
		});
	}

	clearLocalCurrency() {
		return new Promise(resolve => {
			this.props.clearLocalCurrencyFromState();
			resolve();
		});
	}

	setTotalPortfolioValue() {
		let amount = 0;
		this.props.currencies.forEach(currency => {
			if (currency.wallet && currency.wallet.wallet && currency.wallet.amount) {
				amount += Number(currency.wallet.amount) * Number(currency.price);

				let portfolioValue = {
					totalVal: amount.toFixed(2)
				};

				this.props.addPortfolioValueToState(portfolioValue);
			}
		});
	}

	getFrequentPortfolioValue() {
		this.portfolioInterval = setInterval(() => {
			this.setTotalPortfolioValue();
		}, 5000);
	}

	getGlobalData() {
		axios.get('https://coincap.io/global').then(response => {
			let responseData = {
				altCapUSD: response.data.altCap,
				btcCapUSD: response.data.btcCap,
				btcPrice: response.data.btcPrice,
				btcCapLocal: convertPriceToLocalCurrency(response.data.btcCap),
				altCapLocal: convertPriceToLocalCurrency(response.data.altCap),
				btcPriceLocal: convertPriceToLocalCurrency(response.data.btcPrice),
				totalCap: response.data.totalCap,
				volumeAlt: response.data.volumeAlt,
				volumeBtc: response.data.volumeBtc,
				volumeTotal: response.data.volumeTotal,
				volumeAltLocal: convertPriceToLocalCurrency(response.data.volumeAlt),
				volumeBtcLocal: convertPriceToLocalCurrency(response.data.volumeBtc),
				volumeTotalLocal: convertPriceToLocalCurrency(response.data.volumeTotal)
			};

			this.setState({ globalData: responseData });
		});
	}

	showLandingPage() {
		this.setState({ showLanding: true }, () => {
			this.setState({ showLoading: false });
		});
	}

	setIntervalToGetCoinData() {
		const storageLocation = database.ref('users/' + this.props.currentUser.uid + '/currencies');

		storageLocation.on('value', snapshot => {
			if (this.interval) {
				clearInterval(this.interval);
				this.getFrequentCoinData();
			} else {
				this.getFrequentCoinData();
			}
		});
	}

	getAllCoinData() {
		axios.get('https://coincap.io/front').then(response => {
			let newState = [];
			response.data.forEach((currency, index) => {
				let newObj = { ...currency };
				newObj.rank = index + 1;
				newState.push(newObj);
			});
			this.setState({ allCurrencies: newState });
		});
	}

	componentWillUnmount() {
		clearInterval(this.interval);
		this.unsubscribe();
	}

	getFrequentCoinData() {
		this.props.currencies.forEach(currency => {
			this.getCoinData(currency.symbol);
		});
		this.interval = setInterval(() => {
			this.props.currencies.forEach(currency => {
				this.getCoinData(currency.symbol);
			});
		}, 10000);
	}

	dataSetup() {
		this.addCurrenciesToState()
			.then(this.addCurrencyPrice)
			.then(this.clearLocalCurrency)
			.then(this.setLocalCurrency)
			.then(this.setIntervalToGetCoinData)
			.then(this.getAllCoinData)
			.then(this.getGlobalData)
			.then(this.setTotalPortfolioValue)
			.then(this.getFrequentPortfolioValue)
			.then(this.getCurrentCurrency(this.props.currencies[0].symbol))
			.catch(err => console.log(err));
	}

	initDashboard() {
		return new Promise((resolve, reject) => {
			const storageLocation = database.ref('users/' + this.props.currentUser.uid);
			if (this.props.currentUser.status === 'SIGNED_IN') {
				storageLocation.on('value', snapshot => {
					if (snapshot.hasChild('completedOnboarding')) {
						this.setState({ showOnboarding: false });
						this.setState({ showDashboard: true }, () => {
							this.setState({ showLoading: false });
						});
						this.dataSetup();
						resolve();
					} else {
						this.setState({ showOnboarding: true }, () => {
							this.setState({ showLoading: false });
						});
						resolve();
					}
				});
			}
		});
	}

	setLocalCurrency() {
		console.log('running');
		return new Promise((resolve, reject) => {
			const storageLocation = database.ref('users/' + this.props.currentUser.uid);

			storageLocation.once('value', snapshot => {
				if (snapshot.hasChild('localCurrency')) {
					const localCurrency = snapshot.child('localCurrency').val();

					const localCurrencyIsUSD = localCurrency === 'USD';

					if (localCurrencyIsUSD) {
						this.props.addLocalCurrencyToState({ currency: localCurrency, rate: null });
						resolve();
					} else {
						axios.get(`https://api.fixer.io/latest?base=USD`).then(response => {
							const rateComparedToUsd = response.data.rates[localCurrency];
							this.props.addLocalCurrencyToState({
								currency: localCurrency,
								rate: rateComparedToUsd
							});
							resolve();
						});
					}
				}
			});
		});
	}

	getCurrentCurrency(symbol) {
		return new Promise((resolve, reject) => {
			if (typeof symbol === 'undefined') {
				const databaseRef = database.ref(`/users/${auth.currentUser.uid}/currencies`);

				databaseRef.on('value', snapshot => {
					const currencies = snapshot.val();
					const currencySymbol = Object.keys(currencies)[0];

					console.log(currencySymbol);

					symbol = currencySymbol;
				});
			}

			axios
				.get(`https://coincap.io/page/${symbol}`)
				.then(response => {
					console.log(response);
					const obj = {
						name: response.data.display_name,
						price: response.data.price,
						symbol: response.data.id,
						percentage: response.data.cap24hrChange,
						id: response.data._id
					};
					this.props.addCurrentCurrencyToState(obj);

					resolve();
				})
				.catch(error => {
					reject(error);
				});
		});
	}

	getCoinData(symbol) {
		axios.get(`https://coincap.io/page/${symbol}`).then(response => {
			this.props.addCurrencyPriceToState({
				price: response.data.price,
				percentage: response.data.cap24hrChange,
				symbol: response.data.id
			});
		});
	}

	addCurrencyPrice() {
		return new Promise(resolve => {
			this.props.currencies.forEach(currency => {
				this.getCoinData(currency.symbol);
			});
			resolve();
		});
	}

	addCurrenciesToState() {
		console.log('adding currencies');
		return new Promise(resolve => {
			this.props.clearCurrencyFromState();
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

	render() {
		let dashboard, landing;
		if (this.props.isMobile) {
			dashboard = (
				<MobileDashboard
					getCurrentCurrency={this.getCurrentCurrency}
					allCurrencies={this.state.allCurrencies}
					history={this.props.history}
				/>
			);

			landing = <MobileLanding />;
		} else {
			dashboard = (
				<Dashboard
					wallets={this.state.wallets}
					allCurrencies={this.state.allCurrencies}
					getCurrentCurrency={this.getCurrentCurrency}
					globalData={this.state.globalData}
				/>
			);

			landing = <Landing data={this.props.coinData} />;
		}
		return (
			<div className="dashboard--wrapper">
				{this.state.showLoading && <Loading />}
				{this.state.showOnboarding && (
					<Onboarding data={this.props.coinData} history={this.props.history} dataSetup={this.dataSetup} />
				)}
				{this.state.showDashboard && dashboard}
				{this.state.showLanding && landing}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth,
	localCurrency: state.localCurrency,
	currencies: state.selectedCurrencies
});

const mapDispatchToProps = dispatch => ({
	addLocalCurrencyToState(obj) {
		dispatch(addLocalCurrency(obj));
	},
	addCurrentCurrencyToState(obj) {
		dispatch(addCurrentCurrency(obj));
	},
	addCurrencyPriceToState(obj) {
		dispatch(addPrice(obj));
	},
	addCurrencyToState(obj) {
		dispatch(addCurrency(obj));
	},
	clearCurrencyFromState() {
		dispatch(clearCurrency());
	},
	clearLocalCurrencyFromState() {
		dispatch(clearLocalCurrency());
	},
	addPortfolioValueToState(obj) {
		dispatch(addTotalPortfolioValue(obj));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(isMobile(DashboardWrapper));
