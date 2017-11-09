import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database, auth } from '../../firebase';
import firebase from '../../firebase';
import { addLocalCurrency } from '../../actions/localCurrency';
import { addPrice, addCurrency, clearCurrency } from '../../actions/currencies';
import { clearLocalCurrency } from '../../actions/localCurrency';
import axios from 'axios';
import Loading from '../Loading/Loading';
import Landing from '../../components/Landing/Landing';
import Onboarding from '../../components/Onboarding/Onboarding';
import Dashboard from '../../components/Dashboard/Dashboard';
import MobileDashboard from '../MobileDashboard/MobileDashboard';
import MobileLanding from '../MobileLanding/MobileLanding';
import { addCurrentCurrency } from '../../actions/currentCurrency';
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
			allCurrencies: []
		};

		this.getCoinData = this.getCoinData.bind(this);
		this.initDashboard = this.initDashboard.bind(this);
		this.getCurrentCurrency = this.getCurrentCurrency.bind(this);
		this.addCurrenciesToState = this.addCurrenciesToState.bind(this);
		this.getFrequentCoinData = this.getFrequentCoinData.bind(this);
		this.getAllCoinData = this.getAllCoinData.bind(this);
	}
	componentDidMount() {
		this.props.clearLocalCurrencyFromState();

		this.props.currencies.forEach(currency => {
			this.getCoinData(currency.symbol);
		});

		const storageLocation = database.ref('users/' + this.props.currentUser.uid + '/currencies');

		storageLocation.on('value', snapshot => {
			if (this.interval) {
				clearInterval(this.interval);
				this.getFrequentCoinData();
			}
		});

		this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({ showLanding: false });
				this.initDashboard().then(() => {
					this.getFrequentCoinData();
					this.getAllCoinData();
				});
			} else {
				this.setState({ showLanding: true }, () => {
					this.setState({ showLoading: false });
				});
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
					} else {
						this.setState({ showOnboarding: true }, () => {
							this.setState({ showLoading: false });
						});
					}

					if (snapshot.hasChild('localCurrency')) {
						const localCurrency = snapshot.child('localCurrency').val();
						if (localCurrency === 'USD') {
							this.props.addLocalCurrencyToState({ currency: localCurrency, rate: null });
						} else {
							axios.get(`https://api.fixer.io/latest?base=USD`).then(response => {
								const rateComparedToUsd = response.data.rates[localCurrency];
								this.props.addLocalCurrencyToState({
									currency: localCurrency,
									rate: rateComparedToUsd
								});
							});
						}
						resolve();
					}
				});
			}
		});
	}

	getCurrentCurrency(symbol) {
		return new Promise((resolve, reject) => {
			axios
				.get(`https://coincap.io/page/${symbol}`)
				.then(response => {
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

	addCurrenciesToState() {
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
					addCurrenciesToState={this.addCurrenciesToState}
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
					addCurrenciesToState={this.addCurrenciesToState}
				/>
			);

			landing = <Landing data={this.props.coinData} />;
		}
		return (
			<div className="dashboard--wrapper">
				{this.state.showLoading && <Loading />}
				{this.state.showOnboarding && <Onboarding data={this.props.coinData} />}
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
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(isMobile(DashboardWrapper));
