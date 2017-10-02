import React, { Component } from 'react';
import './addwallet.css';

class AddWallet extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: ''
		};

		this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
	}

	handleCurrencyClick(event) {
		const currencySymbol = event.currentTarget.dataset.name;

		this.setState({ selected: currencySymbol });
	}

	render() {
		console.log(this.props.currencies);
		const availableWallets = this.props.currencies.filter(currency => {
			return !currency.wallet;
		});
		return (
			<div>
				<div className="currency--wallet--header">
					<h3>Add Wallet</h3>
				</div>
				<div className="currency--add--wallet--content">
					<h4>Pick a currency</h4>
					<div className="currency--add--wallet--currency--container">
						{availableWallets.map(currency => {
							let currencyClasses;
							if (currency.symbol === this.state.selected) {
								currencyClasses =
									'currency--add--wallet--currency--selected currency--add--wallet--currency';
							} else {
								currencyClasses = 'currency--add--wallet--currency';
							}
							return (
								<div
									className={currencyClasses}
									data-name={currency.symbol}
									onClick={this.handleCurrencyClick}
								>
									<img src={currency.img} alt={currency.name} />
									<h3>
										{currency.name} ({currency.symbol})
									</h3>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default AddWallet;
