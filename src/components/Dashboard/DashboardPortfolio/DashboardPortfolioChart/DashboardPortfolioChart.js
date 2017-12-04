import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { database } from '../../../../firebase';
import './dashboardportfoliochart.css';

class DashboardPortfolioChart extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		const data = {
			labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
			datasets: [
				{
					label: 'Portfolio',
					data: [30000, 37000, 33000, 40000, 42000, 45000, 41000, 42000, 50000],
					backgroundColor: 'rgba(255,255,255,0.4)',
					color: '#fff',
					borderColor: '#fff',
					pointBorderColor: '#fff'
				}
			]
		};
		return (
			<section className="dashboard--portfolio--chart">
				<header>
					<div className="dashboard--portfolio--value">
						<h1>
							37000<span className="price--postfix" />
						</h1>
						<p>Portfolio value</p>
					</div>
					<div className="dashboard--portfolio--24hr--percentage">
						<h1>5%</h1>
						<p>Portfolio 24hr change</p>
						<p>Hello</p>
					</div>
				</header>
				<Line data={data} />
			</section>
		);
	}
}

export default DashboardPortfolioChart;
