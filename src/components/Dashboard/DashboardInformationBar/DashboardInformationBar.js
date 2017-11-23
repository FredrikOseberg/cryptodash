import React from 'react';
import bitcoin from '../../../img/coins/bitcoin.png';
import { connect } from 'react-redux';
import './dashboardinformationbar.css';

const DashboardInformationBar = props => {
	const globalData = props.globalData;
	return (
		<div className="dashboard--information--bar">
			<div className="dashboard--information--bar--container">
				<div className="dashboard--information--bar--bitcoin--price">
					<h3 className="dashboard--information--bar--bitcoin--price--header dashboard--information--bar--header">
						Bitcoin Price
					</h3>
					<div className="dashboard--information--bar--bitcoin--price--container">
						<img src={bitcoin} alt="bitcoin" />
						<div className="dashboard--information--bar--bitcoin--prices">
							<p>
								{Number(globalData.btcPrice).toFixed(2)}
								<span className="price--postfix">USD</span>
							</p>
							<p>
								{globalData.btcPriceLocal}
								<span className="price--postfix">{props.localCurrency.currency}</span>
							</p>
						</div>
					</div>
				</div>

				<div className="dashboard--information--bar--bitcoin--cap">
					<h3 className="dashboard--information--bar--bitcoin--cap--header dashboard--information--bar--header">
						Bitcoin Cap
					</h3>
					<div className="dashboard--information--bar--bitcoin--cap--container">
						<p>
							{Number(globalData.btcCapUSD).toFixed(2)}
							<span className="price--postfix">USD</span>
						</p>
						<p>
							{globalData.btcCapLocal}
							<span className="price--postfix">{props.localCurrency.currency}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	localCurrency: state.localCurrency
});

export default connect(mapStateToProps)(DashboardInformationBar);
