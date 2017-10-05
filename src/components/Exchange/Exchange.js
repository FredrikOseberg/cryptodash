import React, { Component } from 'react';
import ChooseExchange from './ChooseExchange/ChooseExchange';
import './exchange.css';

class Exchange extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentStep: 'chooseExchange'
		};
	}

	render() {
		const showChooseExchange = this.state.currentStep === 'chooseExchange';
		return (
			<div className="exchange">
				<div className="currency--wallet--header">
					<h3>Exchange Cryptocurrencies</h3>
				</div>
				<div className="exchange--content">{showChooseExchange && <ChooseExchange />}</div>
			</div>
		);
	}
}

export default Exchange;
