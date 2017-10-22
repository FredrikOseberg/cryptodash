import React from 'react';
import Wallet from './Wallet/Wallet';
import SidebarExchange from './SidebarExchange/SidebarExchange';
import SidebarPortfolio from './SidebarPortfolio/SidebarPortfolio';
import SidebarAllCoins from './SidebarAllCoins/SidebarAllCoins';
import './sidebar.css';

const Sidebar = props => {
	let sidebarClasses;
	props.show
		? (sidebarClasses = 'dashboard--sidebar dashboard--sidebar--active')
		: (sidebarClasses = 'dashboard--sidebar');

	const showWallet = props.component === 'wallet';
	const showExchange = props.component === 'exchange';
	const showPortfolio = props.component === 'portfolio';
	const showAllCoins = props.component === 'allcoins';

	showAllCoins
		? (sidebarClasses = 'dashboard--sidebar dashboard--sidebar--active sidebar--full--width')
		: 'dashboard--sidebar';

	return (
		<div className={sidebarClasses}>
			<div className="dashboard--sidebar--exit" onClick={props.showSidebar}>
				&times;
			</div>
			<div className="sidebar--content">
				{showWallet && <Wallet handleAddWalletClick={props.handleAddWalletClick} />}
				{showExchange && <SidebarExchange showSidebar={props.show} />}
				{showPortfolio && <SidebarPortfolio handleAddWalletClick={props.handleAddWalletClick} />}
				{showAllCoins && <SidebarAllCoins allCurrencies={props.allCurrencies} />}
			</div>
		</div>
	);
};

export default Sidebar;
