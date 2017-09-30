import React, { Component } from 'react';
import { connect } from 'react-redux';

const CurrencyStatCard = props => {
	let percentageClasses;

	props.percentage > 0
		? (percentageClasses = 'currency--stat--percentage currency--stat--percentage--positive')
		: (percentageClasses = 'currency--stat--percentage currency--stat--percentage--negative');
	return (
		<div className="currency--stat--card">
			<img src={props.img} alt={props.name} />
			<div className="currency--stat--info">
				<h3>{props.name}</h3>
				<p>
					%24hr: <span className={percentageClasses}>{props.percentage}%</span>
				</p>
			</div>
			<span className="currency--stat--card--price">
				{props.price} <span className="currency--postfix">{props.localCurrency.currency}</span>
			</span>
		</div>
	);
};

const mapStateToProps = state => ({
	localCurrency: state.localCurrency
});

export default connect(mapStateToProps)(CurrencyStatCard);
