import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { database, auth } from '../../../../firebase';
import map from 'lodash/map';
import { connect } from 'react-redux';
import './dashboardportfoliopiechart.css';

class DashboardPortfolioPieChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			labels: []
		};

		this.getCurrencyData = this.getCurrencyData.bind(this);
		this.getFrequentData = this.getFrequentData.bind(this);
	}

	componentDidMount() {
		this.getCurrencyData().then(this.getFrequentData);
	}

	getFrequentData() {
		this.interval = setInterval(() => {
			this.getCurrencyData();
		}, 5000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getCurrencyData() {
		return new Promise(resolve => {
			const data = [],
				labels = [];
			this.props.currencies.forEach(currency => {
				if (currency.wallet && currency.price && currency.wallet.amount) {
					const amount = (+currency.wallet.amount * +currency.price).toFixed(2);

					if (+amount) {
						data.push(amount);
						labels.push(currency.name);
					}
				}
			});

			const databaseRef = database.ref(`/users/${auth.currentUser.uid}/currencies`);

			let noPortfolio = true;
			databaseRef.once('value', snapshot => {
				const currencies = snapshot.val();

				map(currencies, currency => {
					if (currency.wallet && currency.wallet.amount) {
						noPortfolio = false;
					}
				});
			});

			if (data.length === 0 && labels.length === 0 && noPortfolio) {
				data.push(300, 250, 450);
				labels.push('Bitcoin', 'Ethereum', 'Litecoin');
			}

			this.setState({ data });
			this.setState({ labels });
			resolve();
		});
	}

	render() {
		const data = {
			datasets: [
				{
					data: this.state.data,
					backgroundColor: 'rgb(85, 85, 152)'
				}
			],
			labels: this.state.labels
		};
		return (
			<div className="dashboard--portfolio--pie--chart">
				<Doughnut data={data} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currencies: state.selectedCurrencies
});

export default connect(mapStateToProps)(DashboardPortfolioPieChart);
