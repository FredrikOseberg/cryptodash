import React from 'react';
import { connect } from 'react-redux';
import './dashboardportfoliodistributionloglistitem.css';

const DashboardPortfolioDistributionLogListItem = props => (
	<li className="dashboard--portfolio--distribution--log--list--item">
		<div className="dashboard--portfolio--distribution--log--icon">
			<i className="fa fa-pie-chart" aria-hidden="true" />
		</div>
		<div className="dashboard--portfolio--distribution--log--coin">
			<img src={props.img} alt={props.name} />
			{props.name}
		</div>
		<div className="dashboard--portfolio--distribution--log--amount">
			{props.amount.toFixed(2)}
			<span className="price--postfix">{props.localCurrency.currency}</span>
		</div>
		<div className="dashboard--portfolio--distribution--log--percentage">{props.distributionPerc.toFixed(2)}%</div>
	</li>
);

const mapStateToProps = state => ({
	localCurrency: state.localCurrency
});

export default connect(mapStateToProps)(DashboardPortfolioDistributionLogListItem);
