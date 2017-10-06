import React, { Component } from 'react';
import { getCurrencies, getExchangeAmount } from '../../../api/api';
import coinData from '../../../coinData';
import ExchangeSearchBox from './ExchangeSearchBox/ExchangeSearchBox';
import ExchangeCurrencyInformation from './ExchangeCurrencyInformation/ExchangeCurrencyInformation';
import './choosexchange.css';

class ChooseExchange extends Component {
	constructor(props) {
		super(props);

		this.state = {
			availableExchangeCurrencies: [],
			changeFrom: 'btc',
			changeTo: 'eth',
			exchangeAmount: 0,
			exchangeToValue: 0,
			showFromSearchBox: false,
			showToSearchBox: false,
			showTransferInformation: false
		};

		this.handleFromButtonSelectorClick = this.handleFromButtonSelectorClick.bind(this);
		this.handleToButtonSelectorClick = this.handleToButtonSelectorClick.bind(this);
		this.handleFromListItemClick = this.handleFromListItemClick.bind(this);
		this.handleToListItemClick = this.handleToListItemClick.bind(this);
		this.handleExchangeAmountInputChange = this.handleExchangeAmountInputChange.bind(this);
		this.updateExchangeAmount = this.updateExchangeAmount.bind(this);
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
		this.setState({ changeFrom: symbol }, () => {
			this.updateExchangeAmount();
		});
	}

	handleToListItemClick(symbol) {
		this.setState({ changeTo: symbol }, () => {
			this.updateExchangeAmount();
		});
	}

	handleExchangeAmountInputChange(event) {
		let amount = event.target.value;
		if (amount === '') {
			this.setState({ showTransferInformation: false });
			amount = 0;
		}
		this.setState({ exchangeAmount: amount }, () => {
			this.updateExchangeAmount();
		});
		this.setState({ showTransferInformation: true });
	}

	updateExchangeAmount() {
		let fromCurrency = this.state.changeFrom,
			toCurrency = this.state.changeTo,
			amount = this.state.exchangeAmount;
		if (amount === 0) {
			this.setState({ exchangeToValue: 0 });
		} else {
			getExchangeAmount(fromCurrency, toCurrency, amount).then(response => {
				this.setState({ exchangeToValue: Number(response.data.result).toFixed(4) });
			});
		}
	}

	render() {
		let transferInformationClasses;
		this.state.showTransferInformation === true
			? (transferInformationClasses =
					'exchange--choose--exchange--selected--currencies--container visible static opacity')
			: (transferInformationClasses = 'exchange--choose--exchange--selected--currencies--container');
		return (
			<div className="exchange--choose--exchange">
				<div className="exchange--choose--exchange--container">
					<div className="exchange--choose--exchange--from--container">
						<label>You have</label>
						<div className="exchange--choose--exchange--from--input--container">
							<input
								className="main--input"
								onChange={this.handleExchangeAmountInputChange}
								type="number"
							/>
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
						<label>You get</label>
						<div className="exchange--choose--exchange--from--input--container">
							<input className="main--input" disabled value={this.state.exchangeToValue} />
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

				<div className={transferInformationClasses}>
					<ExchangeCurrencyInformation symbol={this.state.changeFrom} />
					<div className="exchange--choose--currencies--button" onClick={this.props.handler}>
						<i className="fa fa-exchange" />
					</div>
					<ExchangeCurrencyInformation symbol={this.state.changeTo} />
				</div>
			</div>
		);
	}
}

export default ChooseExchange;
