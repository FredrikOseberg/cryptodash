import React, { Component } from 'react';
import { database } from '../../firebase';
import { connect } from 'react-redux';
import { addCurrency } from '../../actions/currencies';
import coinData from '../../coinData';
import axios from 'axios';
import coins from '../../img/coins.jpg';
import './viewallcurrencies.css';

class ViewAllCurrencies extends Component {
	constructor(props) {
		super(props);

		this.interval;

		this.state = {
			allCurrencies: [],
			inputValue: ''
		};

		this.handleTrackCurrencyClick = this.handleTrackCurrencyClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			axios.get('http://coincap.io/front').then(response => {
				let newState = [];
				response.data.forEach((currency, index) => {
					let newObj = { ...currency };
					newObj.rank = index + 1;
					newState.push(newObj);
				});
				this.setState({ allCurrencies: newState });
			});
		}, 5000);

		console.log(this.props.user);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
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
			storageLocation.on('value', snapshot => {
				if (!snapshot.hasChild(coinSymbol)) {
					// If currency is found in local dataset, use that data.
					if (currency) {
						storageLocation.child(currency.symbol).set(currency);
						this.props.addCurrencyToState({ payload: currency });
						// Otherwise, dispatch AJAX request to get data and push it onto DB and selectedCurrencies state
					} else {
						this.getCoinData(coinSymbol).then(currency => {
							storageLocation.child(currency.symbol).set(currency);
							this.props.addCurrencyToState({ payload: currency });
						});
					}
				}
			});
		} else {
			// If user is not signed in, simply check if local data contains currency and push it to state.
			let currency = this.checkIfDataContainsCoin(coinSymbol);
			if (currency) {
				this.props.addCurrencyToState({ payload: currency });
			} else {
				// If data does not exist, get data and push to state
				this.getCoinData(coinSymbol).then(currency => {
					this.props.addCurrencyToState({ payload: currency });
				});
			}
		}
	}

	getCoinData(coinSymbol) {
		return new Promise((resolve, reject) => {
			axios.get(`http://coincap.io/page/${coinSymbol}`).then(result => {
				let currency = {
					id: result.data.id,
					symbol: result.data.id,
					name: result.data.display_name,
					img: coins
				};
				resolve(currency);
			});
		});
	}

	handleInputChange(event) {
		this.setState({ inputValue: event.target.value });
	}

	render() {
		let frontendClasses;
		let viewAllBoxClasses;
		if (this.props.currentUser.status === 'SIGNED_IN') {
			frontendClasses = '';
			viewAllBoxClasses = 'view--all--box view--all--box--dashboard';
		} else {
			frontendClasses = 'frontend--background';
			viewAllBoxClasses = 'view--all--box';
		}
		return (
			<div className={frontendClasses}>
				<div className="view--all">
					<div className={viewAllBoxClasses}>
						<div className="view--all--header">
							<h2>
								<i className="fa fa-search" aria-hidden="true" />
								Search for currencies
							</h2>
							<input
								className="main--input view--all--input"
								type="text"
								onChange={this.handleInputChange}
							/>
						</div>
						<table className="view--all--table">
							<thead>
								<tr>
									<th>Rank</th>
									<th>Name</th>
									<th>Market Cap</th>
									<th>Price</th>
									<th>24hour VWAP</th>
									<th>Available Supply</th>
									<th>24 Hour Volume</th>
									<th>%24hr</th>
									<th>Track</th>
								</tr>
							</thead>
							<tbody>
								{this.state.allCurrencies
									.filter(currency => {
										return (
											`${currency.long} ${currency.short}`
												.toUpperCase()
												.indexOf(this.state.inputValue.toUpperCase()) >= 0
										);
									})
									.map(currency => {
										return (
											<tr key={currency.short}>
												<td>{currency.rank}</td>
												<td className="view--all--name">
													{currency.long} {currency.short}
												</td>
												<td className="view--all--market">{currency.mktcap.toFixed(2)}</td>
												<td className="view--all--price">{currency.price.toFixed(2)}</td>
												<td>{currency.vwapData.toFixed(2)}</td>
												<td>{currency.supply.toFixed(2)}</td>
												<td>{currency.usdVolume.toFixed(2)}</td>
												<td className="view--all--percentage">{currency.perc}</td>
												<td>
													<div
														className="view--all--track"
														data-name={currency.short}
														onClick={this.handleTrackCurrencyClick}
													>
														<i
															className="fa fa-line-chart"
															aria-hidden="true"
															data-name={currency.short}
														/>
													</div>
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth
});

const mapDispatchToProps = dispatch => ({
	addCurrencyToState(obj) {
		dispatch(addCurrency(obj));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllCurrencies);
