import React from 'react';
import { isMobile } from '../HoC/IsMobile.js';
import ViewAllCurrencies from '../ViewAllCurrencies/ViewAllCurrencies';
import MobileViewAllCoins from '../MobileDashboard/MobileViewAllCoins/MobileViewAllCoins';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import Header from '../Header/Header';
import './frontendviewallcurrencies.css';

const FrontendViewAllCurrencies = props => {
	let component, header;
	if (props.isMobile) {
		component = <MobileViewAllCoins />;
		header = <MobileNavigation />;
	} else {
		component = <ViewAllCurrencies landing={true} />;
		header = <Header frontend={true} />;
	}
	return (
		<div className="frontend--view--all--currencies">
			{header}
			<div className="frontend--view--all--currencies--container">{component}</div>
		</div>
	);
};
export default isMobile(FrontendViewAllCurrencies);
