import React, { Component } from 'react';
import { getCurrencies } from '../../api/api';
import './exchange.css';

class Exchange extends Component {
	constructor(props) {
		super(props);

		this.state = {
			availableExchangeCurrencies: []
		};
	}

	componentDidMount() {
		getCurrencies().then(response => {
			console.log(response);
		});
	}

	render() {
		return (
			<div className="exchange">
				<div className="currency--wallet--header">
					<h3>Exchange Cryptocurrencies</h3>
				</div>
				<div className="exchange--content">
					<h1>Mama</h1>
				</div>
			</div>
		);
	}
}

export default Exchange;
