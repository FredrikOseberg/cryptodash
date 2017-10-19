import React from 'react';
import ViewAllCurrencies from '../../ViewAllCurrencies/ViewAllCurrencies';
import './mobileviewallcoins.css';

const MobileViewAllCoins = props => (
	<div className="mobile--dashboard--all--coins">
		<div className="mobile--dashboard--all--coins--header">
			<h3>All Coins</h3>
		</div>
		<ViewAllCurrencies allCurrencies={props.allCurrencies} />
	</div>
);

export default MobileViewAllCoins;
