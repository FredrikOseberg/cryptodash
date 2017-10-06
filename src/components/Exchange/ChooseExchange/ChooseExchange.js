import React, { Component } from 'react';
import { getCurrencies } from '../../../api/api';
import coinData from '../../../coinData';
import ExchangeSearchBox from './ExchangeSearchBox/ExchangeSearchBox';
import './choosexchange.css';

class ChooseExchange extends Component {
	constructor(props) {
		super(props);

		this.state = {
			availableExchangeCurrencies: [],
			changeFrom: 'btc',
			changeTo: 'etc',
			showFromSearchBox: false,
			showToSearchBox: false
		};

		this.handleFromButtonSelectorClick = this.handleFromButtonSelectorClick.bind(this);
		this.handleToButtonSelectorClick = this.handleToButtonSelectorClick.bind(this);
		this.handleFromListItemClick = this.handleFromListItemClick.bind(this);
		this.handleToListItemClick = this.handleToListItemClick.bind(this);
	}

	componentDidMount() {
		let initialStateExchangeCurrencies = [];
		getCurrencies().then(response => {
			response.data.result.forEach(result => {
				coinData.forEach(currency => {
					if (currency.symbol === result.toUpperCase()) {
						initialStateExchangeCurrencies.push(currency);
					} else {
						// Do an ajax request and create an object for that currency
					}
				});
			});
			this.setState({ availableExchangeCurrencies: initialStateExchangeCurrencies });
		});
	}

	handleFromButtonSelectorClick(event) {
		if (event.target.classList.contains('exchange--choose--currency--list--search')) {
			return;
		}
		this.setState({ showFromSearchBox: !this.state.showFromSearchBox });
	}

	handleToButtonSelectorClick(event) {
		if (event.target.classList.contains('exchange--choose--currency--list--search')) {
			return;
		}
		this.setState({ showToSearchBox: !this.state.showToSearchBox });
	}

	handleFromListItemClick(symbol) {
		this.setState({ changeFrom: symbol });
	}

	handleToListItemClick(symbol) {
		this.setState({ changeTo: symbol });
	}

	render() {
		let inputMarkup;
		// console.log(this.state.availableExchangeCurrencies);

		return (
			<div className="exchange--choose--exchange">
				<div className="exchange--choose--exchange--from--container">
					<label>From</label>
					<div className="exchange--choose--exchange--from--input--container">
						<input className="main--input" />
						<div
							className="exchange--choose--exchange--from--selected exchange--choose--selected"
							onClick={this.handleFromButtonSelectorClick}
						>
							{this.state.changeFrom.toUpperCase()}
							<i className="fa fa-caret-down" aria-hidden="true" />
							<ExchangeSearchBox
								currencies={this.state.availableExchangeCurrencies}
								handler={this.handleFromListItemClick}
								show={this.state.showFromSearchBox}
							/>
						</div>
					</div>
				</div>

				<div className="exchange--choose--exchange--to--container">
					<label>To</label>
					<div className="exchange--choose--exchange--from--input--container">
						<input className="main--input" />
						<div
							className="exchange--choose--exchange--from--selected exchange--choose--selected"
							onClick={this.handleToButtonSelectorClick}
						>
							{this.state.changeTo.toUpperCase()}
							<i className="fa fa-caret-down" aria-hidden="true" />
							<ExchangeSearchBox
								currencies={this.state.availableExchangeCurrencies}
								handler={this.handleToListItemClick}
								show={this.state.showToSearchBox}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ChooseExchange;
