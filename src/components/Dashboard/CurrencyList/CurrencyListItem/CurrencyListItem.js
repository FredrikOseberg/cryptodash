import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './currencylistitem.css';

class CurrencyListItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clicked: false,
			newData: false,
			supply: 0,
			volume: 0,
			usdPrice: 0,
			marketCap: 0
		};

		this.updateSecondaryInformation = this.updateSecondaryInformation.bind(this);
		this.sendAjaxRequestToGetSecondaryInformation = this.sendAjaxRequestToGetSecondaryInformation.bind(this);
	}

	componentDidMount() {
		this.sendAjaxRequestToGetSecondaryInformation();
		this.interval = setInterval(() => {
			this.sendAjaxRequestToGetSecondaryInformation();
		}, 8000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	sendAjaxRequestToGetSecondaryInformation() {
		axios
			.get(`https://coincap.io/page/${this.props.symbol}`)
			.then(this.updateSecondaryInformation)
			.catch(err => {
				console.log(err);
			});
	}

	updateSecondaryInformation(response) {
		let data = response.data;
		this.setState({ supply: data.supply });
		this.setState({ volume: data.volume });
		this.setState({ usdPrice: data.price });
		this.setState({ marketCap: data.market_cap });

		this.setState({ newData: true }, () => {
			setTimeout(() => {
				this.setState({ newData: false });
			}, 1500);
		});
	}

	componentWillReceiveProps(props) {
		this.setState({ newData: true }, () => {
			setTimeout(() => {
				this.setState({ newData: false });
			}, 1500);
		});
	}

	render() {
		let percentageClasses;
		if (this.props.percentage > 0) {
			percentageClasses = 'currency--list--item--percentage currency--list--item--percentage--positive';
		} else {
			percentageClasses = 'currency--list--item--percentage currency--list--item--percentage--negative';
		}

		let updatedClasses;
		if (this.state.newData) {
			updatedClasses = 'currency--list--item--updated opacity transition';
		} else {
			updatedClasses = 'currency--list--item--updated';
		}

		let walletMarkup;
		if (this.props.wallet) {
			walletMarkup = (
				<div className="currency--list--dropdown--menu--wallet--information">
					<div className="currency--list--dropdown--menu--wallet--information--container">
						<p>{this.props.wallet.wallet}</p>
						<div className="currency--list--dropdown--menu--wallet--copy">
							<i className="fa fa-copy" aria-hidden="true" />
						</div>
					</div>
				</div>
			);
		} else {
			walletMarkup = (
				<div className="currency--list--dropdown--menu--wallet--information">
					<div className="currency--list--dropdown--menu--wallet--information--container">
						<p>No wallet information to display.</p>
						<div
							className="currency--list--dropdown--menu--wallet--add"
							onClick={this.props.handleAddWalletClick}
						>
							<i className="fa fa-plus" aria-hidden="true" />
						</div>
					</div>
				</div>
			);
		}
		return (
			<li>
				<div className={updatedClasses} />
				<img className="currency--list--item--image" src={this.props.img} alt={this.props.name} />
				<p className="currency--list--item--name">
					{this.props.name} ({this.props.symbol})
				</p>
				<p className={percentageClasses}>{this.props.percentage}%</p>
				<p className="currency--list--item--price">
					{this.props.price}
					<span className="price--postfix">{this.props.localCurrency.currency}</span>
				</p>
				<i className="fa fa-ellipsis-v" aria-hidden="true" />
				<div className={`currency--list--dropdown--menu currency--list--dropdown--menu--${this.props.name}`}>
					<div className="currency--list--dropdown--menu--header">
						<h3>{this.props.name} Information</h3>
					</div>
					<div className="currency--list--dropdown--menu--information">
						<ul>
							<li>
								<p>Supply</p>
								<p>{this.state.supply}</p>
							</li>
							<li>
								<p>Volume</p>
								<p>{this.state.volume}</p>
							</li>
							<li>
								<p>Market Cap (USD)</p>
								<p>{this.state.marketCap}</p>
							</li>
							<li>
								<p>Price in USD</p>
								<p className="currency--list--dropdown--menu--information--price">
									{this.state.usdPrice}
									<span className="price--postfix">USD</span>
								</p>
							</li>
						</ul>
					</div>
					<div className="currency--list--dropdown--wallet--information">
						<h3>{this.props.name} Wallet</h3>
						{walletMarkup}
					</div>
					<button className="currency--list--stop--tracking">Stop Tracking</button>
				</div>
			</li>
		);
	}
}

const mapStateToProps = state => ({
	localCurrency: state.localCurrency
});

export default connect(mapStateToProps)(CurrencyListItem);
