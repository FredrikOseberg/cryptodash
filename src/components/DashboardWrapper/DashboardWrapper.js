import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from '../../firebase';
import { addLocalCurrency } from '../../actions/localCurrency';
import { addPrice } from '../../actions/currencies';
import axios from 'axios';
import Loading from '../Loading/Loading';
import Landing from '../../components/Landing/Landing';
import Onboarding from '../../components/Onboarding/Onboarding';
import Dashboard from '../../components/Dashboard/Dashboard';

class DashboardWrapper extends Component {
	constructor(props) {
		super(props);

		this.interval;

		this.state = {
			showOnboarding: false,
			showDashboard: false,
			showLanding: false,
			showLoading: true,
			allCurrencies: []
		};

		this.getCoinData = this.getCoinData.bind(this);
		this.initDashboard = this.initDashboard.bind(this);
	}
	componentDidMount() {
		this.props.currencies.forEach(currency => {
			this.getCoinData(currency.symbol);
		});

		this.initDashboard().then(() => {
			this.props.currencies.forEach(currency => {
				this.getCoinData(currency.symbol);
				this.interval = setInterval(() => {
					this.getCoinData(currency.symbol);
				}, 10000);
			});
		});

		if (!this.props.currentUser.status) {
			this.setState({ showLanding: true });
			this.setState({ showLoading: false });
		} else if (this.props.currentUser.status === 'ANONYMOUS') {
			this.setState({ showLoading: false });
			this.setState({ showLanding: true });
		} else if (this.props.currentUser.status === 'SIGNED_IN') {
			this.setState({ showLanding: false });
			this.setState({ showLoading: false });
		}

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
	}

	initDashboard() {
		return new Promise((resolve, reject) => {
			const storageLocation = database.ref('users/' + this.props.currentUser.uid);
			if (this.props.currentUser.status === 'SIGNED_IN') {
				storageLocation.on('value', snapshot => {
					if (snapshot.hasChild('completedOnboarding')) {
						this.setState({ showOnboarding: false });
						this.setState({ showDashboard: true });
						this.setState({ showLoading: false });
					} else {
						this.setState({ showOnboarding: true });
						this.setState({ showLoading: false });
					}

					if (snapshot.hasChild('localCurrency')) {
						const localCurrency = snapshot.child('localCurrency').val();
						axios.get(`https://api.fixer.io/latest?base=USD`).then(response => {
							const rateComparedToUsd = response.data.rates[localCurrency];
							this.props.addLocalCurrencyToState({ currency: localCurrency, rate: rateComparedToUsd });
						});
						resolve();
					}
				});
			}
		});
	}

	getCoinData(symbol) {
		axios.get(`https://coincap.io/page/${symbol}`).then(response => {
			this.props.addCurrencyPriceToState({
				price: response.data.price_usd,
				percentage: response.data.cap24hrChange,
				symbol: response.data.id
			});
		});
	}

	render() {
		return (
			<div className="dashboard--wrapper">
				{this.state.showOnboarding && <Onboarding data={this.props.coinData} />}
				{this.state.showDashboard && (
					<Dashboard wallets={this.state.wallets} allCurrencies={this.state.allCurrencies} />
				)}
				{this.state.showLanding && <Landing data={this.props.coinData} />}
				{this.state.showLoading && <Loading />}
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
	addCurrencyPriceToState(obj) {
		dispatch(addPrice(obj));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardWrapper);
