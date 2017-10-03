import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentCurrency } from '../../../actions/currentCurrency';
import { convertPriceToLocalCurrency } from '../../../common/helpers';
import { Line } from 'react-chartjs-2';
import timePeriodData from '../../../timePeriodData';
import axios from 'axios';
import './linechart.css';

class LineChart extends Component {
	constructor(props) {
		super(props);

		this.interval;

		this.state = {
			currentCurrency: this.props.currentCurrency,
			symbol: this.props.currentCurrency.symbol,
			timePeriods: timePeriodData,
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
		const symbol = event.currentTarget.dataset.symbol;
		const newData = { ...this.state.data };

		this.props.currencies.forEach(currency => {
			if (currency.symbol === symbol) {
				this.props.getCurrentCurrency(symbol);
			}
		});

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
		axios.get(`https://coincap.io/history/${timeFrame}${this.state.symbol}`).then(results => {
			const newLabels = [],
				newData = [];
			const newState = { ...this.state.data };
			results.data.price.forEach(result => {
				const date = new Date(result[0]);
				const price = convertPriceToLocalCurrency(result[1]);
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
		let trendingClasses;
		this.props.currentCurrency.percentage > 0
			? (trendingClasses = 'fa fa-line-chart trending--positive')
			: (trendingClasses = 'fa fa-line-chart trending--negative');
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
								>
									{`${currency.name} (${currency.symbol})`}
									<h5 className="currency--line--chart--price">
										{currency.price} {this.props.localCurrency.currency}
									</h5>
								</li>
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
				<div className="currency--line--chart--details">
					<div className="currency--line--chart--details--price">
						<h3>
							{this.props.currentCurrency.price} {this.props.localCurrency.currency}
						</h3>
						<p>{this.props.currentCurrency.name} Price</p>
					</div>
					<div className="currency--line--chart--details--trending">
						<i className={trendingClasses} aria-hidden="true" />
						<p>{this.props.currentCurrency.percentage}%</p>
					</div>
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

const mapStateToProps = state => ({
	currencies: state.selectedCurrencies,
	currentCurrency: state.currentCurrency,
	localCurrency: state.localCurrency
});

const mapDispatchToProps = dispatch => ({
	addCurrentCurrencyToState(obj) {
		dispatch(addCurrentCurrency(obj));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(LineChart);
