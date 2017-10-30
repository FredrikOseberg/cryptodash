import React from 'react';
import { connect } from 'react-redux';
import CurrencyStatCard from '../CurrencyStatCard/CurrencyStatCard';
import CurrencyPortfolio from '../CurrencyPortfolio/CurrencyPortfolio';
import LineChart from '../LineChart/LineChart';
import Spinner from '../../Loading/Spinner/Spinner';

const DashboardMainPage = props => {
	let currencyCard = props.currencies.map(currency => {
		if (currency.price && currency.price !== 'NaN') {
			return (
				<CurrencyStatCard
					name={currency.name}
					img={currency.img}
					key={currency.id}
					symbol={currency.symbol}
					price={currency.price}
					percentage={currency.percentage}
				/>
			);
		} else {
			return (
				<div className="currency--stat--card" key={currency.id}>
					<Spinner />
				</div>
			);
		}
	});

	let portfolio = props.currencies.every(currency => {
		return currency.price && currency.price !== 'NaN';
	});

	let portfolioMarkup;
	if (portfolio) {
		portfolioMarkup = <CurrencyPortfolio handleAddWalletClick={props.handleAddWalletClick} />;
	} else {
		portfolioMarkup = (
			<div className="currency--portfolio">
				<Spinner />
			</div>
		);
	}

	const lineChartStyle = {
		color: '#fff',
		fillColor: 'rgba(255, 255, 255, 0.6)',
		fill: true
	};
	return (
		<div>
			<div className="dashboard--content--chart">
				{props.firstCurrency ? (
					<LineChart getCurrentCurrency={props.getCurrentCurrency} styles={lineChartStyle} isMobile={false} />
				) : (
					<Spinner />
				)}
			</div>
			<div className="dashboard--currency">
				<div className="dashboard--currency--container">{currencyCard}</div>
				{portfolioMarkup}
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	currencies: state.selectedCurrencies,
	firstCurrency: state.selectedCurrencies[0]
});

export default connect(mapStateToProps)(DashboardMainPage);
