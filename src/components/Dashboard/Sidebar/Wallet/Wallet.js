import React from 'react';
import { connect } from 'react-redux';
import WalletListItem from './WalletListItem/WalletListItem';
import './sidebarwallet.css';

const Wallet = props => (
	<div className="sidebar--wallet--container">
		<div className="sidebar--wallet">
			<h3>Wallets</h3>
			<ul className="sidebar--wallet--list">
				{props.currencies.map(currency => {
					if (currency.wallet && currency.wallet.wallet) {
						return (
							<WalletListItem
								name={currency.name}
								wallet={currency.wallet.wallet}
								img={currency.img}
								key={currency.id}
							/>
						);
					}
				})}
			</ul>
		</div>
	</div>
);

const mapStateToProps = state => ({
	currentUser: state.auth,
	currencies: state.selectedCurrencies
});

export default connect(mapStateToProps)(Wallet);
