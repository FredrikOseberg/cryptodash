import React from 'react';
import DashboardActivityLogListItem from './DashboardActivityLogListItem/DashboardActivityLogListItem';
import './dashboardportfolioactivitylog.css';

const DashboardPortfolioActivityLog = props => (
	<div className="dashboard--portfolio--activity--log">
		<ul>
			<DashboardActivityLogListItem eventType={'add'} />
			<DashboardActivityLogListItem eventType={'remove'} />
			<DashboardActivityLogListItem eventType={'add'} />
			<DashboardActivityLogListItem eventType={'add'} />
			<DashboardActivityLogListItem eventType={'remove'} />
			<DashboardActivityLogListItem eventType={'remove'} />
			<DashboardActivityLogListItem eventType={'add'} />
			<DashboardActivityLogListItem eventType={'remove'} />
			<DashboardActivityLogListItem eventType={'add'} />
			<DashboardActivityLogListItem eventType={'add'} />
			<DashboardActivityLogListItem eventType={'remove'} />
			<DashboardActivityLogListItem eventType={'remove'} />
		</ul>
	</div>
);

export default DashboardPortfolioActivityLog;
