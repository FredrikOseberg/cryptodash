import React from 'react';
import { isMobile } from '../HoC/IsMobile.js';
import ViewAllCurrencies from '../ViewAllCurrencies/ViewAllCurrencies';
import MobileViewAllCoins from '../MobileDashboard/MobileViewAllCoins/MobileViewAllCoins';
import Header from '../Header/Header';
import './frontendviewallcurrencies.css';

const FrontendViewAllCurrencies = props => {
	let component;
	if (props.isMobile) {
		component = <MobileViewAllCoins />;
	} else {
		component = <ViewAllCurrencies landing={true} />;
	}
	return (
		<div className="frontend--view--all--currencies">
			<Header frontend={true} />
			<div className="frontend--view--all--currencies--container">{component}</div>
		</div>
	);
};
export default isMobile(FrontendViewAllCurrencies);
