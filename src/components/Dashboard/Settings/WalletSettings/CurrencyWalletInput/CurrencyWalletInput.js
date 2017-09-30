import React, { Component } from 'react';
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
			address: this.state.addressInput
		};
		this.props.handleWalletInfoChange(obj);
	}

	handleAmountInputChange(event) {
		this.setState({ amountInput: event.target.value.toString().trim() }, () => {
			this.pushChangedObjectToParentState();
		});
	}

	render() {
		return (
			<div className="currency--wallet--current">
				<div className="currency--wallet--current--info currency--wallet--image">
					<img src={this.props.img} alt={this.props.name} />
					<h4>{this.props.name}</h4>
				</div>
				<div className="currency--wallet--current--info currency--wallet--amount">
					<input
						name={`${this.props.name}-amount`}
						className="main--input currency--wallet--settings--input"
						defaultValue={this.state.amountInput}
						onChange={this.handleAmountInputChange}
					/>
				</div>
				<div className="currency--wallet--current--info currency--wallet--address">
					{' '}
					<input
						name={`${this.props.name}-address`}
						className="main--input currency--wallet--settings--input"
						defaultValue={this.state.addressInput}
						onChange={this.handleAddressInputChange}
					/>
				</div>
				<div className="currency--wallet--current--info currency--wallet--delete">
					<i className="fa fa-trash" aria-hidden="true" />
				</div>
			</div>
		);
	}
}

export default CurrencyWalletInput;
