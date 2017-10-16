import React from 'react';
import MobileLineChart from '../MobileLineChart/MobileLineChart';
import MobileDashboardCurrencyItem from '../MobileDashboardCurrencyItem/MobileDashboardCurrencyItem';
import './mobiledashboardmainpage.css';

const MobileDashMainPage = props => {
	let showLineChart = props.currentCurrency;

	return (
		<div className="mobile--dashboard--main--page">
			{showLineChart && <MobileLineChart getCurrentCurrency={props.getCurrentCurrency} />}
			<div className="mobile--currencies">
				<h3 className="mobile--currencies--header">Tracked Currencies</h3>
				<ul className="mobile--currencies--list">
					{props.currencies.map(currency => {
						return (
							<MobileDashboardCurrencyItem
								symbol={currency.symbol}
								percentage={currency.percentage}
								price={currency.price}
								name={currency.name}
								img={currency.img}
								key={currency.symbol}
							/>
						);
					})}
				</ul>
				<div className="mobile--currencies--button--container">
					<div className="mobile--currencies--add--button" onClick={props.handleAddCurrencyClick}>
						<i className="fa fa-plus" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MobileDashMainPage;
