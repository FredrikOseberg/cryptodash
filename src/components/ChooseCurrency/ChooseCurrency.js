import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import coinData from '../../coinData';
import './choosecurrency.css';

class ChooseCurrency extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currencyPool: [],
			currencyOne: {},
			currencyTwo: {}
		};

		this.setCurrency = this.setCurrency.bind(this);
		this.setCurrencyPool = this.setCurrencyPool.bind(this);
	}

	componentDidMount() {
		this.setCurrencyPool().then(() => {
			this.setCurrency('currencyOne');
			this.setCurrency('currencyTwo');
			this.interval = setInterval(() => {
				this.setCurrency('currencyOne');
				this.setCurrency('currencyTwo');
			}, 7000);
		});
	}

	setCurrencyPool() {
		return new Promise(resolve => {
			let currencyPoolWithSymbols = coinData.filter(currency => {
				return currency.defaultImage === undefined;
			});

			this.setState({ currencyPool: currencyPoolWithSymbols }, () => {
				resolve();
			});
		});
	}

	setCurrency(stateToChange) {
		let curOne;
		const randomNumberOne = this.getRandomNumber();
		curOne = { ...this.state.currencyPool[randomNumberOne] };
		this.setState({ [stateToChange]: curOne });
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getRandomNumber() {
		return Math.ceil(Math.random() * (this.state.currencyPool.length - 1));
	}

	render() {
		let selectedCurrenciesText, buttonMarkup;
		if (this.props.selectedCurrencies.length > 0) {
			selectedCurrenciesText = (
				<div className="landing--cover--content--box--selected--currencies">
					<p>You have selected {this.props.selectedCurrencies.length} currencies to track.</p>
				</div>
			);
			if (this.props.handleCurrencySubmit) {
				buttonMarkup = (
					<div
						className="landing--cover--content--box--button main-button"
						onClick={this.props.handleCurrencySubmit}
					>
						Continue
					</div>
				);
			} else {
				buttonMarkup = (
					<Link to="/register">
						<div className="landing--cover--content--box--button main-button">Continue</div>
					</Link>
				);
			}
		} else {
			buttonMarkup = (
				<div
					className="landing--cover--content--box--button main-button"
					onClick={this.props.handleClickedExpand}
				>
					Expand Selection
				</div>
			);
		}
		return (
			<div className="choose--currency">
				<h3 className="choose--currency--header">Choose which currencies to track.</h3>
				<p>Click currencies below to expand selection.</p>
				<div className="choose--currency--content--box--currency">
					<div
						className="choose--currency--content--box--image--container"
						onClick={this.props.handleClickedExpand}
					>
						<img
							src={this.state.currencyOne.img}
							className="choose--currency--content--box--image"
							alt={this.state.currencyOne.name}
						/>
						<p>{this.state.currencyOne.name}</p>
					</div>
					<div
						className="choose--currency--content--box--image--container"
						onClick={this.props.handleClickedExpand}
					>
						<img
							src={this.state.currencyTwo.img}
							className="choose--currency--content--box--image"
							alt={this.state.currencyTwo.name}
						/>
						<p>{this.state.currencyTwo.name}</p>
					</div>
				</div>
				{selectedCurrenciesText}
				{buttonMarkup}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	selectedCurrencies: state.selectedCurrencies
});

export default connect(mapStateToProps)(ChooseCurrency);
