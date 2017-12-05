import React, { Component } from 'react';
import { database, auth } from '../../../../firebase';
import DashboardActivityLogListItem from './DashboardActivityLogListItem/DashboardActivityLogListItem';
import DashboardPortfolioActivityLogPaginationButton from './DashboardPortfolioActivityLogPaginationButton/DashboardPortfolioActivityLogPaginationButton';
import map from 'lodash/map';
import './dashboardportfolioactivitylog.css';

class DashboardPortfolioActivityLog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			portfolioLog: [],
			pages: [],
			currentPage: ''
		};

		this.paginate = this.paginate.bind(this);
		this.getEventData = this.getEventData.bind(this);
		this.setDefaultPage = this.setDefaultPage.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
	}

	componentDidMount() {
		this.getEventData()
			.then(result => this.paginate(result, 8))
			.then(this.setDefaultPage);
	}

	getEventData() {
		return new Promise(resolve => {
			const databaseRef = database.ref(`/users/${auth.currentUser.uid}`);

			databaseRef.once('value', snapshot => {
				let portfolioLog = [];
				const events = snapshot.child('portfolioEvents').val();

				map(events, event => {
					const date = new Date(event.timestamp);
					event.timestamp = this.formatDate(date);

					portfolioLog.push(event);
				});

				portfolioLog = portfolioLog.reverse();

				this.setState({ portfolioLog });
				resolve(portfolioLog);
			});
		});
	}

	paginate(items, numberOfItemsPerPage) {
		let pageNumber = 1,
			pageItems = [];
		const portfolioLog = this.state.portfolioLog,
			pages = [];

		const addPage = portfolioLog => {
			const page = this.setPageInfo(`page-${pageNumber}`, pageNumber, pageItems);
			pages.push(page);
		};

		portfolioLog.forEach((log, index) => {
			const numberOfReposDoesNotEqualMaxItems = (index + 1) % numberOfItemsPerPage !== 0;

			if (numberOfReposDoesNotEqualMaxItems) {
				pageItems.push(log);
			} else {
				pageItems.push(log);

				addPage(pageItems);

				pageItems = [];
				pageNumber += 1;
			}

			const endOfArray = index === portfolioLog.length - 1;
			if (endOfArray) {
				const pageItemsNotEmpty = pageItems.length !== 0;
				if (pageItemsNotEmpty) {
					addPage(pageItems);
				}
			}
		});

		this.setState({ pages });
	}

	setPageInfo(pageName, pageNumber, pages) {
		let page = {
			data: pages,
			pageNumber,
			name: pageName
		};

		return page;
	}

	setDefaultPage() {
		const firstPage = this.state.pages[0];
		this.setState({ currentPage: firstPage });
	}

	handlePageChange(pageName) {
		const pages = this.state.pages;

		pages.forEach(page => {
			if (page.name === pageName) {
				this.setState({ currentPage: page });
			}
		});
	}

	formatDate(date) {
		let month = date.getMonth();
		let day = date.getDay();
		const year = date.getFullYear();

		if (month < 10) {
			month = month.toString().split('');

			month.unshift('0');
			month = month.join('');
		}

		if (day < 10) {
			day = day.toString().split('');

			day.unshift('0');
			day = day.join('');
		}

		return `${day}/${month}/${year}`;
	}

	render() {
		return (
			<div className="dashboard--portfolio--activity--log">
				<h1>Portfolio Activity Log</h1>
				<ul>
					{this.state.currentPage &&
						this.state.currentPage.data.map(logEvent => {
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
				<div className="dashboard--portfolio--activity--log--pagination--buttons">
					{this.state.pages.map(page => {
						return (
							<DashboardPortfolioActivityLogPaginationButton
								pageNumber={page.pageNumber}
								name={page.name}
								handlePageChange={this.handlePageChange}
								currentPage={this.state.currentPage}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default DashboardPortfolioActivityLog;
