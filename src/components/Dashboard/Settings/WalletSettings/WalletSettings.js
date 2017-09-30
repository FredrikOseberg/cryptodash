import React, { Component } from 'react';
import { connect } from 'react-redux';
import CurrencyWalletInput from './CurrencyWalletInput/CurrencyWalletInput';
import './walletsettings.css';

class WalletSettings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			edit: false,
			walletInfo: []
		};

		this.handleWalletInfoChange = this.handleWalletInfoChange.bind(this);
	}

	handleWalletInfoChange(currency) {
		this.setState({ edit: true });

		let currencyExistsInArray = false,
			arrayPosition;
		let newWalletInfo = [...this.state.walletInfo];

		this.state.walletInfo.forEach((cur, index) => {
			if (cur.name === currency.name) {
				currencyExistsInArray = true;
				arrayPosition = index;
			}
		});

		if (currencyExistsInArray) {
			newWalletInfo[arrayPosition] = currency;
		} else {
			newWalletInfo.push(currency);
		}

		this.setState({ walletInfo: newWalletInfo });
	}

	render() {
		let buttonMarkup;
		this.state.edit
			? (buttonMarkup = <button className="main-button currency--wallet--save--button">Save Changes</button>)
			: (buttonMarkup = '');
		return (
			<div className="dashboard--settings--wallets">
				<div className="currency--wallet--header">
					<h3>Current Wallets</h3>
				</div>
				<div className="currency--wallet--table--headers">
					<div className="currency--wallet--header--name">
						<p>Coin</p>
					</div>
					<div className="currency--wallet--header--amount">
						<p>Amount</p>
					</div>
					<div className="currency--wallet--header--address">
						<p>Address</p>
					</div>
					<div className="currency--wallet--header--delete">
						<p>Delete</p>
					</div>
				</div>
				<div className="currency--wallet--content">
					{this.props.currencies.map(currency => {
						if (currency.wallet) {
							return (
								<CurrencyWalletInput
									key={currency.id}
									img={currency.img}
									name={currency.name}
									wallet={currency.wallet.wallet}
									amount={currency.wallet.amount}
									handleWalletInfoChange={this.handleWalletInfoChange}
								/>
							);
						}
					})}
					<div className="currency--wallet--button--container">{buttonMarkup}</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currencies: state.selectedCurrencies
});

export default connect(mapStateToProps)(WalletSettings);
