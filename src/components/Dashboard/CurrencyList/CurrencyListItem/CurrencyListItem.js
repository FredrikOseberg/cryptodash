import React, { Component } from 'react';
import { connect } from 'react-redux';
import './currencylistitem.css';

class CurrencyListItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clicked: false,
			newData: false
		};
	}

	componentWillReceiveProps(props) {
		this.setState({ newData: true }, () => {
			setTimeout(() => {
				this.setState({ newData: false });
			}, 1500);
		});
	}

	render() {
		let percentageClasses;
		if (this.props.percentage > 0) {
			percentageClasses = 'currency--list--item--percentage currency--list--item--percentage--positive';
		} else {
			percentageClasses = 'currency--list--item--percentage currency--list--item--percentage--negative';
		}

		let updatedClasses;
		if (this.state.newData) {
			updatedClasses = 'currency--list--item--updated opacity transition';
		} else {
			updatedClasses = 'currency--list--item--updated';
		}
		return (
			<li>
				<div className={updatedClasses} />
				<img className="currency--list--item--image" src={this.props.img} alt={this.props.name} />
				<p className="currency--list--item--name">
					{this.props.name} ({this.props.symbol})
				</p>
				<p className={percentageClasses}>{this.props.percentage}%</p>
				<p className="currency--list--item--price">
					{this.props.price}
					<span className="price--postfix">{this.props.localCurrency.currency}</span>
				</p>
			</li>
		);
	}
}

const mapStateToProps = state => ({
	localCurrency: state.localCurrency
});

export default connect(mapStateToProps)(CurrencyListItem);
