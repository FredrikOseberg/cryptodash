import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from '../../../../../firebase';
import { isMobile } from '../../../../HoC/IsMobile';
import { addAmountToCurrency, addWalletInfoToCurrency } from '../../../../../actions/currencies';

import './addwallet.css';

class AddWallet extends Component {
	constructor(props) {
		super(props);

		this.state = {
			step: 'chooseCurrency',
			selected: '',
			amountInput: '',
			addressInput: '',
			amountError: '',
			addressErorr: ''
		};

		this.handleCurrencyClick = this.handleCurrencyClick.bind(this);

		this.handleAmountInputChange = this.handleAmountInputChange.bind(this);
		this.handleAddressInputChange = this.handleAddressInputChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleCurrencyClick(event) {
		const currencySymbol = event.currentTarget.dataset.name;

		this.setState({ selected: currencySymbol });
		this.setState({ step: 'showAddWalletForm' });
	}

	handleAmountInputChange(event) {
		const input = event.target.value;
		const validationPassed = this.props.validateAmountInput(input);

		if (validationPassed) {
			this.setState({ amountError: '' });
			this.setState({ amountInput: input.toString().trim() });
		} else {
			this.setState({ amountError: 'Amount needs to be a number' });
		}
	}

	handleAddressInputChange(event) {
		this.setState({ addressInput: event.target.value.toString().trim() });
	}

	handleFormSubmit() {
		const storageLocation = database.ref(
			'users/' + this.props.currentUser.uid + '/currencies/' + this.state.selected
		);

		let obj = {
			wallet: this.state.addressInput,
			amount: this.state.amountInput,
			symbol: this.state.selected
		};

		storageLocation.child('wallet').set({
			wallet: obj.wallet,
			amount: obj.amount
		});

		this.props.addWalletInfoToState(obj);
		this.props.addAmountInfoToState(obj);

		this.props.setDefaultState();
	}

	render() {
		const availableWallets = this.props.currencies.filter(currency => {
			return (currency.wallet && !currency.wallet.amount && !currency.wallet.wallet) || currency.wallet === null;
		});
		const showSelectCurrency = this.state.step === 'chooseCurrency';
		const selectCurrencyMarkup = (
			<div className="currency--add--wallet--select--currency--container">
				<h3>Pick a currency</h3>
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
								key={currency.id}
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
		);

		let submitButtonClasses;
		if (this.state.amountInput && this.state.addressInput) {
			submitButtonClasses = 'main-button add--wallet--button visible opacity static mobile--settings--button';
		} else {
			submitButtonClasses = 'main-button add--wallet--button';
		}

		const showAddWalletForm = this.state.step === 'showAddWalletForm';

		let amountInputClasses, amountErrorMarkup;
		if (this.state.amountError) {
			amountInputClasses = 'main--input add--wallet--amount main--input--error';
			amountErrorMarkup = <span className="main--input--error--message">{this.state.amountError}</span>;
		} else {
			amountInputClasses = 'main--input add--wallet--amount';
			amountErrorMarkup = '';
		}
		const formMarkup = (
			<div className="add--wallet--form">
				<h3>Add wallet information for {this.state.selected}</h3>
				<form>
					<div className="add--wallet--form--input--container add--wallet--amount--input--container">
						<label>Amount</label>
						<input type="text" className={amountInputClasses} onChange={this.handleAmountInputChange} />
						{amountErrorMarkup}
					</div>
					<div className="add--wallet--form--input--container add--wallet--address--input--container">
						<label>Wallet Address</label>
						<input
							type="text"
							className="main--input add--wallet--address"
							onChange={this.handleAddressInputChange}
						/>
					</div>
				</form>
				<div className={submitButtonClasses} onClick={this.handleFormSubmit}>
					{this.props.isMobile ? <i className="fa fa-save" aria-hidden="true" /> : 'Add Wallet'}
				</div>
			</div>
		);
		return (
			<div>
				<div className="currency--wallet--header">
					<h3>Add Wallet</h3>
				</div>
				<div className="currency--add--wallet--content">
					{showSelectCurrency && selectCurrencyMarkup}

					<div className="currency--add--wallet--currency--container">{showAddWalletForm && formMarkup}</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth
});

const mapDispatchToProps = dispatch => ({
	addWalletInfoToState(obj) {
		dispatch(addWalletInfoToCurrency(obj));
	},
	addAmountInfoToState(obj) {
		dispatch(addAmountToCurrency(obj));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(isMobile(AddWallet));
