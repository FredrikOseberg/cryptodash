import React from 'react';

const CurrencyStatCard = props => (
	<div className="currency--stat--card">
		<img src={props.img} alt={props.name} />
		<h3>{props.name}</h3>
		<span>2300</span>
	</div>
);

export default CurrencyStatCard;
