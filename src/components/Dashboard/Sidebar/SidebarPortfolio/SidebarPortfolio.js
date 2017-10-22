import React from 'react';
import CurrencyPortfolio from '../../CurrencyPortfolio/CurrencyPortfolio';
import './sidebarportfolio.css';

const SidebarPortfolio = props => (
	<div className="sidebar--portfolio">
		<CurrencyPortfolio handleAddWalletClick={props.handleAddWalletClick} />
	</div>
);

export default SidebarPortfolio;
