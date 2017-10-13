import React, { Component } from 'react';
import MobileLineChart from './MobileLineChart/MobileLineChart';
import { connect } from 'react-redux';
import './mobiledashboard.css';

class MobileDashboard extends Component {
	constructor(props) {
		super(props);

		this.interval;

		this.state = {
			currentCurrency: false
		};
	}

	componentDidMount() {
		this.props.addCurrenciesToState().then(() => {
			if (this.props.currencies.length > 0) {
				this.props.getCurrentCurrency(this.props.currencies[0].symbol).then(() => {
					this.setState({ currentCurrency: true });
				});

				this.interval = setInterval(() => {
					this.props.getCurrentCurrency(this.props.currentCurrency.symbol);
				}, 5000);
			}
		});
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		let showLineChart = this.state.currentCurrency;

		return (
			<div className="mobile--dashboard">
				{showLineChart && <MobileLineChart getCurrentCurrency={this.props.getCurrentCurrency} />}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currencies: state.selectedCurrencies,
	currentCurrency: state.currentCurrency
});

export default connect(mapStateToProps)(MobileDashboard);
