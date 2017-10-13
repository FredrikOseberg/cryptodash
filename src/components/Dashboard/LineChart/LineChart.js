import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentCurrency } from '../../../actions/currentCurrency';
import { convertPriceToLocalCurrency } from '../../../common/helpers';
import { Line } from 'react-chartjs-2';
import timePeriodData from '../../../timePeriodData';
import axios from 'axios';
import Spinner from '../../Loading/Spinner/Spinner';
import './linechart.css';

class LineChart extends Component {
	constructor(props) {
		super(props);

		this.interval;

		this.state = {
			currentCurrency: this.props.currentCurrency,
			symbol: this.props.currentCurrency.symbol,
			timePeriods: timePeriodData,
			showDropdownNav: false,
			currentTime: '30',
			data: {
				labels: [],
				datasets: [
					{
						label: [this.props.symbol + ' Price'],
						fill: this.props.styles.fill,
						lineTension: 0.1,
						backgroundColor: 'rgba(232,127,0,0.4)',
						borderColor: this.props.styles.color,
						pointBorderColor: this.props.styles.color,
						pointHoverBackgroundColor: this.props.styles.color,
						pointHoverBorderColor: 'rgba(220,220,220,1)',
						pointRadius: 1,
						pointHitRadius: 10,
						data: []
					}
				]
			}
		};

		this.handleCurrencyNavTypeClick = this.handleCurrencyNavTypeClick.bind(this);
		this.handleCurrencyNavTimeperiodClick = this.handleCurrencyNavTimeperiodClick.bind(this);
		this.handleShowNavClick = this.handleShowNavClick.bind(this);
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
		let symbol = event.currentTarget.dataset.symbol;

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

	handleShowNavClick() {
		this.setState({ showDropdownNav: !this.state.showDropdownNav });
	}

	handleCurrencyNavTimeperiodClick(event) {
		const time = event.target.dataset.period;

		this.setState({ currentTime: time }, () => {
			this.getChartData();
		});
	}

	componentDidMount() {
		let newState = { ...this.state.data };
		newState.datasets[0].label = `${this.props.currentCurrency.symbol} Price`;

		this.setState({ data: newState });

		this.getChartData();
		this.interval = setInterval(() => {
			this.getChartData();
		}, 60000);
	}

	getChartData() {
		let timeFrame;
		this.state.currentTime !== 'All' ? (timeFrame = `${this.state.currentTime}day/`) : (timeFrame = '');
		axios
			.get(`https://coincap.io/history/${timeFrame}${this.state.symbol}`)
			.then(results => {
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
			})
			.catch(error => {
				console.log('This coin does not have any history');
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

		let dropDownNavClasses;

		this.state.showDropdownNav
			? (dropDownNavClasses = 'currency--line--chart--custom--select--dropdown visible opacity transition')
			: (dropDownNavClasses = 'currency--line--chart--custom--select--dropdown');

		let currencyNav;
		if (this.props.currencies.length < 6) {
			currencyNav = (
				<ul className="currency--line--chart--navigation">
					{this.props.currencies.map((currency, index) => {
						let navClass;
						this.props.currentCurrency.symbol === currency.symbol
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
			);
		} else {
			let currentCurrency = this.props.currentCurrency;
			currencyNav = (
				<div className="currency--line--chart--select--container">
					<div className="currency--line--chart--custom--select" onClick={this.handleShowNavClick}>
						<div className="currency--line--chart--custom--select--selected">
							{currentCurrency.name} <i className="fa fa-chevron-down" aria-hidden="true" />
						</div>
						<div className={dropDownNavClasses}>
							<ul className="currency--line--chart--custom--list">
								{this.props.currencies.map(currency => {
									return (
										<li
											className="currency--custom--select--item"
											key={currency.id}
											data-symbol={currency.symbol}
											onClick={this.handleCurrencyNavTypeClick}
										>
											<div className="currency--custom--select--item--img">
												<img src={currency.img} alt={currency.name} />
											</div>
											<p className="currency--custom--select--item--name">
												{currency.name} ({currency.symbol})
											</p>
											<div className="currency--custom--select--item--price">
												<p>
													{currency.price}{' '}
													<span className="price--postfix">
														{this.props.localCurrency.currency}
													</span>
												</p>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			);
		}

		let lineChartOptions;
		if (this.props.isMobile) {
			lineChartOptions = {
				maintainAspectRatio: false,
				legend: false,
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
		} else {
			lineChartOptions = {
				maintainAspectRatio: false,
				scales: {
					xAxes: [
						{
							ticks: {
								autoSkip: true,
								maxTicksLimit: 2,
								minRotation: 0,
								maxRotation: 0,
								fontFamily: 'Montserrat'
							}
						}
					]
				}
			};
		}

		let lineChartMarkup;
		if (this.props.currentCurrency.price && this.props.currentCurrency.price !== 'NaN') {
			lineChartMarkup = (
				<div>
					<div className="currency--line--chart--header">
						{currencyNav}
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
						<Line data={this.state.data} height={400} responsive={true} options={lineChartOptions} />
					</div>
				</div>
			);
		} else {
			lineChartMarkup = <Spinner />;
		}

		return <div className="currency--line--chart--container">{lineChartMarkup}</div>;
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
