import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAmountToCurrency, addWalletInfoToCurrency } from '../../../../actions/currencies';
import './onboardinginputfield.css';

class OnboardingInputField extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inputFieldCoinError: '',
			inputFieldCoinAmount: '',
			inputFieldCoinAddress: ''
		};

		this.handleInputFieldCoinChange = this.handleInputFieldCoinChange.bind(this);
		this.handleInputFieldAddressChange = this.handleInputFieldAddressChange.bind(this);
		this.validateCoinInput = this.validateCoinInput.bind(this);
	}

	validateCoinInput(input) {
		const inputToValidate = Number(input);

		if (typeof inputToValidate === 'number') {
			if (!Number.isNaN(inputToValidate)) {
				return true;
			}
		}
		return false;
	}

	handleInputFieldCoinChange(event) {
		const input = event.target.value;
		const validationPassed = this.validateCoinInput(input);
		if (validationPassed) {
			this.setState({ inputFieldCoinAmount: input.toString().trim() }, () => {
				let obj = {
					symbol: this.props.symbol,
					amount: this.state.inputFieldCoinAmount
				};
				this.props.addPersonalCurrencyAmountToState(obj);
			});
			this.setState({ inputFieldCoinError: '' });
		} else {
			this.setState({ inputFieldCoinError: 'Your input needs to be a number.' });
		}
	}

	handleInputFieldAddressChange(event) {
		this.setState({ inputFieldCoinAddress: event.target.value.toString().trim() }, () => {
			let obj = {
				symbol: this.props.symbol,
				wallet: this.state.inputFieldCoinAddress
			};
			this.props.addPersonalCurrencyWalletInfo(obj);
		});
	}

	render() {
		let coinErrMessage = this.state.inputFieldCoinError,
			coinInputClasses,
			coinInputErrMarkup;
		if (coinErrMessage) {
			coinInputClasses = 'main--input onboarding--wallet--input main--input--error input--coin';
			coinInputErrMarkup = <span className="main--input--error--message">{coinErrMessage}</span>;
		} else {
			coinInputClasses = 'main--input onboarding--wallet--input input--coin';
			coinInputErrMarkup = '';
		}
		return (
			<div>
				<div className="onboarding--coin--wallet--info">
					<div className="onboarding--coin--img">
						<p>{this.props.name}</p>
						<img src={this.props.img} alt={this.props.name} />
					</div>
					<input
						type="text"
						className={coinInputClasses}
						name={`${this.props.name}--amount`}
						onChange={this.handleInputFieldCoinChange}
					/>
					<input
						type="text"
						className="main--input onboarding--wallet--input input--address"
						name={`${this.props.name}--address`}
						onChange={this.handleInputFieldAddressChange}
					/>
				</div>
				<div className="onboarding--wallet--error--message--container">{coinInputErrMarkup}</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	addPersonalCurrencyAmountToState(obj) {
		dispatch(addAmountToCurrency(obj));
	},
	addPersonalCurrencyWalletInfo(obj) {
		dispatch(addWalletInfoToCurrency(obj));
	}
});

export default connect(null, mapDispatchToProps)(OnboardingInputField);
