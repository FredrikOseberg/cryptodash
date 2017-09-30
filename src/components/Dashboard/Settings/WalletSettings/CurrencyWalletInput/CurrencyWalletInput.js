import React, { Component } from 'react';
import './currencywalletinput.css';

class CurrencyWalletInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			edit: false,
			amountInput: this.props.amount,
			addressInput: this.props.wallet
		};

		this.handleAddressInputChange = this.handleAddressInputChange.bind(this);
		this.handleAmountInputChange = this.handleAmountInputChange.bind(this);
	}

	handleAddressInputChange(event) {
		this.setState({ edit: true });
		this.setState({ addressInput: event.target.value.toString().trim() });
	}

	handleAmountInputChange(event) {
		this.setState({ edit: true });
		this.setState({ amountInput: event.target.value.toString().trim() });
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
			</div>
		);
	}
}

export default CurrencyWalletInput;
