import React from 'react';
import Wallet from './Wallet/Wallet';
import SidebarExchange from './SidebarExchange/SidebarExchange';
import './sidebar.css';

const Sidebar = props => {
	let sidebarClasses;
	props.show
		? (sidebarClasses = 'dashboard--sidebar dashboard--sidebar--active')
		: (sidebarClasses = 'dashboard--sidebar');

	const showWallet = props.component === 'wallet';
	const showExchange = props.component === 'exchange';
	return (
		<div className={sidebarClasses}>
			<div className="dashboard--sidebar--exit" onClick={props.showSidebar}>
				&times;
			</div>
			<div className="sidebar--content">
				{showWallet && <Wallet />}
				{showExchange ? <SidebarExchange showSidebar={props.show} /> : ''}
			</div>
		</div>
	);
};

export default Sidebar;
