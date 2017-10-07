import React, { Component } from 'react';
import { getExchangeAmount, getMinAmount } from '../../../api/api';
import { connect } from 'react-redux';
import './confirmamounts.css';

class ConfirmAmounts extends Component {
	constructor(props) {
		super(props);

		this.interval;

		this.state = {
			exchangeAmount: 0,
			minAmountChecked: false,
			showTooltip: false
		};

		this.getExchangeAmountResult = this.getExchangeAmountResult.bind(this);
		this.handleMinAmountClick = this.handleMinAmountClick.bind(this);
		this.handleTooltipHover = this.handleTooltipHover.bind(this);
		this.handleTooltipExit = this.handleTooltipExit.bind(this);
	}

	componentDidMount() {
		this.getExchangeAmountResult();
		this.interval = setInterval(() => {
			this.getExchangeAmountResult();
		}, 5000);
	}

	handleMinAmountClick() {
		this.setState({ minAmountChecked: !this.state.minAmountChecked });
	}

	handleTooltipHover() {
		console.log('running');
		this.setState({ showTooltip: true });
	}

	handleTooltipExit() {
		this.setState({ showTooltip: false });
	}

	getExchangeAmountResult() {
		getExchangeAmount(
			this.props.exchange.fromCurrency.symbol,
			this.props.exchange.toCurrency.symbol,
			this.props.exchange.amount
		).then(response => {
			this.setState({ exchangeAmount: Number(response.data.result).toFixed(4) });
		});
	}

	render() {
		let checkboxClasses, nextButtonClasses, tooltipClasses;
		const fromCurrency = this.props.exchange.fromCurrency;
		const toCurrency = this.props.exchange.toCurrency;
		if (this.state.minAmountChecked) {
			checkboxClasses = 'minimum--amount--confirm--box minimum--amount--confirm--box--checked';
			nextButtonClasses = 'main-button minimum--amount--button visible static opacity transition';
		} else {
			checkboxClasses = 'minimum--amount--confirm--box';
			nextButtonClasses = 'main-button minimum--amount--button';
		}
		this.state.showTooltip
			? (tooltipClasses = 'minimum--amount--tooltip visible opacity')
			: (tooltipClasses = 'minimum--amount--tooltip');
		console.log(tooltipClasses);
		console.log(this.state.showTooltip);
		return (
			<div className="exchange--confirm--amounts">
				<h3>You have chosen to exchange</h3>
				<div className="exchange--confirm--amounts--currency--container">
					<div className="exchange--confirm--amounts--currency">
						<h4>From</h4>
						<img src={fromCurrency.img} name={fromCurrency.name} />
						<p>{fromCurrency.name}</p>
						<p className="exchange--confirm--amounts--amount">
							Send: {this.props.exchange.amount} {fromCurrency.symbol.toUpperCase()}
						</p>
					</div>
					<div className="exchange--confirm--amounts--exchange--icon">
						<i className="fa fa-exchange" />
					</div>
					<div className="exchange--confirm--amounts--currency">
						<h4>To</h4>
						<img src={toCurrency.img} name={toCurrency.name} />
						<p>{toCurrency.name}</p>
						<p className="exchange--confirm--amounts--amount">
							Receive: {this.state.exchangeAmount} {toCurrency.symbol.toUpperCase()}
						</p>
					</div>
				</div>
				<div className="exchange--confirm--amounts--minimum--amount">
					<h3
						className="exchange--confirm--amounts--header"
						onMouseEnter={this.handleTooltipHover}
						onMouseLeave={this.handleTooltipExit}
					>
						Minimum Exchange Amount
						<div className="exchange--confirm--amounts--tooltip--question">
							<i className="fa fa-question" />
						</div>
						<div className={tooltipClasses}>
							<p>
								The minimum amount represents the minimum amount you have to send in order for the
								transfer to take place. Changelly, the provider of this API set this requirement as part
								of using their service. If you send less than the minimum amount you may loose the
								cryptocurrency you send.
							</p>
						</div>
					</h3>
					<div className="exchange--confirm--amounts--minimum--amount--container">
						<label>Minimum Exchange Amount</label>
						<input
							className="main--input main--input--error"
							disabled
							value={this.props.exchange.minAmount}
						/>
						<div className="exchange--confirm--minimum--amount--checkbox">
							<div className="minimum--amount--confirm--box--container">
								<div className={checkboxClasses} onClick={this.handleMinAmountClick}>
									<i className="fa fa-check" />
								</div>
							</div>
							<p>
								By checking this box I understand that if I send less than the minimum amount, I might
								loose the amount I send.
							</p>
						</div>
					</div>
					<div className={nextButtonClasses}>Next</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	exchange: state.exchange
});

export default connect(mapStateToProps)(ConfirmAmounts);
