import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import './linechart.css';

class LineChart extends Component {
	constructor(props) {
		super(props);

		this.interval;

		this.state = {
			currentCurrency: this.props.currencies[0],
			symbol: this.props.symbol,
			timePeriods: [
				{
					time: '1',
					name: '1 D',
					id: 1
				},
				{
					time: '7',
					name: '1 W',
					id: 2
				},
				{
					time: '30',
					name: '1 M',
					id: 3
				},
				{
					time: '180',
					name: '6 M',
					id: 4
				},
				{
					time: '365',
					name: '1 Y',
					id: 5
				},
				{
					time: 'All',
					name: 'All',
					id: 6
				}
			],
			currentTime: '30',
			data: {
				labels: [],
				datasets: [
					{
						label: [this.props.symbol + ' Price'],
						fill: true,
						lineTension: 0.1,
						backgroundColor: 'rgba(232,127,0,0.4)',
						borderColor: 'rgba(246, 146, 26, 1)',
						borderCapStyle: 'butt',
						borderDash: [],
						borderDashOffset: 0.0,
						borderJoinStyle: 'miter',
						pointBorderColor: 'rgba(246, 146, 26, 1)',
						pointBackgroundColor: '#fff',
						pointBorderWidth: 1,
						pointHoverRadius: 5,
						pointHoverBackgroundColor: 'rgba(246, 146, 26, 1)',
						pointHoverBorderColor: 'rgba(220,220,220,1)',
						pointHoverBorderWidth: 2,
						pointRadius: 1,
						pointHitRadius: 10,
						data: []
					}
				]
			}
		};

		this.handleCurrencyNavTypeClick = this.handleCurrencyNavTypeClick.bind(this);
		this.handleCurrencyNavTimeperiodClick = this.handleCurrencyNavTimeperiodClick.bind(this);
		this.getChartData = this.getChartData.bind(this);
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

	handleCurrencyNavTypeClick(event) {
		const symbol = event.target.dataset.symbol;
		const newData = { ...this.state.data };
		console.log(newData);
		newData.datasets[0].label = [symbol + ' Price'];
		this.setState({ symbol: symbol });
		this.setState({ data: newData }, () => {
			this.getChartData();
		});
	}

	handleCurrencyNavTimeperiodClick(event) {
		const time = event.target.dataset.period;

		this.setState({ currentTime: time }, () => {
			this.getChartData();
		});
	}

	componentDidMount() {
		this.getChartData();
		this.interval = setInterval(() => {
			this.getChartData();
		}, 60000);
	}

	getChartData() {
		let timeFrame;
		this.state.currentTime !== 'All' ? (timeFrame = `${this.state.currentTime}day/`) : (timeFrame = '');
		const data = axios.get(`http://coincap.io/history/${timeFrame}${this.state.symbol}`).then(results => {
			const newLabels = [],
				newData = [];
			const newState = { ...this.state.data };
			results.data.price.forEach(result => {
				const date = new Date(result[0]);
				const price = result[1];

				newLabels.push(this.formatDate(date));
				newData.push(price);
			});

			newState.labels = newLabels;
			newState.datasets[0].data = newData;

			this.setState({ data: newState });
		});
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return (
			<div className="currency--line--chart--container">
				<div className="currency--line--chart--header">
					<ul className="currency--line--chart--navigation">
						{this.props.currencies.map((currency, index) => {
							let navClass;
							this.state.symbol === currency.symbol
								? (navClass = 'currency--line--chart--navigation--active')
								: (navClass = '');
							return (
								<li
									data-symbol={currency.symbol}
									key={currency.id}
									className={navClass}
									onClick={this.handleCurrencyNavTypeClick}
								>{`${currency.name} (${currency.symbol})`}</li>
							);
						})}
					</ul>
					<ul className="currency--line--chart--timeperiod--navigation">
						{this.state.timePeriods.map(timePeriod => {
							let classes;
							this.state.currentTime === timePeriod.time
								? (classes = 'currency--line--chart--navigation--active')
								: (classes = '');
							return (
								<li
									className={classes}
									key={timePeriod.id}
									data-period={timePeriod.time}
									onClick={this.handleCurrencyNavTimeperiodClick}
								>
									{timePeriod.name}
								</li>
							);
						})}
					</ul>
				</div>
				<div className="currency--line--chart--wrapper">
					<Line
						data={this.state.data}
						height={400}
						options={{
							maintainAspectRatio: false,
							scales: {
								xAxes: [
									{
										ticks: {
											autoSkip: true,
											maxTicksLimit: 8
										}
									}
								]
							}
						}}
					/>
				</div>
			</div>
		);
	}
}

export default LineChart;
