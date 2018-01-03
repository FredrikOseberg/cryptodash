import React, { Component } from 'react';
import { connect } from 'react-redux';
import CurrencyTableData from './CurrencyTableData/CurrencyTableData';
import Spinner from '../Loading/Spinner/Spinner';
import axios from 'axios';
import localCurrencyData from '../../localCurrencyData';
import { database } from '../../firebase';
import firebase from '../../firebase';
import map from 'lodash/map';
import { isMobile } from '../HoC/IsMobile';
import {
	addLocalCurrency,
	clearLocalCurrency
} from '../../actions/localCurrency';
import { addCurrency, clearCurrency } from '../../actions/currencies';

import './viewallcurrencies.css';

class ViewAllCurrencies extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allCurrencies: this.props.allCurrencies,
			currentSet: [],
			fiat: 'USD',
			user: false,
			currentIndex: 0,
			inputValue: '',
			showDropdown: false,
			gettingData: true
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.setNewDataSet = this.setNewDataSet.bind(this);
		this.setDataFetchInterval = this.setDataFetchInterval.bind(this);
		this.handleDropdownClick = this.handleDropdownClick.bind(this);
		this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
		this.addCurrenciesToState = this.addCurrenciesToState.bind(this);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll, false);

		document.body.style.height = 'auto';

		this.setState({ currentIndex: 50 }, () => {
			if (
				this.props.allCurrencies &&
				this.props.allCurrencies.length > 0
			) {
				this.setNewDataSet(
					this.props.allCurrencies,
					this.state.currentIndex
				);
				this.setDataFetchInterval();
			} else {
				this.setDataFetchInterval();
			}
		});

		this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({ user: true });
				const storageLocation = database.ref(
					'users/' + this.props.currentUser.uid
				);
				this.addCurrenciesToState(user);
				storageLocation.once('value', snapshot => {
					if (snapshot.hasChild('localCurrency')) {
						const localCurrency = snapshot
							.child('localCurrency')
							.val();
						if (localCurrency === 'USD') {
							this.props.addLocalCurrencyToState({
								currency: localCurrency,
								rate: null
							});
						} else {
							axios
								.get(`https://api.fixer.io/latest?base=USD`)
								.then(response => {
									const rateComparedToUsd =
										response.data.rates[localCurrency];
									this.setState({ fiat: localCurrency });
									this.props.addLocalCurrencyToState({
										currency: localCurrency,
										rate: rateComparedToUsd
									});
								});
						}
					}
				});
			} else {
				this.setState({ user: false });
				this.setState({ fiat: 'USD' });
			}
		});
	}

	setDataFetchInterval() {
		this.interval = setInterval(() => {
			axios.get('https://coincap.io/front').then(response => {
				this.setNewDataSet(response.data);
			});
		}, 5000);
	}

	getNewData() {
		this.setState({ gettingData: true }, () => {
			let newIndex = this.state.currentIndex;
			newIndex += 50;
			this.setState({ currentIndex: newIndex }, () => {
				axios.get('https://coincap.io/front').then(response => {
					setTimeout(this.setNewDataSet(response.data), 2000);
				});
			});
		});
	}

	setNewDataSet(dataSet, currentIndex = this.state.currentIndex) {
		let newState = [];
		let currentSetState = [];
		dataSet.forEach((currency, index) => {
			let newObj = { ...currency };
			newObj.rank = index + 1;
			newState.push(newObj);
			if (index < this.state.currentIndex) {
				currentSetState.push(newObj);
			}
		});
		this.setState({ allCurrencies: newState });
		this.setState({ currentSet: currentSetState }, () => {
			this.setState({ currentIndex: currentIndex });
		});
		this.setState({ gettingData: false });
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll, false);
		clearInterval(this.interval);
		this.unsubscribe();
		if (this.props.currentUser.status !== 'SIGNED_IN') {
			this.props.clearLocalCurrencyFromState();
		}
		document.body.style.height = '100%';
	}

	handleDropdownClick() {
		this.setState({ showDropdown: !this.state.showDropdown });
	}

	addCurrenciesToState(user) {
		this.props.clearCurrencyFromState();
		const databaseRef = database.ref('users/' + user.uid + '/currencies');
		databaseRef.once('value', snapshot => {
			const currencies = snapshot.val();
			// Lodash Object Map
			map(currencies, currency => {
				this.props.addCurrencyToState({ payload: currency });
			});
		});
	}

	handleCurrencyChange(e) {
		let localCurrency = e.target.dataset.currency;
		this.setState({ fiat: localCurrency });

		axios.get(`https://api.fixer.io/latest?base=USD`).then(response => {
			const rateComparedToUsd = response.data.rates[localCurrency];
			this.props.addLocalCurrencyToState({
				currency: localCurrency,
				rate: rateComparedToUsd
			});
		});
	}

	handleScroll() {
		let bottom;
		if (this.props.isMobile || this.props.landing) {
			bottom =
				window.innerHeight + window.scrollY >=
				document.body.offsetHeight;
		} else {
			const sidebar = document.querySelector('.dashboard--sidebar ');

			bottom =
				sidebar.scrollTop ===
				sidebar.scrollHeight - sidebar.offsetHeight;
		}

		if (bottom && this.state.gettingData === false) {
			this.getNewData();
		}
	}

	handleInputChange(event) {
		this.setState({ inputValue: event.target.value });
	}

	render() {
		let frontendClasses,
			viewAllBoxClasses,
			chooseCurrencyMarkup,
			chooseCurrencyMenuClasses;

		if (this.state.showDropdown) {
			chooseCurrencyMenuClasses =
				'view--all--choose--dropdown--menu visible opacity';
		} else {
			chooseCurrencyMenuClasses = 'view--all--choose--dropdown--menu';
		}

		if (this.props.currentUser.status === 'SIGNED_IN') {
			frontendClasses = '';
			viewAllBoxClasses = 'view--all--box view--all--box--dashboard';
			chooseCurrencyMarkup = '';
		} else {
			frontendClasses = 'view--all--background';
			viewAllBoxClasses = 'view--all--box';
			chooseCurrencyMarkup = (
				<div className="view--all--choose--currency">
					<div className="view--all--choose-currency--header">
						<i className="fa fa-money" />
						<h2>Local Currency</h2>
					</div>

					<div
						className="view--all--choose--dropdown"
						onClick={this.handleDropdownClick}
					>
						<p>{this.state.fiat}</p>
						<div className="view--all--choose--dropdown--button">
							<i className="fa fa-chevron-down" />
						</div>{' '}
						<div className={chooseCurrencyMenuClasses}>
							<ul className="view--all--choose--dropdown--list">
								{localCurrencyData.map(currency => {
									return (
										<li
											data-currency={currency.ticker}
											key={currency.id}
											onClick={this.handleCurrencyChange}
										>
											{currency.name}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			);
		}

		let currencyTableData;
		if (this.state.inputValue && this.state.currentSet.length > 0) {
			currencyTableData = this.state.allCurrencies
				.filter(currency => {
					return (
						`${currency.long} ${currency.short}`
							.toUpperCase()
							.indexOf(this.state.inputValue.toUpperCase()) >= 0
					);
				})
				.map(currency => {
					return (
						<CurrencyTableData
							rank={currency.rank}
							short={currency.short}
							long={currency.long}
							mktcap={currency.mktcap}
							price={currency.price}
							vwapData={currency.vwapData}
							supply={currency.supply}
							usdVolume={currency.usdVolume}
							perc={currency.perc}
							key={currency.short}
							fiat={this.state.fiat}
							user={this.state.user}
						/>
					);
				});
		} else {
			currencyTableData = this.state.currentSet.map(currency => {
				return (
					<CurrencyTableData
						rank={currency.rank}
						short={currency.short}
						long={currency.long}
						mktcap={currency.mktcap}
						price={currency.price}
						vwapData={currency.vwapData}
						supply={currency.supply}
						usdVolume={currency.usdVolume}
						perc={currency.perc}
						key={currency.short}
						fiat={this.state.fiat}
						user={this.state.user}
					/>
				);
			});
		}

		let allCoinsMarkup, spinner;
		if (this.state.gettingData) {
			spinner = <Spinner />;
		} else {
			spinner = '';
		}

		allCoinsMarkup = (
			<div>
				<div className={viewAllBoxClasses}>
					<div className="view--all--header">
						<div className="view--all--header--search">
							<h2>
								<i
									className="fa fa-search"
									aria-hidden="true"
								/>
								Search for currencies
							</h2>
							<input
								className="main--input view--all--input"
								type="text"
								onChange={this.handleInputChange}
							/>
						</div>
						{chooseCurrencyMarkup}
					</div>
					<div className="view--all--table--headers">
						<div className="view--all--table--header--rank">
							Rank
						</div>
						<div className="view--all--table--header--name">
							Name
						</div>
						<div className="view--all--table--header--marketcap">
							Market Cap
						</div>
						<div className="view--all--table--header--price">
							Price
						</div>
						<div className="view--all--table--header--24hvwap">
							24hour VWAP
						</div>
						<div className="view--all--table--header--supply">
							Available Supply
						</div>
						<div className="view--all--table--header--volume">
							24 Hour Volume
						</div>
						<div className="view--all--table--header--percentage">
							%24hr
						</div>
						<div className="view--all--table--header--track">
							Track
						</div>
					</div>
				</div>
				{currencyTableData}
				{spinner}
			</div>
		);

		return (
			<div className={frontendClasses}>
				<div className="view--all">
					<h1>All Coins</h1>
					{allCoinsMarkup}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth,
	localCurrency: state.localCurrency
});

const mapDispatchToProps = dispatch => ({
	addLocalCurrencyToState(obj) {
		dispatch(addLocalCurrency(obj));
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

export default connect(mapStateToProps, mapDispatchToProps)(
	isMobile(ViewAllCurrencies)
);
