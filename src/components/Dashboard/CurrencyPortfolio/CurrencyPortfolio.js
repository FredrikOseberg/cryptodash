import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../Loading/Spinner/Spinner';

class CurrencyPortfolio extends Component {
	constructor(props) {
		super(props);

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
		let portfolioMarkup;

		let portfolioPieces = this.props.currencies.filter(currency => {
			return (
				currency.wallet && currency.wallet.wallet && currency.wallet.amount && currency.wallet.amount !== '0'
			);
		});

		let totalValueMarkup;
		if (this.state.totalVal && this.state.totalVal !== 'NaN') {
			totalValueMarkup = (
				<h2>
					{this.state.totalVal}
					<span className="currency--total--value--postfix">{this.props.localCurrency.currency}</span>
				</h2>
			);
		} else {
			totalValueMarkup = '';
		}

		if (portfolioPieces.length > 0) {
			portfolioMarkup = (
				<div>
					<div className="currency--portfolio--header">
						<h3>Your Portfolio</h3>
					</div>
					<ul className="currency--portfolio--list">
						{portfolioPieces.map(currency => {
							let priceMarkup;
							if (currency.price && currency.price !== 'NaN') {
								priceMarkup = (
									<p className="currency--portfolio--item--value">
										{(currency.wallet.amount * Number(currency.price)).toFixed(2)}
										<span className="currency--postfix">{this.props.localCurrency.currency}</span>
									</p>
								);
							} else {
								priceMarkup = '';
							}
							return (
								<li className="currency--portfolio--item" key={currency.id}>
									<img src={currency.img} alt={currency.name} />
									<p className="currency--portfolio--item--name">{currency.name}</p>
									<p className="currency--portfolio--item--amount">
										{currency.wallet.amount} {currency.symbol}
									</p>
									{priceMarkup}
								</li>
							);
						})}
					</ul>
					<div className="currency--total--value">
						<h3>Total value</h3>
						{totalValueMarkup}
					</div>
				</div>
			);
		} else {
			portfolioMarkup = (
				<div>
					<h3 className="currency--portfolio--placeholder">
						You have no portfolio. Add a wallet to calculate your total holdings.
					</h3>
					<div className="currency--portfolio--add--button" onClick={this.props.handleAddWalletClick}>
						<i className="fa fa-plus" aria-hidden="true" />
					</div>
				</div>
			);
		}

		return <div className="currency--portfolio">{portfolioMarkup}</div>;
	}
}

const mapStateToProps = state => ({
	localCurrency: state.localCurrency,
	currentUser: state.auth,
	currencies: state.selectedCurrencies
});

export default connect(mapStateToProps)(CurrencyPortfolio);
