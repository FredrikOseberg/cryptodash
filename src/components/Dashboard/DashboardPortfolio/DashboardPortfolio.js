import React from 'react';
import DashboardPortfolioChart from './DashboardPortfolioChart/DashboardPortfolioChart';
import DashboardPortfolioActivityLog from './DashboardPortfolioActivityLog/DashboardPortfolioActivityLog';
import './dashboardportfolio.css';

const DashboardPortfolio = () => (
	<div className="dashboard--portfolio">
		<DashboardPortfolioChart />
		<DashboardPortfolioActivityLog />
	</div>
);

export default DashboardPortfolio;
