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
			allCurrencies: [],
			inputValue: ''
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			axios.get('http://coincap.io/front').then(response => {
				let newState = [];
				response.data.forEach((currency, index) => {
					let newObj = { ...currency };
					newObj.rank = index + 1;
					newState.push(newObj);
				});
				this.setState({ allCurrencies: newState });
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
		const currencyTableData = this.state.allCurrencies
			.filter(currency => {
				return (
					`${currency.long} ${currency.short}`.toUpperCase().indexOf(this.state.inputValue.toUpperCase()) >= 0
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
		return (
			<div className={frontendClasses}>
				<div className="view--all">
					<div className={viewAllBoxClasses}>
						<div className="view--all--header">
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
						<table className="view--all--table">
							<thead>
								<tr>
									<th>Rank</th>
									<th>Name</th>
									<th>Market Cap</th>
									<th>Price</th>
									<th>24hour VWAP</th>
									<th>Available Supply</th>
									<th>24 Hour Volume</th>
									<th>%24hr</th>
									<th>Track</th>
								</tr>
							</thead>
							<tbody>{currencyTableData}</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth
});

export default connect(mapStateToProps)(ViewAllCurrencies);
