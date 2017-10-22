import React, { Component } from 'react';
import LineChart from '../../Dashboard/LineChart/LineChart';
import './mobilelinechart.css';

class MobileLineChart extends Component {
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
