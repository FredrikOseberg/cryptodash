import React, { Component } from 'react';
import { connect } from 'react-redux';

class CurrencyPortfolio extends Component {
	constructor(props) {
		super(props);

		this.state = {
			totalVal: 0
		};
	}

	render() {
		let totalVal = 0;
		return (
			<div className="currency--portfolio">
				<div className="currency--portfolio--header">
					<h3>Your Portfolio</h3>
				</div>
				<ul className="currency--portfolio--list">
					{this.props.currencies.map(currency => {
						if (currency.wallet) {
							return (
								<li className="currency--portfolio--item" key={currency.id}>
									<img src={currency.img} alt={currency.name} />
									<p className="currency--portfolio--item--name">{currency.name}</p>
									<p>
										{currency.wallet.amount} {currency.symbol}
									</p>
									<p className="currency--portfolio--item--value">
										{(currency.wallet.amount * Number(currency.price)).toFixed(2)}
										<span className="currency--postfix">{this.props.localCurrency.currency}</span>
									</p>
								</li>
							);
						}
					})}
				</ul>
				<div className="currency--total--value">
					<h3>Total value</h3>
					<h2>
						{totalVal} {this.props.localCurrency.currency}
					</h2>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	localCurrency: state.localCurrency,
	currentUser: state.auth,
	currencies: state.selectedCurrencies
});

export default connect(mapStateToProps)(CurrencyPortfolio);
