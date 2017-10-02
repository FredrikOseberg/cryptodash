import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from '../../../../firebase';
import { addAmountToCurrency, addWalletInfoToCurrency } from '../../../../actions/currencies';
import CurrencyWalletInput from './CurrencyWalletInput/CurrencyWalletInput';
import AddWallet from './AddWallet/AddWallet';
import './walletsettings.css';

class WalletSettings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			walletState: 'addWallet',
			walletInfo: [],
			submitError: '',
			submitSuccess: ''
		};

		this.handleWalletInfoChange = this.handleWalletInfoChange.bind(this);
		this.handleWalletSubmit = this.handleWalletSubmit.bind(this);
		this.handleAddWalletClick = this.handleAddWalletClick.bind(this);
	}

	handleWalletInfoChange(currency) {
		this.setState({ walletState: 'edit' });

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

	handleWalletSubmit() {
		let validationPassed = false;

		this.state.walletInfo.forEach(currency => {
			if (currency.amount && currency.address) {
				validationPassed = true;
			}
		});

		if (validationPassed) {
			this.state.walletInfo.forEach(currency => {
				let obj = {
					amount: currency.amount,
					wallet: currency.address,
					symbol: currency.symbol
				};
				this.props.addAmountInfoToState(obj);
				this.props.addWalletInfoToState(obj);
			});

			this.setState({ submitError: '' });
			this.setState({ walletState: 'defaultState' });
			this.state.walletInfo.forEach(currency => {
				const storageLocation = database.ref(
					'users/' + this.props.currentUser.uid + '/currencies/' + currency.symbol
				);
				storageLocation.child('wallet').set({
					amount: currency.amount,
					wallet: currency.address
				});
			});

			this.setState({ submitSuccess: 'Your information was updated successfully' }, () => {
				setTimeout(() => {
					this.setState({ submitSuccess: '' });
				}, 3000);
			});
		} else {
			this.setState({ submitError: 'Something went wrong. Did you fill out all the fields? ' });
		}
	}

	handleAddWalletClick() {
		this.setState({ walletState: 'addWallet' });
	}

	render() {
		const edit = this.state.walletState === 'edit';
		const defaultState = this.state.walletState === 'defaultState';
		const addWalletState = this.state.walletState === 'addWallet';

		const showDefaultWalletInterface = defaultState || edit;
		const showAddWalletInterface = addWalletState;

		let buttonClasses, errorMessage, successFlashMessage, addWalletButtonClasses;

		if (edit) {
			buttonClasses = 'main-button currency--wallet--save--button visible opacity static';
			addWalletButtonClasses = 'currency--wallet--add--currency';
		} else {
			buttonClasses = 'main-button currency--wallet--save--button';
			addWalletButtonClasses = 'currency--wallet--add--currency visible opacity static';
		}

		this.state.submitError
			? (errorMessage = (
					<span className="main--input--error--message currency--wallet--submit--error">
						{this.state.submitError}
					</span>
				))
			: (errorMessage = '');
		this.state.submitSuccess
			? (successFlashMessage = (
					<span className="currency--wallet--submit--success">{this.state.submitSuccess}</span>
				))
			: (successFlashMessage = '');

		const defaultWalletInterface = (
			<div>
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
									symbol={currency.symbol}
									wallet={currency.wallet.wallet}
									amount={currency.wallet.amount}
									handleWalletInfoChange={this.handleWalletInfoChange}
								/>
							);
						}
					})}
					<div className="currency--wallet--button--container">
						{errorMessage}
						{successFlashMessage}
						<button className={buttonClasses} onClick={this.handleWalletSubmit}>
							Save Changes
						</button>
						<div className={addWalletButtonClasses} onClick={this.handleAddWalletClick}>
							<i className="fa fa-plus" />
						</div>
					</div>
				</div>
			</div>
		);
		return (
			<div className="dashboard--settings--wallets">
				{showDefaultWalletInterface && defaultWalletInterface}
				{showAddWalletInterface && <AddWallet currencies={this.props.currencies} />}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currencies: state.selectedCurrencies,
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

export default connect(mapStateToProps, mapDispatchToProps)(WalletSettings);
