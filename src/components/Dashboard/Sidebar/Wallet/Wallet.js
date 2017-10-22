import React from 'react';
import { connect } from 'react-redux';
import WalletListItem from './WalletListItem/WalletListItem';
import './sidebarwallet.css';

const Wallet = props => {
	let currenciesThatHaveWallet = props.currencies.filter(currency => {
		return currency.wallet && currency.wallet.wallet;
	});

	let walletMarkup;

	if (currenciesThatHaveWallet.length > 0) {
		walletMarkup = (
			<div className="sidebar--wallet--inner--container">
				<h3 className="sidebar--wallet--header">Wallets</h3>
				<ul className="sidebar--wallet--list">
					{currenciesThatHaveWallet.map(currency => {
						return (
							<WalletListItem
								name={currency.name}
								wallet={currency.wallet.wallet}
								img={currency.img}
								key={currency.id}
							/>
						);
					})}
				</ul>
			</div>
		);
	} else {
		walletMarkup = (
			<div className="sidebar--wallet--inner--container">
				<h3 className="sidebar--wallet--placeholder">
					You have no wallet information to display. Add one to easily access your addresses.
				</h3>
				<div className="currency--portfolio--add--button" onClick={props.handleAddWalletClick}>
					<i className="fa fa-plus" aria-hidden="true" />
				</div>
			</div>
		);
	}
	return (
		<div className="sidebar--wallet--container">
			<div className="sidebar--wallet">{walletMarkup}</div>
		</div>
	);
};

const mapStateToProps = state => ({
	currentUser: state.auth,
	currencies: state.selectedCurrencies
});

export default connect(mapStateToProps)(Wallet);
