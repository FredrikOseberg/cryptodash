import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import defaultImage from '../../../../img/coins.jpg';
import coinData from '../../../../coinData';
import { convertPriceToLocalCurrency } from '../../../../common/helpers';
import './exchangecurrencyinformation.css';

class ExchangeCurrencyInformation extends Component {
	constructor(props) {
		super(props);

		this.interval;

		this.state = {
			currencyInformation: ''
		};

		this.getCoinData = this.getCoinData.bind(this);
	}

	componentDidMount() {
		this.getCoinData();
		this.interval = setInterval(() => {
			this.getCoinData();
		}, 5000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getCoinData() {
		axios.get(`https://coincap.io/page/${this.props.symbol.toUpperCase()}`).then(response => {
			let obj = {
				name: response.data.display_name,
				price: convertPriceToLocalCurrency(response.data.price_usd),
				symbol: response.data.id,
				percentage: response.data.cap24hrChange,
				img: defaultImage
			};
			coinData.forEach(currency => {
				if (currency.symbol.toUpperCase() === response.data.id) {
					obj.img = currency.img;
				}
			});
			this.setState({ currencyInformation: obj });
		});
	}

	render() {
		let content;
		const currency = this.state.currencyInformation;
		return (
			<div className="exchange--currency--information">
				<img src={currency.img} alt={currency.name} className="exchange--currency--information--image" />
				<h4 className="exchange--currency--information--header">
					{currency.name} ({currency.symbol})
				</h4>
				<p className="exchange--currency--information--price">
					{currency.price}
					<span className="exchange--currency--information--price--postfix">
						{this.props.localCurrency.currency}
					</span>
				</p>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	localCurrency: state.localCurrency
});

export default connect(mapStateToProps)(ExchangeCurrencyInformation);
