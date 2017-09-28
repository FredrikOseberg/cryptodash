import React from 'react';
import { connect } from 'react-redux';
import CurrencyStatCard from '../CurrencyStatCard/CurrencyStatCard';
import CurrencyPortfolio from '../CurrencyPortfolio/CurrencyPortfolio';
import LineChart from '../LineChart/LineChart';

const DashboardMainPage = props => (
	<div>
		<div className="dashboard--content--chart">
			{props.firstCurrency ? (
				<LineChart symbol={props.firstCurrency.symbol} getCurrentCurrency={props.getCurrentCurrency} />
			) : (
				''
			)}
		</div>
		<div className="dashboard--currency">
			<div className="dashboard--currency--container">
				{props.currencies.map(currency => {
					return (
						<CurrencyStatCard
							name={currency.name}
							img={currency.img}
							key={currency.id}
							symbol={currency.symbol}
						/>
					);
				})}
			</div>

			<CurrencyPortfolio currencies={props.currencies} />
		</div>
	</div>
);

const mapStateToProps = state => ({
	currencies: state.selectedCurrencies,
	firstCurrency: state.selectedCurrencies[0]
});

export default connect(mapStateToProps)(DashboardMainPage);
