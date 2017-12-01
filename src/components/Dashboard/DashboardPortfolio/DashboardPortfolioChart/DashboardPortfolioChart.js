import React from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import './dashboardportfoliochart.css';

const DashboardPortfolioChart = props => {
	const data = {
		labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
		datasets: [
			{
				label: 'Portfolio',
				data: [30000, 37000, 33000, 40000, 42000, 45000, 41000, 42000, 50000],
				color: '#fff',
				borderColor: '#fff',
				pointBorderColor: '#fff',
				pointBorderFillColor: '#fff',
				pointBorderRadius: 1.2,
				fill: false
			}
		]
	};

	return (
		<section className="dashboard--portfolio--chart">
			<header>
				<div className="dashboard--portfolio--value">
					<h1>
						37000<span className="price--postfix">{props.localCurrency.currency}</span>
					</h1>
					<p>Portfolio value</p>
				</div>
				<div className="dashboard--portfolio--24hr--percentage">
					<h1>5%</h1>
					<p>Portfolio 24hr change</p>
				</div>
			</header>
			<Line data={data} />
		</section>
	);
};

const mapStateToProps = state => ({
	localCurrency: state.localCurrency
});

export default connect(mapStateToProps)(DashboardPortfolioChart);
