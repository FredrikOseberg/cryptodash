import React, { Component } from 'react';
import { connect } from 'react-redux';
import WalletListItem from './WalletListItem/WalletListItem';
import './sidebarwallet.css';

class Wallet extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currencies: []
		};
	}

	componentDidMount() {
		let newState = [];

		this.props.currencies.forEach(currency => {
			if (currency.wallet) {
				newState.push(currency);
			}
		});

		this.setState({ currencies: newState });
	}

	render() {
		return (
			<div className="sidebar--wallet">
				<h3>Wallets</h3>
				<ul className="sidebar--wallet--list">
					{this.state.currencies.map(currency => {
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
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth,
	currencies: state.selectedCurrencies
});

export default connect(mapStateToProps)(Wallet);
