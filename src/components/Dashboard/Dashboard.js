import React, { Component } from 'react';
import { database, auth } from '../../firebase';
import CurrencyStatCard from './CurrencyStatCard/CurrencyStatCard';
import CurrencyPortfolio from './CurrencyPortfolio/CurrencyPortfolio';
import Header from '../Header/Header';
import LineChart from './LineChart/LineChart';
import map from 'lodash/map';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstCurrencySymbol: null,
			currencies: []
		};
	}
	// Get the users currencies from the database and save it to component state
	componentDidMount() {
		const user = auth.currentUser;
		const databaseRef = database.ref('users/' + user.uid + '/currencies');
		databaseRef.on('value', snapshot => {
			const newCurrencyState = [];
			const currencies = snapshot.val();
			// Lodash Object Map
			map(currencies, currency => {
				newCurrencyState.push(currency);
			});
			this.setState({ currencies: newCurrencyState });
			this.setState({ firstCurrencySymbol: newCurrencyState[0].symbol });
		});
	}

	render() {
		return (
			<div className="dashboard">
				<Header />
				<div className="dashboard--navigation">
					<div className="container dashboard--container">
						<ul className="dashboard--navigation--list">
							<li className="dashboard--navigation--list--active">
								<i className="fa fa-tachometer" aria-hidden="true" />
								<p>Dashboard</p>
							</li>
							<li>
								<i className="fa fa-exchange" aria-hidden="true" />
								<p>Exchange</p>
							</li>
							<li>
								<i className="fa fa-cog" aria-hidden="true" />
								<p>Settings</p>
							</li>
						</ul>
					</div>
				</div>
				<div className="dashboard--content">
					<div className="container">
						<div className="dashboard--container">
							<div className="dashboard--content--chart">
								{this.state.firstCurrencySymbol ? (
									<LineChart
										symbol={this.state.firstCurrencySymbol}
										currencies={this.state.currencies}
									/>
								) : (
									''
								)}
							</div>
							<div className="dashboard--currency">
								<div className="dashboard--currency--container">
									{this.state.currencies.map(currency => {
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

								<CurrencyPortfolio currencies={this.state.currencies} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;