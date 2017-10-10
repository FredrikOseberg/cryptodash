import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import coinData from '../../../coinData';
import { database } from '../../../firebase';
import { addCurrency, removeCurrency, clearCurrency, addPrice } from '../../../actions/currencies';
import coins from '../../../img/coins.jpg';
import { convertPriceToLocalCurrency } from '../../../common/helpers';
import './currencytabledata.css';

class CurrencyTableData extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tracked: false
		};

		this.handleTrackCurrencyClick = this.handleTrackCurrencyClick.bind(this);
		this.handleCurrencyUntrackClick = this.handleCurrencyUntrackClick.bind(this);
		this.formatNumber = this.formatNumber.bind(this);
	}

	componentDidMount() {
		this.props.currencies.forEach(cur => {
			if (cur.symbol === this.props.short) {
				this.setState({ tracked: true });
			}
		});
	}

	formatNumber(number) {
		const formattedNumber = Number(convertPriceToLocalCurrency(number)).toLocaleString(
			`en-${this.props.localCurrency.currency}`
		);
		return formattedNumber;
	}

	checkIfDataContainsCoin(symbol) {
		let coin;
		coinData.forEach(currency => {
			if (currency.symbol === symbol) {
				coin = currency;
			}
		});
		if (coin) {
			return coin;
		} else return false;
	}

	handleTrackCurrencyClick(event) {
		const user = this.props.currentUser;
		const coinSymbol = event.target.dataset.name;

		if (user.status === 'SIGNED_IN') {
			const storageLocation = database.ref('users/' + user.uid + '/currencies');
			let currency = this.checkIfDataContainsCoin(coinSymbol);
			// Check if currency exists in db
			storageLocation.once('value', snapshot => {
				if (!snapshot.hasChild(coinSymbol)) {
					// If currency is found in local dataset, use that data.
					if (currency) {
						storageLocation.child(currency.symbol).set(currency);
						this.props.addCurrencyToState({ payload: currency });

						this.setState({ tracked: true });
						// Otherwise, dispatch AJAX request to get data and push it onto DB and selectedCurrencies state
					} else {
						this.getCoinData(coinSymbol).then(currency => {
							storageLocation.child(currency.symbol).set(currency);
							this.props.addCurrencyToState({ payload: currency });
							this.props.addPriceToState({ payload: currency.price });

							this.setState({ tracked: true });
						});
					}
				}
			});
		} else {
			// If user is not signed in, simply check if local data contains currency and push it to state.
			let currency = this.checkIfDataContainsCoin(coinSymbol);
			if (currency) {
				this.props.addCurrencyToState({ payload: currency });
				this.setState({ tracked: true });
			} else {
				// If data does not exist, get data and push to state
				this.getCoinData(coinSymbol).then(currency => {
					this.props.addCurrencyToState({ payload: currency });
					this.setState({ tracked: true });
				});
			}
		}
	}

	handleCurrencyUntrackClick(event) {
		const user = this.props.currentUser;
		const coinSymbol = event.target.dataset.name;
		let index;

		this.props.currencies.forEach((currency, ind) => {
			if (currency.symbol === coinSymbol) {
				index = ind;
			}
		});

		if (user.status === 'SIGNED_IN') {
			const storageLocation = database.ref('users/' + user.uid + '/currencies');
			storageLocation.once('value', snapshot => {
				if (snapshot.hasChild(coinSymbol)) {
					storageLocation.child(coinSymbol).remove();
					this.props.removeCurrencyFromState(index);
					this.setState({ tracked: false });
				}
			});
		} else {
			this.props.removeCurrencyFromState(index);
			this.setState({ tracked: false });
		}
	}

	getCoinData(coinSymbol) {
		// Get a specific coins data returns a promise that resolves with the currency data
		return new Promise((resolve, reject) => {
			axios.get(`http://coincap.io/page/${coinSymbol}`).then(result => {
				let currency = {
					id: result.data.id,
					symbol: result.data.id,
					name: result.data.display_name,
					img: coins,
					price: result.data.price
				};
				resolve(currency);
			});
		});
	}

	render() {
		let percentageClasses;
		if (this.props.perc > 0) {
			percentageClasses = 'currency--table--card--percentage currency--table--card--percentage--positive';
		} else {
			percentageClasses = 'currency--table--card--percentage currency--table--card--percentage--negative';
		}

		let track;
		if (this.state.tracked) {
			track = (
				<div
					className="view--all--tracked"
					data-name={this.props.short}
					onClick={this.handleCurrencyUntrackClick}
				>
					<i className="fa fa-check" aria-hidden="true" data-name={this.props.short} />
				</div>
			);
		} else {
			track = (
				<div className="view--all--track" data-name={this.props.short} onClick={this.handleTrackCurrencyClick}>
					<i className="fa fa-line-chart" aria-hidden="true" data-name={this.props.short} />
				</div>
			);
		}

		return (
			<div key={this.props.short} className="currency--table--card">
				<div className="currency--table--card--rank">{this.props.rank}</div>
				<div className="view--all--name">
					{this.props.long} {this.props.short}
				</div>
				<div className="currency--table--card--marketcap">
					{this.formatNumber(this.props.mktcap)}
					<span className="price--postfix">{this.props.localCurrency.currency}</span>
				</div>
				<div className="currency--table--card--price">
					{convertPriceToLocalCurrency(this.props.price)}{' '}
					<span className="price--postfix">{this.props.localCurrency.currency}</span>
				</div>
				<div className="currency--table--card--vwap">{this.props.vwapData.toFixed(0)}</div>
				<div className="currency--table--card--supply">{this.props.supply.toFixed(0)}</div>
				<div className="currency--table--card--usdVolume">
					{this.formatNumber(this.props.usdVolume)}
					<span className="price--postfix">{this.props.localCurrency.currency}</span>
				</div>
				<div className={percentageClasses}>{this.props.perc}%</div>
				<div className="currency--table--card--track">{track}</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth,
	currencies: state.selectedCurrencies,
	localCurrency: state.localCurrency
});

const mapDispatchToProps = dispatch => ({
	addCurrencyToState(obj) {
		dispatch(addCurrency(obj));
	},
	removeCurrencyFromState(obj) {
		dispatch(removeCurrency(obj));
	},
	clearCurrencyFromState() {
		dispatch(clearCurrency());
	},
	addPriceToState(obj) {
		dispatch(addPrice(obj));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyTableData);
