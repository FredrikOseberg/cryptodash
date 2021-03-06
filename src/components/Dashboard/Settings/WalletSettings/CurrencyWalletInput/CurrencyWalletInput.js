import React, { Component } from 'react';
import { database } from '../../../../../firebase';
import { connect } from 'react-redux';
import { portfolioEntry } from '../../../../../events/portfolioevents';
import { removeWalletInfoFromCurrency } from '../.././../../../actions/currencies';
import './currencywalletinput.css';

class CurrencyWalletInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			amountInput: this.props.amount,
			addressInput: this.props.wallet
		};

		this.handleAddressInputChange = this.handleAddressInputChange.bind(this);
		this.handleAmountInputChange = this.handleAmountInputChange.bind(this);
		this.pushChangedObjectToParentState = this.pushChangedObjectToParentState.bind(this);
		this.handleDeleteWallet = this.handleDeleteWallet.bind(this);
	}

	handleAddressInputChange(event) {
		this.setState({ addressInput: event.target.value.toString().trim() }, () => {
			this.pushChangedObjectToParentState();
		});
	}

	pushChangedObjectToParentState() {
		let obj = {
			name: this.props.name,
			amount: this.state.amountInput,
			address: this.state.addressInput,
			symbol: this.props.symbol,
			img: this.props.img
		};
		this.props.handleWalletInfoChange(obj);
	}

	handleDeleteWallet() {
		const storageLocation = database.ref(
			'users/' + this.props.currentUser.uid + '/currencies/' + this.props.symbol
		);
		storageLocation.once('value', snapshot => {
			if (snapshot.hasChild('wallet')) {
				const walletInfo = snapshot.child('wallet').val();

				portfolioEntry(walletInfo.amount, this.props.name, this.props.img, Date.now(), 'remove');

				storageLocation.child('wallet').remove();
				this.props.removeWalletInfoFromState({ symbol: this.props.symbol });
			}
		});
	}

	handleAmountInputChange(event) {
		const input = event.target.value;
		const validationPassed = this.props.validateAmountInput(input);

		if (validationPassed) {
			this.props.clearError();
			this.setState({ amountInputError: '' });
			this.setState({ amountInput: input.toString().trim() }, () => {
				this.pushChangedObjectToParentState();
			});
		} else {
			this.setState({ amountInputError: 'Input must be a number' });
			this.props.setError();
		}
	}

	render() {
		let amountInputError = this.state.amountInputError,
			amountInputClasses,
			amountInputErrMarkup;
		if (amountInputError) {
			amountInputClasses = 'main--input currency--wallet--settings--input main--input--error input--coin';
			amountInputErrMarkup = <span className="currency--wallet--error--message">{amountInputError}</span>;
		} else {
			amountInputClasses = 'main--input currency--wallet--settings--input';
			amountInputErrMarkup = '';
		}

		let amountLabel, addressLabel;
		if (this.props.isMobile) {
			amountLabel = <label className="currency--wallet--label">Amount</label>;
			addressLabel = <label className="currency--wallet--label">Wallet Address</label>;
		} else {
			amountLabel = '';
			addressLabel = '';
		}
		return (
			<div className="currency--wallet--current">
				<div className="currency--wallet--current--info currency--wallet--image">
					<img src={this.props.img} alt={this.props.name} />
					<h4>{this.props.name}</h4>
				</div>
				{amountLabel}

				<div className="currency--wallet--current--info currency--wallet--amount">
					<input
						name={`${this.props.name}-amount`}
						className={amountInputClasses}
						defaultValue={this.state.amountInput}
						onChange={this.handleAmountInputChange}
					/>
					{amountInputErrMarkup}
				</div>
				{addressLabel}
				<div className="currency--wallet--current--info currency--wallet--address">
					<input
						name={`${this.props.name}-address`}
						className="main--input currency--wallet--settings--input"
						defaultValue={this.state.addressInput}
						onChange={this.handleAddressInputChange}
					/>
				</div>
				<div className="currency--wallet--current--info currency--wallet--delete">
					<i className="fa fa-trash" aria-hidden="true" onClick={this.handleDeleteWallet} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth
});

const mapDispatchToProps = dispatch => ({
	removeWalletInfoFromState(obj) {
		dispatch(removeWalletInfoFromCurrency(obj));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyWalletInput);
