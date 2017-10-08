import React from 'react';
import Wallet from './Wallet/Wallet';
import './sidebar.css';

const Sidebar = props => {
	let sidebarClasses;
	props.show
		? (sidebarClasses = 'dashboard--sidebar dashboard--sidebar--active')
		: (sidebarClasses = 'dashboard--sidebar');

	const showWallet = props.component === 'wallet';
	return (
		<div className={sidebarClasses}>
			<div className="dashboard--sidebar--exit" onClick={props.showSidebar}>
				&times;
			</div>
			<div className="sidebar--content">{showWallet && <Wallet />}</div>
		</div>
	);
};

export default Sidebar;
