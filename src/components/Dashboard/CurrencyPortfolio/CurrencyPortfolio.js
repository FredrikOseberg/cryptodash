import React from 'react';

const CurrencyPortfolio = props => (
	<div className="currency--portfolio">
		<div className="currency--portfolio--header">
			<h3>Your Portfolio</h3>
		</div>
		<ul className="currency--portfolio--list">
			{props.currencies.map(currency => {
				return (
					<li className="currency--portfolio--item" key={currency.id}>
						<img src={currency.img} alt={currency.name} />
						<p>{currency.name}</p>
						<p>
							{currency.amount} {currency.symbol}
						</p>
						<p className="currency--portfolio--item--value">
							NOK {(currency.amount * currency.price).toFixed(2)}
						</p>
					</li>
				);
			})}
		</ul>
		<div className="currency--total--value">
			<h3>Total value</h3>
			<h2>4171 NOK</h2>
		</div>
	</div>
);

export default CurrencyPortfolio;
