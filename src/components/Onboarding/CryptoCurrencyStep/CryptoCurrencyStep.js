import React from 'react';
import ChooseCurrency from '../../ChooseCurrency/ChooseCurrency';

const CryptoCurrencyStep = props => (
	<div className="onboarding--card">
		<div className="onboarding--card--header">
			<h3>Hi, {props.currentUser.displayName || props.currentUser.email}</h3>
			<p>We just need a little more information to personalize your experience</p>
		</div>
		<ChooseCurrency handleClickedExpand={props.handleClickedExpand} />
		<div className="main-button onboarding--button" onClick={props.handleCurrencySubmit}>
			Continue
		</div>
	</div>
);

export default CryptoCurrencyStep;
