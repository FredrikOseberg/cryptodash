import React, { Component } from 'react';
import { getCurrencies } from '../../../../api/api';
import axios from 'axios';
import { connect } from 'react-redux';
import { convertPriceToLocalCurrency } from '../../../../common/helpers';
import Spinner from '../../../Loading/Spinner/Spinner';
import './sidebarexchange.css';

class SidebarExchange extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currencySymbols: [],
			currencyInformation: []
		};

		this.getData = this.getData.bind(this);
		this.getPrice = this.getPrice.bind(this);
		this.setPeriodicDataFetching = this.setPeriodicDataFetching.bind(this);
	}

	componentDidMount() {
		let result = [];
		getCurrencies().then(response => {
			response.data.result.forEach(symbol => {
				result.push(symbol.toUpperCase());
			});
			this.setState({ currencySymbols: result }, () => {
				this.getData(this.state.currencySymbols).then(() => {
					this.setPeriodicDataFetching();
				});
			});
		});
	}

	setPeriodicDataFetching() {
		this.interval = setInterval(() => {
			this.getPrice();
		}, 5000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getPrice() {
		const newState = [...this.state.currencyInformation];
		this.state.currencySymbols.forEach(symbol => {
			axios.get(`https://www.coincap.io/page/${symbol}`).then(response => {
				newState.forEach(currency => {
					if (currency.symbol === response.data.id) {
						currency.price = convertPriceToLocalCurrency(response.data.price);
					}
				});

				this.setState({ currencyInformation: newState });
			});
		});
	}

	getData(result) {
		return new Promise(resolve => {
			result.forEach(symbol => {
				let newState = [];
				if (symbol === 'BCC') {
					symbol = 'BCH';
				}
				axios.get(`https://www.coincap.io/page/${symbol}`).then(response => {
					const currencyObj = {
						symbol: response.data.id,
						price: convertPriceToLocalCurrency(response.data.price_usd),
						name: response.data.display_name,
						percentage: response.data.cap24hrChange
					};

					newState = [...this.state.currencyInformation];
					newState.push(currencyObj);
					this.setState({ currencyInformation: newState }, () => {
						resolve();
					});
				});
			});
		});
	}

	render() {
		let markup;
		if (this.state.currencyInformation.length === 0) {
			markup = (
				<div className="sidebar--exchange--loading">
					<Spinner />
				</div>
			);
		} else {
			markup = this.state.currencyInformation.map(currency => {
				let percentageClasses;
				if (currency.percentage > 0) {
					percentageClasses = 'sidebar--exchange--items sidebar--exchange--percentage--positive';
				} else {
					percentageClasses = 'sidebar--exchange--items sidebar--exchange--percentage--negative';
				}
				return (
					<div className="sidebar--exchange--item" key={currency.symbol}>
						<h4 className="sidebar--exchange--items sidebar--exchange--header">
							{currency.name} <span className="sidebar--exchange--symbol">({currency.symbol})</span>
						</h4>
						<p className={percentageClasses}>{currency.percentage}%</p>
						<p className="sidebar--exchange--items sidebar--exchange--price">
							{currency.price}
							<span className="sidebar--exchange--price--postfix">
								{this.props.localCurrency.currency}
							</span>
						</p>
					</div>
				);
			});
		}

		return (
			<div className="sidebar--exchange">
				<h3>Currencies Available for Exchange through API</h3>
				<div className="sidebar--exchange--container">{markup}</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	localCurrency: state.localCurrency
});

export default connect(mapStateToProps)(SidebarExchange);
