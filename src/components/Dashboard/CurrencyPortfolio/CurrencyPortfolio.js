import React, { Component } from 'react';
import { connect } from 'react-redux';

class CurrencyPortfolio extends Component {
	constructor(props) {
		super(props);

		this.interval;

		this.state = {
			totalVal: 0
		};

		this.setTotalPortfolioPrice = this.setTotalPortfolioPrice.bind(this);
	}

	componentDidMount() {
		this.setTotalPortfolioPrice();
		this.interval = setInterval(() => {
			this.setTotalPortfolioPrice();
		}, 5000);
	}

	setTotalPortfolioPrice() {
		let amount = 0;
		this.props.currencies.forEach(currency => {
			if (currency.wallet && currency.wallet.wallet && currency.wallet.amount) {
				amount += Number(currency.wallet.amount) * Number(currency.price);
			}
		});

		this.setState({ totalVal: amount.toFixed(2) });
	}

	componentWillUnmount() {
		clearInterval(this.interval);
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
						if (
							currency.wallet &&
							currency.wallet.wallet &&
							currency.wallet.amount &&
							currency.wallet.amount !== '0'
						) {
							return (
								<li className="currency--portfolio--item" key={currency.id}>
									<img src={currency.img} alt={currency.name} />
									<p className="currency--portfolio--item--name">{currency.name}</p>
									<p className="currency--portfolio--item--amount">
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
						{this.state.totalVal}
						<span className="currency--total--value--postfix">{this.props.localCurrency.currency}</span>
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
