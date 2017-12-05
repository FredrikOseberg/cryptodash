import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
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
	}

	componentDidMount() {
		const data = [],
			labels = [];
		this.props.currencies.forEach(currency => {
			if (currency.wallet && currency.price && currency.wallet.amount) {
				const amount = (+currency.wallet.amount * +currency.price).toFixed(2);
				console.log(typeof amount);
				if (+amount) {
					data.push(amount);
					labels.push(currency.name);
				}
			}
		});

		this.setState({ data });
		this.setState({ labels });
	}

	render() {
		const data = {
			datasets: [
				{
					data: this.state.data
				}
			],
			backgroundColor: ['#fff'],
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
