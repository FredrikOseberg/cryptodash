import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddWallet from '../../Dashboard/Settings/WalletSettings/AddWallet/AddWallet';
import './mobileaddwallet.css';

class MobileAddWallet extends Component {
	constructor(props) {
		super(props);

		this.validateAmountInput = this.validateAmountInput.bind(this);
	}

	validateAmountInput(input) {
		const inputToValidate = Number(input);

		if (typeof inputToValidate === 'number') {
			if (!Number.isNaN(inputToValidate)) {
				return true;
			}
		}
		return false;
	}

	render() {
		return (
			<div className="mobile--add--wallet">
				<AddWallet
					currencies={this.props.currencies}
					validateAmountInput={this.validateAmountInput}
					setDefaultState={this.props.setDefaultState}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currencies: state.selectedCurrencies,
	currentUser: state.auth
});

export default connect(mapStateToProps)(MobileAddWallet);
