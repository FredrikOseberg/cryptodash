import React from 'react';
import { connect } from 'react-redux';
import CurrencyStatCard from '../CurrencyStatCard/CurrencyStatCard';
import CurrencyPortfolio from '../CurrencyPortfolio/CurrencyPortfolio';
import CurrencyList from '../CurrencyList/CurrencyList';
import LineChart from '../LineChart/LineChart';
import Spinner from '../../Loading/Spinner/Spinner';
import { Link } from 'react-router-dom';

const DashboardMainPage = props => {
	const lineChartStyle = {
		color: '#fff',
		fillColor: 'rgba(255, 255, 255, 0.4)',
		fill: true,
		width: '100%'
	};
	let currencyPortfolioOnLeft, currencyPortfolioOnRight;
	if (props.currencies.length >= 10) {
		currencyPortfolioOnRight = <CurrencyPortfolio />;
		currencyPortfolioOnLeft = '';
	} else {
		currencyPortfolioOnRight = '';
		currencyPortfolioOnLeft = <CurrencyPortfolio />;
	}

	return (
		<div className="dashboard--main--page--content">
			<div className="dashboard--main--page--currency--list">
				<div className="dashboard--main--page--currency--list--header">
					<h3>
						<i className="fa fa-line-chart" aria-hidden="true" /> Tracked Currencies
					</h3>
					<Link to="/all">
						<div className="dashboard--main--page--currency--list--add--button">
							<i className="fa fa-plus" aria-hidden="true" />
						</div>
					</Link>
				</div>
				<CurrencyList currencies={props.currencies} handleAddWalletClick={props.handleAddWalletClick} />
				{currencyPortfolioOnLeft}
			</div>
			<div className="dashboard--content--chart">
				{props.currentCurrency ? (
					<LineChart getCurrentCurrency={props.getCurrentCurrency} styles={lineChartStyle} isMobile={false} />
				) : (
					<Spinner />
				)}
				{currencyPortfolioOnRight}
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	currencies: state.selectedCurrencies,
	currentCurrency: state.currentCurrency
});

export default connect(mapStateToProps)(DashboardMainPage);
