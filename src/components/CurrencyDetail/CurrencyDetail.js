import React, { Component } from 'react';
import Header from '../Header/Header';
import LineChart from '../Dashboard/LineChart/LineChart';
import { addCurrentCurrency } from '../../actions/currentCurrency';
import { connect } from 'react-redux';
import axios from 'axios';
import './currencydetails.css';

class CurrencyDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currencyObject: {}
		};

		this.getCoinData = this.getCoinData.bind(this);
	}

	componentDidMount() {
		this.getCoinData();
	}

	getCoinData() {
		axios.get(`https://coincap.io/page/${this.props.match.params.currency.toUpperCase()}`).then(response => {
			let coinData = {
				price: response.data.price,
				perc: response.data.cap24hrChange,
				name: response.data.displayName,
				symbol: response.data.id,
				id: response.data._id
			};
			this.setState({ currencyObject: coinData });
			this.props.addCurrentCurrencyToState(coinData);
		});
	}

	render() {
		const lineChartStyle = {
			color: '#fff',
			fill: false
		};
		return (
			<div className="currency--detail">
				<Header frontend={true} />
				<div className="currency--detail--container">
					{this.props.currentCurrency && <LineChart styles={lineChartStyle} />}
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	addCurrentCurrencyToState(obj) {
		dispatch(addCurrentCurrency(obj));
	}
});

const mapStateToProps = state => ({
	currentCurrency: state.currentCurrency
});

export default connect(null, mapDispatchToProps)(CurrencyDetail);
