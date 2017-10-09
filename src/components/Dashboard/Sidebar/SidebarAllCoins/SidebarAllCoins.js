import React from 'react';
import ViewAllCurrencies from '../../../ViewAllCurrencies/ViewAllCurrencies';
import './sidebarallcoins.css';

const SidebarAllCoins = props => (
	<div className="sidebar--allcoins">
		<ViewAllCurrencies allCurrencies={props.allCurrencies} />
	</div>
);

export default SidebarAllCoins;
