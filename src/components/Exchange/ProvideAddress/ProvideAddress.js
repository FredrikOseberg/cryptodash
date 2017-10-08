import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from '../../../firebase';
import { getAddress } from '../../../api/api';
import './provideaddress.css';

class ProvideAddress extends Component {
	constructor(props) {
		super(props);

		this.state = {
			existingAddress: '',
			addressInput: '',
			addressError: '',
			messageInput: '',
			showMessage: true,
			validAddress: false,
			validMessage: false
		};

		this.handleUseAddressClick = this.handleUseAddressClick.bind(this);
		this.handleUseNewAddressClick = this.handleUseNewAddressClick.bind(this);
		this.handleWalletInputChange = this.handleWalletInputChange.bind(this);
		this.handleWalletInputBlur = this.handleWalletInputBlur.bind(this);
		this.handleMessageInputChange = this.handleMessageInputChange.bind(this);
		this.checkAddress = this.checkAddress.bind(this);
		this.handleMessageCheckBoxClick = this.handleMessageCheckBoxClick.bind(this);
	}

	componentDidMount() {
		const storageLocation = database.ref('users/' + this.props.currentUser.uid + '/currencies');

		storageLocation.once('value', snapshot => {
			const currency = this.props.exchange.toCurrency.symbol.toUpperCase();
			if (snapshot.hasChild(currency)) {
				const value = snapshot
					.child(currency)
					.child('wallet')
					.child('wallet')
					.val();

				this.setState({ existingAddress: value });
			}
		});
	}

	handleUseAddressClick() {
		const address = this.state.existingAddress;

		this.setState({ addressInput: address }, () => {
			this.checkAddress();
			this.setState({ existingAddress: '' });
		});
	}

	handleUseNewAddressClick() {
		this.setState({ existingAddress: '' });
	}

	handleWalletInputChange(event) {
		this.setState({ addressInput: event.target.value }, () => {
			this.checkAddress();
		});
	}

	handleWalletInputBlur() {
		this.checkAddress();
	}

	checkAddress() {
		const address = this.state.addressInput;
		const fromCurrency = this.props.exchange.fromCurrency.symbol;
		const toCurrency = this.props.exchange.toCurrency.symbol;

		getAddress(fromCurrency, toCurrency, address).then(response => {
			console.log(response);
			if (response.data.hasOwnProperty('error')) {
				this.setState({ addressError: response.data.error.message });
				this.setState({ validAddress: false });
			} else {
				this.setState({ validAddress: true });
				this.setState({ addressError: '' });
			}
		});
	}

	handleMessageInputChange(event) {
		this.setState({ messageInput: event.target.value });
	}

	handleMessageCheckBoxClick() {
		this.setState({ showMessage: !this.state.showMessage }, () => {
			if (this.state.showMessage === false) {
				this.setState({ validMessage: true });
			}
		});
	}

	render() {
		let existingAddressMarkup,
			walletInputContainerClasses,
			walletInputClasses,
			walletErrorMarkup,
			messageInputClasses,
			checkboxClasses,
			nextButtonClasses;

		if (this.state.validAddress && this.state.validMessage) {
			nextButtonClasses = 'main-button exchange--address--button visible static opacity transition';
		} else {
			nextButtonClasses = 'main-button exchange--address--button';
		}

		if (this.state.addressError) {
			walletInputClasses = 'main--input main--input--error';
			walletErrorMarkup = <span className="main--input--error--message">{this.state.addressError}</span>;
		} else {
			walletInputClasses = 'main--input';
			walletErrorMarkup = '';
		}

		if (this.state.showMessage) {
			messageInputClasses =
				'exchange--provide--address--input--container exchange--provide--address--message visible static opacity transition';
			checkboxClasses = 'exchange--show--message--checkbox';
		} else {
			messageInputClasses = 'exchange--provide--address--input--container exchange--provide--address--message';
			checkboxClasses = 'exchange--show--message--checkbox exchange--show--message--checkbox--active';
		}

		const showExistingAddress = this.state.existingAddress;
		if (showExistingAddress) {
			existingAddressMarkup = (
				<div className="exchange--provide--address--existing">
					<p>
						You have a saved {this.props.exchange.toCurrency.name} address. Would you like to have your
						exchanged funds sent to this address?
					</p>
					<img
						src={this.props.exchange.toCurrency.img}
						name={this.props.exchange.toCurrency.name}
						className="exchange--provide--address--existing--image"
					/>
					<input
						className="main--input existing--address--input"
						disabled
						value={this.state.existingAddress}
					/>
					<div className="exchange--provide--address--existing--button--container">
						<div
							className="exchange--provide--address--existing--button--decline"
							onClick={this.handleUseNewAddressClick}
						>
							No, provide new address.
						</div>
						<div
							className="exchange--provide--address--existing--button--accept"
							onClick={this.handleUseAddressClick}
						>
							Yes, use this address.
						</div>
					</div>
				</div>
			);

			walletInputContainerClasses = 'exchange--provide--address--container';
		} else {
			walletInputContainerClasses = 'exchange--provide--address--container static visible opacity transition';
		}
		return (
			<div className="exchange--provide--address">
				<h3>Provide your wallet address</h3>
				<p>This is the address where the funds will be deposited after the exchange.</p>
				{existingAddressMarkup}
				<div className={walletInputContainerClasses}>
					<img
						src={this.props.exchange.toCurrency.img}
						name={this.props.exchange.toCurrency.name}
						className="exchange--provide--address--existing--image"
					/>
					<div className="exchange--provide--address--input--container">
						<label>{this.props.exchange.toCurrency.name} Wallet Address</label>
						<input
							className={walletInputClasses}
							value={this.state.addressInput}
							onChange={this.handleWalletInputChange}
							onBlur={this.handleWalletInputBlur}
						/>
						{walletErrorMarkup}
					</div>
					<div className={messageInputClasses}>
						<label>Message</label>
						<input
							className="main--input"
							value={this.state.messageInput}
							onChange={this.handleMessageInputChange}
						/>
					</div>
					<div className="exchange--show--message--container">
						<div className="exchange--show--message--checkbox--container">
							<div className={checkboxClasses} onClick={this.handleMessageCheckBoxClick}>
								<i className="fa fa-check" />
							</div>
						</div>
						<p className="exchange--show--message--text">
							By checking this checkbox, I acknowledge that I have checked that my wallet does not require
							a message in order to transfer funds to it.
						</p>
					</div>
					<div className={nextButtonClasses}>Next</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	exchange: state.exchange,
	currentUser: state.auth
});

export default connect(mapStateToProps)(ProvideAddress);
