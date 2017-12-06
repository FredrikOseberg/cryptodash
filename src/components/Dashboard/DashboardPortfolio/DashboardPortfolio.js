import React from 'react';
import DashboardPortfolioChart from './DashboardPortfolioChart/DashboardPortfolioChart';
import DashboardPortfolioPieChart from './DashboardPortfolioPieChart/DashboardPortfolioPieChart';
import DashboardPortfolioActivityLog from './DashboardPortfolioActivityLog/DashboardPortfolioActivityLog';
import DashboardPortfolioDistributionLog from './DashboardPortfolioDistributionLog/DashboardPortfolioDistributionLog';
import './dashboardportfolio.css';

const DashboardPortfolio = () => (
	<div className="dashboard--portfolio">
		<div className="dashboard--portfolio--primary--content">
			<DashboardPortfolioChart />
			<DashboardPortfolioActivityLog />
		</div>
		<div className="dashboard--portfolio--secondary--content">
			<DashboardPortfolioDistributionLog />
			<DashboardPortfolioPieChart />
		</div>
	</div>
);

export default DashboardPortfolio;
