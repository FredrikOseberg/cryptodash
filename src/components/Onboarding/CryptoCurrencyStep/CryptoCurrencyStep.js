import React from 'react';
import ChooseCurrency from '../../ChooseCurrency/ChooseCurrency';

const CryptoCurrencyStep = props => (
	<div className="onboarding--card">
		<div className="onboarding--card--header">
			<h3>Hi,</h3>
			<p className="onboarding--card--header--name">{props.currentUser.displayName || props.currentUser.email}</p>
			<p>We just need a little more information to personalize your experience</p>
		</div>
		<ChooseCurrency
			handleClickedExpand={props.handleClickedExpand}
			handleCurrencySubmit={props.handleCurrencySubmit}
		/>
	</div>
);

export default CryptoCurrencyStep;
