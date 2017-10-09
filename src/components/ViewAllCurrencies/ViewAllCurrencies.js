import React, { Component } from 'react';
import { connect } from 'react-redux';
import CurrencyTableData from './CurrencyTableData/CurrencyTableData';
import axios from 'axios';
import './viewallcurrencies.css';

class ViewAllCurrencies extends Component {
	constructor(props) {
		super(props);

		this.interval;

		this.state = {
			allCurrencies: this.props.allCurrencies,
			currentSet: [],
			currentIndex: 50,
			inputValue: '',
			loading: true
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			axios.get('http://coincap.io/front').then(response => {
				let newState = [];
				let currentSetState = [];
				response.data.forEach((currency, index) => {
					let newObj = { ...currency };
					newObj.rank = index + 1;
					newState.push(newObj);
					if (index < this.state.currentIndex) {
						currentSetState.push(newObj);
					}
				});
				this.setState({ allCurrencies: newState });
				this.setState({ currentSet: currentSetState }, () => {
					this.setState({ currentIndex: 100 });
					this.setState({ loading: false });
				});
			});
		}, 5000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
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
			frontendClasses = 'frontend--background';
			viewAllBoxClasses = 'view--all--box';
		}

		let currencyTableData;
		if (this.state.inputValue) {
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
		return (
			<div className={frontendClasses}>
				<div className="view--all">
					<div className={viewAllBoxClasses}>
						<div className="view--all--header">
							<h1>All Coins</h1>
							<h2>
								<i className="fa fa-search" aria-hidden="true" />
								Search for currencies
							</h2>
							<input
								className="main--input view--all--input"
								type="text"
								onChange={this.handleInputChange}
							/>
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
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth
});

export default connect(mapStateToProps)(ViewAllCurrencies);
