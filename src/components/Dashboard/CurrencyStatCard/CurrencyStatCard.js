import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteItemFromDBandState } from '../../../common/helpers';

class CurrencyStatCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clicked: false
		};

		this.handleMenuClick = this.handleMenuClick.bind(this);
		this.handleStopTrackingClick = this.handleStopTrackingClick.bind(this);
	}

	handleMenuClick() {
		this.setState({ clicked: !this.state.clicked });
	}

	handleStopTrackingClick(event) {
		const coinSymbol = event.currentTarget.dataset.symbol;
		deleteItemFromDBandState(coinSymbol);
	}

	render() {
		let percentageClasses;

		this.props.percentage > 0
			? (percentageClasses = 'currency--stat--percentage currency--stat--percentage--positive')
			: (percentageClasses = 'currency--stat--percentage currency--stat--percentage--negative');

		let dropdownClasses;
		this.state.clicked
			? (dropdownClasses = 'currency--stat--card--dropdown visible opacity transition')
			: (dropdownClasses = 'currency--stat--card--dropdown');
		return (
			<div className="currency--stat--card">
				<div className="currency--stat--card--menu">
					<i className="fa fa-ellipsis-h" aria-hidden="true" onClick={this.handleMenuClick} />
					<ul className={dropdownClasses}>
						<li
							className="currency--stat--card--dropdown--delete"
							data-symbol={this.props.symbol}
							onClick={this.handleStopTrackingClick}
						>
							Stop Tracking
						</li>
					</ul>
				</div>
				<img src={this.props.img} alt={this.props.name} />
				<div className="currency--stat--info">
					<h3>{this.props.name}</h3>
					<p>
						%24hr: <span className={percentageClasses}>{this.props.percentage}%</span>
					</p>
				</div>
				<span className="currency--stat--card--price">
					{this.props.price} <span className="currency--postfix">{this.props.localCurrency.currency}</span>
				</span>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	localCurrency: state.localCurrency
});

export default connect(mapStateToProps)(CurrencyStatCard);
