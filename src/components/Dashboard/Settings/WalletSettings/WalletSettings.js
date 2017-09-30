import React, { Component } from 'react';
import { connect } from 'react-redux';
import CurrencyWalletInput from './CurrencyWalletInput/CurrencyWalletInput';
import './walletsettings.css';

class WalletSettings extends Component {
	constructor(props) {
		super(props);
	}

	render() {
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
								/>
							);
						}
					})}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currencies: state.selectedCurrencies
});

export default connect(mapStateToProps)(WalletSettings);
