import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { database, auth } from '../../../../firebase';
import { connect } from 'react-redux';
import { convertPriceToLocalCurrency } from '../../../../common/helpers';
import map from 'lodash/map';
import './dashboardportfoliochart.css';

class DashboardPortfolioChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			labels: [],
			percentage: 0
		};

		this.setChartData = this.setChartData.bind(this);
		this.calculate24PercentageChange = this.calculate24PercentageChange.bind(this);
	}

	componentDidMount() {
		this.setChartData();
		this.calculate24PercentageChange();
	}

	formatDate(date) {
		var monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];

		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();

		return day + ' ' + monthNames[monthIndex] + ' ' + year;
	}

	setChartData() {
		const databaseRef = database.ref(`/users/${auth.currentUser.uid}`);

		databaseRef.once('value', snapshot => {
			const data = [],
				labels = [];

			const storedData = snapshot
				.child('portfolio')
				.child('data')
				.val();

			map(storedData, values => {
				const portfolioValueInLocalCurrency = convertPriceToLocalCurrency(values.portfolioValue);
				const date = new Date(values.timestamp);
				const formattedDate = this.formatDate(date);

				data.push(portfolioValueInLocalCurrency);
				labels.push(formattedDate);
			});

			const portfolioValueToday = Number(data[data.length - 1]);
			const portfolioValueYesterday = Number(data[data.length - 2]);

			this.calculate24PercentageChange(portfolioValueToday, portfolioValueYesterday);

			this.setState({ data });
			this.setState({ labels });
		});
	}

	calculate24PercentageChange(portfolioValueToday, portfolioValueYesterday) {
		const portfolioValueDifference = portfolioValueToday - portfolioValueYesterday;
		const percentage = portfolioValueDifference / portfolioValueYesterday * 100;
		console.log(portfolioValueToday, portfolioValueYesterday);

		this.setState({ percentage });
	}

	render() {
		const data = {
			labels: this.state.labels,
			datasets: [
				{
					label: 'Portfolio',
					data: this.state.data,
					backgroundColor: 'rgba(255,255,255,0.4)',
					color: '#fff',
					borderColor: '#fff',
					pointBorderColor: '#fff'
				}
			]
		};
		const lineChartOptions = {
			maintainAspectRatio: true,
			scales: {
				xAxes: [
					{
						ticks: {
							autoSkip: true,
							maxTicksLimit: 2,
							minRotation: 0,
							maxRotation: 0,
							fontColor: '#fff',
							fontFamily: 'Montserrat'
						}
					}
				],
				yAxes: [
					{
						ticks: {
							maxTicksLimit: 5,
							fontColor: '#fff',
							fontFamily: 'Montserrat'
						}
					}
				]
			}
		};

		let percentageClasses;
		if (this.state.percentage > 0) {
			percentageClasses = 'dashboard--portfolio--percentage--positive';
		} else {
			percentageClasses = 'dashboard--portfolio--percentage--negative';
		}

		return (
			<section className="dashboard--portfolio--chart">
				<header>
					<div className="dashboard--portfolio--value">
						<h1>
							{this.props.portfolio.totalVal}
							<span className="price--postfix">{this.props.localCurrency.currency}</span>
						</h1>
						<p>Portfolio value</p>
					</div>
					<div className="dashboard--portfolio--24hr--percentage">
						<h1 className={percentageClasses}>{this.state.percentage.toFixed(2)}%</h1>
						<p>Portfolio 24hr change</p>
					</div>
				</header>
				<Line data={data} options={lineChartOptions} />
			</section>
		);
	}
}

const mapStateToProps = state => ({
	localCurrency: state.localCurrency,
	portfolio: state.portfolio
});

export default connect(mapStateToProps)(DashboardPortfolioChart);
