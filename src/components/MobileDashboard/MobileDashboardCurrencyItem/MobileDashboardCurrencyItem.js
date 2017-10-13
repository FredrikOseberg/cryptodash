import React from 'react';
import { connect } from 'react-redux';
import './mobiledashboardcurrencyitem.css';

const MobileDashboardCurrencyItem = props => {
	let percentageClasses;
	if (props.percentage > 0) {
		percentageClasses =
			'mobile--currencies--list--item--percentage mobile--currencies--list--item--percentage--positive';
	} else {
		percentageClasses =
			'mobile--currencies--list--item--percentage mobile--currencies--list--item--percentage--negative';
	}
	return (
		<li className="mobile--currencies--list--item">
			<div className="mobile--currencies--list--item--img">
				<img src={props.img} alt={props.name} />
			</div>
			<p className="mobile--currencies--list--item--name">{props.name}</p>
			<p className={percentageClasses}>{props.percentage}%</p>
			<p className="mobile--currencies--list--item--price">
				{props.price} <span className="price--postfix">{props.localCurrency.currency}</span>
			</p>
		</li>
	);
};

const mapStateToProps = state => ({
	localCurrency: state.localCurrency
});

export default connect(mapStateToProps)(MobileDashboardCurrencyItem);
