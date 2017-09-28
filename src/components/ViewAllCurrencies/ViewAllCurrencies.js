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

		this.state = {
			allCurrencies: []
		};

		this.handleTrackCurrencyClick = this.handleTrackCurrencyClick.bind(this);
	}

	componentDidMount() {
		axios.get('http://coincap.io/front').then(response => {
			let newState = [];
			response.data.forEach((currency, index) => {
				let newObj = { ...currency };
				newObj.rank = index + 1;
				newState.push(newObj);
			});
			this.setState({ allCurrencies: newState });
		});

		// Mapstate to props auth, set authed user to that prop. Set a render condition on the header.
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
			if (currency) {
				storageLocation.child(currency.symbol).set(currency);
				this.props.addCurrencyToState({ payload: currency });
			} else {
				axios.get(`http://coincap.io/page/${coinSymbol}`).then(result => {
					currency = {
						id: result.data.id,
						symbol: result.data.id,
						name: result.data.display_name,
						img: coins
					};

					storageLocation.child(currency.symbol).set(currency);
					this.props.addCurrencyToState({ payload: currency });
				});
			}
		}
		// Check if User is authenticated. If the user is authenticated check whether or not the selected currency exist in coinData.js.
		// If it does, use that data. Otherwise, add a dummy image (or do this in reducer?) to the currency and add it to database
		// If user is not authenticated, check if the selected currency exists in coinData.js. If it does, push the data from coinData.js
		// to selectedCurrencies. If it does not, add the current data to selectedcurrencies
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
								{this.state.allCurrencies.map(currency => {
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
