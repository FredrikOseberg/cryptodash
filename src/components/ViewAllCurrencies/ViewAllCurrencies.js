import React, { Component } from 'react';
import { connect } from 'react-redux';
import CurrencyTableData from './CurrencyTableData/CurrencyTableData';
import Spinner from '../Loading/Spinner/Spinner';
import axios from 'axios';
import { isMobile } from '../HoC/IsMobile';
import './viewallcurrencies.css';

class ViewAllCurrencies extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allCurrencies: this.props.allCurrencies,
			currentSet: [],
			currentIndex: 0,
			inputValue: '',
			gettingData: false
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.setNewDataSet = this.setNewDataSet.bind(this);
		this.setDataFetchInterval = this.setDataFetchInterval.bind(this);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll, false);

		document.body.style.height = 'auto';

		this.setState({ currentIndex: 50 }, () => {
			if (this.props.allCurrencies && this.props.allCurrencies.length > 0) {
				this.setNewDataSet(this.props.allCurrencies, this.state.currentIndex);
				this.setDataFetchInterval();
			} else {
				this.setDataFetchInterval();
			}
		});
	}

	setDataFetchInterval() {
		this.interval = setInterval(() => {
			axios.get('https://coincap.io/front').then(response => {
				this.setNewDataSet(response.data);
			});
		}, 5000);
	}

	getNewData() {
		this.setState({ loading: true }, () => {
			this.setState({ gettingData: true }, () => {
				let newIndex = this.state.currentIndex;
				newIndex += 50;
				this.setState({ currentIndex: newIndex }, () => {
					axios.get('https://coincap.io/front').then(response => {
						setTimeout(this.setNewDataSet(response.data), 2000);
					});
				});
			});
		});
	}

	setNewDataSet(dataSet, currentIndex = this.state.currentIndex) {
		let newState = [];
		let currentSetState = [];
		dataSet.forEach((currency, index) => {
			let newObj = { ...currency };
			newObj.rank = index + 1;
			newState.push(newObj);
			if (index < this.state.currentIndex) {
				currentSetState.push(newObj);
			}
		});
		this.setState({ allCurrencies: newState });
		this.setState({ currentSet: currentSetState }, () => {
			this.setState({ currentIndex: currentIndex });
		});
		this.setState({ gettingData: false });
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll, false);
		clearInterval(this.interval);
		document.body.style.height = '100%';
	}

	handleScroll() {
		let bottom;
		if (this.props.isMobile || this.props.landing) {
			bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
		} else {
			const sidebar = document.querySelector('.dashboard--sidebar ');

			bottom = sidebar.scrollTop === sidebar.scrollHeight - sidebar.offsetHeight;
		}

		if (bottom && this.state.gettingData === false) {
			this.getNewData();
		}
	}

	handleInputChange(event) {
		this.setState({ inputValue: event.target.value });
	}

	render() {
		let frontendClasses;
		let viewAllBoxClasses;
		if (this.props.currentUser.status === 'SIGNED_IN') {
			frontendClasses = '';
			viewAllBoxClasses = 'view--all--box view--all--box--dashboard';
		} else {
			frontendClasses = 'view--all--background';
			viewAllBoxClasses = 'view--all--box';
		}

		let currencyTableData;
		if (this.state.inputValue && this.state.currentSet.length > 0) {
			currencyTableData = this.state.allCurrencies
				.filter(currency => {
					return (
						`${currency.long} ${currency.short}`
							.toUpperCase()
							.indexOf(this.state.inputValue.toUpperCase()) >= 0
					);
				})
				.map(currency => {
					return (
						<CurrencyTableData
							rank={currency.rank}
							short={currency.short}
							long={currency.long}
							mktcap={currency.mktcap}
							price={currency.price}
							vwapData={currency.vwapData}
							supply={currency.supply}
							usdVolume={currency.usdVolume}
							perc={currency.perc}
							key={currency.short}
						/>
					);
				});
		} else {
			currencyTableData = this.state.currentSet.map(currency => {
				return (
					<CurrencyTableData
						rank={currency.rank}
						short={currency.short}
						long={currency.long}
						mktcap={currency.mktcap}
						price={currency.price}
						vwapData={currency.vwapData}
						supply={currency.supply}
						usdVolume={currency.usdVolume}
						perc={currency.perc}
						key={currency.short}
					/>
				);
			});
		}

		let allCoinsMarkup, spinner;
		if (this.state.gettingData) {
			spinner = <Spinner />;
		} else {
			spinner = '';
		}

		allCoinsMarkup = (
			<div>
				<div className={viewAllBoxClasses}>
					<div className="view--all--header">
						<h2>
							<i className="fa fa-search" aria-hidden="true" />
							Search for currencies
						</h2>
						<input className="main--input view--all--input" type="text" onChange={this.handleInputChange} />
					</div>
					<div className="view--all--table--headers">
						<div className="view--all--table--header--rank">Rank</div>
						<div className="view--all--table--header--name">Name</div>
						<div className="view--all--table--header--marketcap">Market Cap</div>
						<div className="view--all--table--header--price">Price</div>
						<div className="view--all--table--header--24hvwap">24hour VWAP</div>
						<div className="view--all--table--header--supply">Available Supply</div>
						<div className="view--all--table--header--volume">24 Hour Volume</div>
						<div className="view--all--table--header--percentage">%24hr</div>
						<div className="view--all--table--header--track">Track</div>
					</div>
				</div>
				{currencyTableData}
				{spinner}
			</div>
		);

		return (
			<div className={frontendClasses}>
				<div className="view--all">
					<h1>All Coins</h1>
					{allCoinsMarkup}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth
});

export default connect(mapStateToProps)(isMobile(ViewAllCurrencies));
