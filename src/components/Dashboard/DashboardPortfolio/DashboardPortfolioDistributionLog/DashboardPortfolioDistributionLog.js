import React, { Component } from 'react';
import { database, auth } from '../../../../firebase';
import { connect } from 'react-redux';
import DashboardPortfolioActivityLogPaginationButton from '../DashboardPortfolioActivityLog/DashboardPortfolioActivityLogPaginationButton/DashboardPortfolioActivityLogPaginationButton';
import DashboardPortfolioDistributionLogListItem from './DashboardPortfolioDistributionLogListItem/DashboardPortfolioDistributionLogListItem';
import dummyData from '../../../../dummyData/portfolioDistributionDummyData';
import map from 'lodash/map';
import './dashboardportfoliodistributionlog.css';

class DashboardPortfolioDistributionLog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			distributionLog: [],
			pages: [],
			currentPage: ''
		};

		this.paginate = this.paginate.bind(this);
		this.getCurrencyData = this.getCurrencyData.bind(this);
		this.setDefaultPage = this.setDefaultPage.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.getFrequentData = this.getFrequentData.bind(this);
	}

	componentDidMount() {
		this.getCurrencyData()
			.then(result => this.paginate(result, 8))
			.then(this.setDefaultPage)
			.then(this.getFrequentData);
	}

	getFrequentData() {
		this.interval = setInterval(() => {
			this.getCurrencyData()
				.then(result => this.paginate(result, 8))
				.then(() => {
					this.state.pages.forEach((page, index) => {
						if (page.pageNumber === this.state.currentPage.pageNumber) {
							this.setState({ currentPage: this.state.pages[index] });
						}
					});
				});
		}, 4000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getCurrencyData() {
		return new Promise(resolve => {
			let portfolioLog = [];

			this.props.currencies.forEach(currency => {
				if (currency.wallet && currency.wallet.amount && currency.price && currency.wallet.amount > 0) {
					currency.totalPercentage =
						currency.price * currency.wallet.amount / this.props.portfolio.totalVal * 100;

					currency.totalVal = currency.price * currency.wallet.amount;
					portfolioLog.push(currency);
				}
			});

			const databaseRef = database.ref(`/users/${auth.currentUser.uid}/currencies`);

			let noPortfolio = true;
			databaseRef.once('value', snapshot => {
				const currencies = snapshot.val();

				map(currencies, currency => {
					if (currency.wallet && currency.wallet.amount) {
						noPortfolio = false;
					}
				});
			});

			if (portfolioLog.length === 0 && noPortfolio) {
				portfolioLog = dummyData;
			}

			this.setState({ portfolioLog });
			resolve(portfolioLog);
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

		if (items.length === 0) {
			addPage();
		}

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

	render() {
		let listClasses;

		if (this.state.pages.length >= 2) {
			listClasses =
				'dashboard--portfolio--activity--log dashboard--portfolio--distribution--log dashboard--portfolio--distribution--log--fixed--height';
		} else {
			listClasses = 'dashboard--portfolio--activity--log dashboard--portfolio--distribution--log';
		}

		return (
			<div className={listClasses}>
				<h1>Portfolio Distribution</h1>
				<ul>
					{this.state.currentPage &&
						this.state.currentPage.data.map(coin => {
							return (
								<DashboardPortfolioDistributionLogListItem
									name={coin.name}
									img={coin.img}
									key={coin.id}
									amount={coin.totalVal}
									distributionPerc={coin.totalPercentage}
								/>
							);
						})}
				</ul>
				<div className="dashboard--portfolio--activity--log--pagination--buttons">
					{this.state.pages.length > 1 &&
						this.state.pages.map(page => {
							return (
								<DashboardPortfolioActivityLogPaginationButton
									pageNumber={page.pageNumber}
									name={page.name}
									key={page.pageNumber}
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

const mapStateToProps = state => ({
	currencies: state.selectedCurrencies,
	portfolio: state.portfolio
});

export default connect(mapStateToProps)(DashboardPortfolioDistributionLog);
