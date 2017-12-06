import React from 'react';
import './dashboardportfolioinformation.css';

const DashboardPortfolioInformation = () => (
	<div className="dashboard--portfolio--information">
		<div className="dashboard--portfolio--information--icon">
			<i className="fa fa-exclamation-triangle" aria-hidden="true" />
		</div>
		<div className="dashboard--portfolio--information--container">
			<h1>Important Information</h1>
			<div className="dashboard--portfolio--information--paragraph--container">
				<p>The data below is not yet representative of your portfolio.</p>
				<p>
					Once you add your own data, the graph will use dummy data until you have at least two data points.
				</p>
			</div>
		</div>
		<div className="dashboard--portfolio--add">
			<button className="dashboard--portfolio--add--button">+</button>
		</div>
	</div>
);

export default DashboardPortfolioInformation;
