import React from 'react';

const LocalCurrencyStep = props => {
	return (
		<div className="onboarding--card">
			<div className="onboarding--card--header">
				<h3>Hi,</h3>
				<p className="onboarding--card--header--name">
					{props.currentUser.displayName || props.currentUser.email}
				</p>
				<p>We just need a little more information to personalize your experience</p>
			</div>
			<div className="onboarding--local--currency">
				<p>Please choose your preferred local currency</p>
				<i className="fa fa-money" aria-hidden="true" />
				<select className="onboarding--select--local--currency" onChange={props.handleLocalCurrencyChange}>
					{props.currencyData.map(currency => {
						return (
							<option key={currency.id} value={currency.ticker}>
								{currency.name} ({currency.ticker})
							</option>
						);
					})}
				</select>
			</div>
			<div className="main-button onboarding--button" onClick={props.handleLocalCurrencySubmit}>
				Continue
			</div>
		</div>
	);
};

export default LocalCurrencyStep;
