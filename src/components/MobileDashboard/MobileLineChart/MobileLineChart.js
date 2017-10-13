import React, { Component } from 'react';
import LineChart from '../../Dashboard/LineChart/LineChart';
import { Line } from 'react-chartjs-2';
import './mobilelinechart.css';

class MobileLineChart extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const lineChartStyle = {
			color: '#fff',
			fill: false
		};
		return (
			<div className="mobile--chart">
				<LineChart getCurrentCurrency={this.props.getCurrentCurrency} styles={lineChartStyle} isMobile={true} />
			</div>
		);
	}
}

export default MobileLineChart;
