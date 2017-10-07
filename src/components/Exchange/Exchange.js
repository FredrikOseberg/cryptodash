import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseExchange from './ChooseExchange/ChooseExchange';
import ConfirmAmounts from './ConfirmAmounts/ConfirmAmounts';
import './exchange.css';

class Exchange extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentStep: 'chooseExchange',
			transferFrom: '',
			transferTo: ''
		};

		this.handleTransferClick = this.handleTransferClick.bind(this);
	}

	handleTransferClick(transferFrom, transferTo) {
		this.setState({ transferFrom: transferFrom });
		this.setState({ transferTo: transferTo });
		this.setState({ currentStep: 'confirmAmounts' });
	}

	render() {
		const showChooseExchange = this.state.currentStep === 'chooseExchange';
		const showConfirmAmounts = this.state.currentStep === 'confirmAmounts';
		return (
			<div className="exchange">
				<div className="currency--wallet--header">
					<h3>Exchange Cryptocurrencies</h3>
				</div>
				<div className="exchange--content">
					{showChooseExchange && <ChooseExchange handler={this.handleTransferClick} />}
					{showConfirmAmounts && (
						<ConfirmAmounts transferFrom={this.state.transferFrom} transferTo={this.state.transferTo} />
					)}
				</div>
			</div>
		);
	}
}

export default Exchange;
