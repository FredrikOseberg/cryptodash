import React, { Component } from 'react';
import { connect } from 'react-redux';

class CurrencyPortfolio extends Component {
	constructor(props) {
		super(props);

		this.state = {
			totalVal: []
		};
	}

	componentDidMount() {
		console.log(this.props.currencies);
		// const totalValue = [...this.state.totalVal];
		// this.props.currencies.map(currency => {
		// 	console.log(currency);
		// 	const currencyValue = (currency.amount * currency.price).toFixed(2);
		// 	console.log(currencyValue);
		// 	totalValue.push(currencyValue);
		// });
		// this.setState({ totalVal: totalValue });
	}

	render() {
		return (
			<div className="currency--portfolio">
				<div className="currency--portfolio--header">
					<h3>Your Portfolio</h3>
				</div>
				<ul className="currency--portfolio--list">
					{this.props.currencies.map(currency => {
						return (
							<li className="currency--portfolio--item" key={currency.id}>
								<img src={currency.img} alt={currency.name} />
								<p>{currency.name}</p>
								<p>
									{currency.amount} {currency.symbol}
								</p>
								<p className="currency--portfolio--item--value">
									{(currency.amount * currency.price).toFixed(2)} {this.props.localCurrency.currency}
								</p>
							</li>
						);
					})}
				</ul>
				<div className="currency--total--value">
					<h3>Total value</h3>
					<h2>4171 NOK</h2>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	localCurrency: state.localCurrency
});

export default connect(mapStateToProps)(CurrencyPortfolio);
