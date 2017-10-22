import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteItemFromDBandState } from '../../../common/helpers';
import Spinner from '../../Loading/Spinner/Spinner';

import './mobiledashboardcurrencyitem.css';

class MobileDashboardCurrencyItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clicked: false
		};

		this.handleCurrencyItemClick = this.handleCurrencyItemClick.bind(this);
		this.handleRemoveCurrency = this.handleRemoveCurrency.bind(this);
	}

	handleCurrencyItemClick() {
		this.setState({ clicked: !this.state.clicked });
	}

	handleRemoveCurrency(event) {
		const coinSymbol = event.currentTarget.dataset.symbol;
		deleteItemFromDBandState(coinSymbol);
	}

	render() {
		let percentageClasses;
		if (this.props.percentage > 0) {
			percentageClasses =
				'mobile--currencies--list--item--percentage mobile--currencies--list--item--percentage--positive';
		} else {
			percentageClasses =
				'mobile--currencies--list--item--percentage mobile--currencies--list--item--percentage--negative';
		}

		let mobileCurrencyMenuClasses;
		if (this.state.clicked) {
			mobileCurrencyMenuClasses = 'mobile--currency--menu visible opacity transition';
		} else {
			mobileCurrencyMenuClasses = 'mobile--currency--menu';
		}

		let priceMarkup;
		if (this.props.price) {
			priceMarkup = (
				<p className="mobile--currencies--list--item--price">
					{this.props.price} <span className="price--postfix">{this.props.localCurrency.currency}</span>
				</p>
			);
		} else {
			priceMarkup = <Spinner />;
		}

		let percentageMarkup;
		if (this.props.percentage) {
			percentageMarkup = <p className={percentageClasses}>{this.props.percentage}%</p>;
		} else {
			percentageMarkup = <Spinner />;
		}

		return (
			<li className="mobile--currencies--list--item" onClick={this.handleCurrencyItemClick}>
				<div className="mobile--currencies--list--item--img">
					<img src={this.props.img} alt={this.props.name} />
				</div>
				<p className="mobile--currencies--list--item--name">{this.props.name}</p>
				{percentageMarkup}
				{priceMarkup}
				<div className={mobileCurrencyMenuClasses}>
					<ul className="mobile--currency--menu--list">
						<li onClick={this.handleRemoveCurrency} data-symbol={this.props.symbol}>
							Stop Tracking
						</li>
					</ul>
				</div>
			</li>
		);
	}
}

const mapStateToProps = state => ({
	localCurrency: state.localCurrency,
	currencies: state.selectedCurrencies
});

export default connect(mapStateToProps)(MobileDashboardCurrencyItem);
