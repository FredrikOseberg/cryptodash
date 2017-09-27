import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { database, auth } from '../../firebase';
import { addCurrency, clearCurrency } from '../../actions/currencies';
import { addCurrentCurrency } from '../../actions/currentCurrency';
import CurrencyStatCard from './CurrencyStatCard/CurrencyStatCard';
import CurrencyPortfolio from './CurrencyPortfolio/CurrencyPortfolio';
import Header from '../Header/Header';
import LineChart from './LineChart/LineChart';
import Loading from '../Loading/Loading';
import map from 'lodash/map';

class Dashboard extends Component {
	// Get the users currencies from the database and save it to component state
	constructor(props) {
		super(props);

		this.interval;

		this.state = {
			loading: true,
			showDashboard: false,
			firstload: true
		};

		this.addCurrenciesToState = this.addCurrenciesToState.bind(this);
		this.getCurrentCurrency = this.getCurrentCurrency.bind(this);
	}
	componentDidMount() {
		if (this.state.firstload) {
			this.props.clearCurrencyFromState();
			this.addCurrenciesToState().then(() => {
				this.getCurrentCurrency(this.props.currencies[0].symbol);
				this.interval = setInterval(() => {
					this.getCurrentCurrency(this.props.currentCurrency.symbol);
				}, 5000);
				this.setState({ firstload: false });
			});
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getCurrentCurrency(symbol) {
		axios.get(`http://coincap.io/page/${symbol}`).then(response => {
			this.setState({ loading: false });
			this.setState({ showDashboard: true });
			const obj = {
				name: response.data.display_name,
				price: response.data.price_usd,
				symbol: response.data.id,
				percentage: response.data.cap24hrChange,
				id: response.data._id
			};
			this.props.addCurrentCurrencyToState(obj);
		});
	}

	addCurrenciesToState() {
		return new Promise(resolve => {
			const user = auth.currentUser;
			const databaseRef = database.ref('users/' + user.uid + '/currencies');
			databaseRef.on('value', snapshot => {
				const currencies = snapshot.val();
				// Lodash Object Map
				map(currencies, currency => {
					this.props.addCurrencyToState({ payload: currency });
				});
				resolve();
			});
		});
	}

	render() {
		const dashboard = (
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
								{this.props.firstCurrency ? (
									<LineChart
										symbol={this.props.firstCurrency.symbol}
										getCurrentCurrency={this.getCurrentCurrency}
									/>
								) : (
									''
								)}
							</div>
							<div className="dashboard--currency">
								<div className="dashboard--currency--container">
									{this.props.currencies.map(currency => {
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

								<CurrencyPortfolio currencies={this.props.currencies} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
		return (
			<div>
				{this.state.loading && <Loading />}
				{this.state.showDashboard && dashboard}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currencies: state.selectedCurrencies,
	firstCurrency: state.selectedCurrencies[0],
	currentCurrency: state.currentCurrency
});

const mapDispatchToProps = dispatch => ({
	addCurrencyToState(obj) {
		dispatch(addCurrency(obj));
	},
	addCurrentCurrencyToState(obj) {
		dispatch(addCurrentCurrency(obj));
	},
	clearCurrencyFromState() {
		dispatch(clearCurrency());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
