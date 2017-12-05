import React, { Component } from 'react';
import { database, auth } from '../../../../firebase';
import DashboardActivityLogListItem from './DashboardActivityLogListItem/DashboardActivityLogListItem';
import map from 'lodash/map';
import './dashboardportfolioactivitylog.css';

class DashboardPortfolioActivityLog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			portfolioLog: []
		};
	}

	componentDidMount() {
		const databaseRef = database.ref(`/users/${auth.currentUser.uid}`);

		databaseRef.once('value', snapshot => {
			const portfolioLog = [];
			const events = snapshot.child('portfolioEvents').val();

			map(events, event => {
				const date = new Date(event.timestamp);
				event.timestamp = this.formatDate(date);

				portfolioLog.push(event);
			});

			this.setState({ portfolioLog });
		});
	}

	formatDate(date) {
		let month = date.getMonth();
		let day = date.getDay();
		const year = date.getFullYear();

		console.log(typeof month);

		if (month < 10) {
			month = month.toString().split('');

			month.unshift('0');
			month = month.join('');
		}

		if (day > 10) {
			day = day.toString().split('');

			day.unshift('0');
			day = day.join('');
		}

		return `${day}/${month}/${year}`;
	}

	render() {
		return (
			<div className="dashboard--portfolio--activity--log">
				<ul>
					{this.state.portfolioLog.map(logEvent => {
						return (
							<DashboardActivityLogListItem
								eventType={logEvent.type}
								name={logEvent.coinName}
								img={logEvent.img}
								timestamp={logEvent.timestamp}
								amount={logEvent.amount}
							/>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default DashboardPortfolioActivityLog;
