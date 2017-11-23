import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { deleteItemFromDBandState } from '../../../../common/helpers';
import { iosSafariCopy, copyText } from '../../../../common/helpers';
import { convertPriceToLocalCurrency } from '../../../../common/helpers';
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
			marketCap: 0,
			copySuccess: '',
			address: '',
			price: this.props.price,
			percentage: this.props.percentage
		};

		this.updateSecondaryInformation = this.updateSecondaryInformation.bind(this);
		this.sendAjaxRequestToGetSecondaryInformation = this.sendAjaxRequestToGetSecondaryInformation.bind(this);
		this.handleAddWallet = this.handleAddWallet.bind(this);
		this.handleStopTrackingClick = this.handleStopTrackingClick.bind(this);
		this.handleEllipsisClick = this.handleEllipsisClick.bind(this);
		this.handleListItemCopyClick = this.handleListItemCopyClick.bind(this);
	}

	componentDidMount() {
		this.sendAjaxRequestToGetSecondaryInformation();
		this.interval = setInterval(() => {
			this.sendAjaxRequestToGetSecondaryInformation();
		}, 8000);

		if (this.props.wallet) {
			this.setState({ address: this.props.wallet.wallet });
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	handleAddWallet() {
		this.props.handleAddWalletClick();
	}

	handleStopTrackingClick(event) {
		const symbol = event.target.dataset.symbol;
		deleteItemFromDBandState(symbol);
	}

	handleEllipsisClick() {
		this.setState({ clicked: !this.state.clicked });
	}

	handleListItemCopyClick(event) {
		let successMessage, successful;

		if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
			const input = document.querySelector('.currency--list--dropdown--menu--wallet--information--address');
			successful = iosSafariCopy(input);
			successMessage = successful ? `You successfully copied the ${this.props.name} wallet address.` : '';
		} else {
			successful = copyText(this.state.address);
		}

		if (successful) {
			successMessage = `You successfully copied the ${this.props.name} wallet address.`;
			this.setState({ copySuccess: successMessage }, () => {
				setTimeout(() => {
					this.setState({ copySuccess: '' });
				}, 3000);
			});
		}
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
		this.setState({ price: convertPriceToLocalCurrency(data.price) });
		this.setState({ percentage: data.cap24hrChange });

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

		let copySuccessMessage;
		if (this.state.copySuccess) {
			copySuccessMessage = (
				<span className="currency--list--dropdown--menu--copy--success">{this.state.copySuccess}</span>
			);
		} else {
			copySuccessMessage = '';
		}

		let walletMarkup;
		if (this.props.wallet) {
			walletMarkup = (
				<div className="currency--list--dropdown--menu--wallet--information">
					<div className="currency--list--dropdown--menu--wallet--information--container">
						<p className="currency--list--dropdown--menu--wallet--information--address">
							{this.props.wallet.wallet} {copySuccessMessage}
						</p>
						<div
							className="currency--list--dropdown--menu--wallet--copy"
							onClick={this.handleListItemCopyClick}
						>
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
						<div className="currency--list--dropdown--menu--wallet--add" onClick={this.handleAddWallet}>
							<i className="fa fa-plus" aria-hidden="true" />
						</div>
					</div>
				</div>
			);
		}

		let dropdownClasses;
		if (this.state.clicked) {
			dropdownClasses = 'currency--list--dropdown--menu opacity transition visible absolute';
		} else {
			dropdownClasses = 'currency--list--dropdown--menu';
		}
		return (
			<li>
				<div className={updatedClasses} />
				<img className="currency--list--item--image" src={this.props.img} alt={this.props.name} />
				<p className="currency--list--item--name">
					{this.props.name} ({this.props.symbol})
				</p>
				<p className={percentageClasses}>{this.state.percentage}%</p>
				<p className="currency--list--item--price">
					{this.state.price}
					<span className="price--postfix">{this.props.localCurrency.currency}</span>
				</p>
				<i className="fa fa-ellipsis-v" aria-hidden="true" onClick={this.handleEllipsisClick} />
				<div className={dropdownClasses}>
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
					<button
						className="currency--list--stop--tracking"
						onClick={this.handleStopTrackingClick}
						data-symbol={this.props.symbol}
					>
						Stop Tracking
					</button>
				</div>
			</li>
		);
	}
}

const mapStateToProps = state => ({
	localCurrency: state.localCurrency
});

export default connect(mapStateToProps)(CurrencyListItem);
