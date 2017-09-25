import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPrice } from '../../../actions/currencies';
import axios from 'axios';

class CurrencyStatCard extends Component {
	constructor(props) {
		super(props);

		this.interval;

		this.state = {
			price: 0,
			percentage: 0
		};

		this.getCoinData = this.getCoinData.bind(this);
	}

	componentDidMount() {
		this.getCoinData();
		this.interval = setInterval(() => {
			this.getCoinData();
		}, 10000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getCoinData() {
		axios.get(`http://coincap.io/page/${this.props.symbol}`).then(response => {
			this.props.addCurrencyPriceToState({
				price: response.data.price_usd,
				percentage: response.data.cap24hrChange,
				symbol: response.data.id
			});

			this.setState({ price: response.data.price_usd });
			this.setState({ percentage: response.data.cap24hrChange });
		});
	}

	render() {
		let percentageClasses;
		this.state.percentage > 0
			? (percentageClasses = 'currency--stat--percentage currency--stat--percentage--positive')
			: (percentageClasses = 'currency--stat--percentage currency--stat--percentage--negative');
		return (
			<div className="currency--stat--card">
				<img src={this.props.img} alt={this.props.name} />
				<div className="currency--stat--info">
					<h3>{this.props.name}</h3>
					<p>
						%24hr: <span className={percentageClasses}>{this.state.percentage}%</span>
					</p>
				</div>
				<span className="currency--stat--card--price">{this.state.price.toFixed(2)}</span>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	addCurrencyPriceToState(obj) {
		dispatch(addPrice(obj));
	}
});

export default connect(null, mapDispatchToProps)(CurrencyStatCard);
