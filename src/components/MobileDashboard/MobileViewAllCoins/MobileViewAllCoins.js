import React from 'react';
import ViewAllCurrencies from '../../ViewAllCurrencies/ViewAllCurrencies';
import './mobileviewallcoins.css';

const MobileViewAllCoins = () => (
	<div className="mobile--dashboard--all--coins">
		<div className="mobile--dashboard--all--coins--header">
			<h3>All Coins</h3>
		</div>
		<ViewAllCurrencies />
	</div>
);

export default MobileViewAllCoins;
