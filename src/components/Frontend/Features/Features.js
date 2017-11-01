import React, { Component } from 'react';
import featuresDash from '../../../img/featuresDashboard.png';
import SampleCurrency from './SampleCurrency/SampleCurrency';
import OrderDetails from './OrderDetails/OrderDetails';
import axios from 'axios';
import './features.css';

class Features extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currencyTickers: ['BTC', 'ETH', 'DOGE', 'NEO', 'GNO']
		};
	}

	render() {
		return (
			<div className="frontend--features">
				<h1>Features</h1>
				<div className="frontend--features--track">
					<div className="frontend--features--track--header">
						<i className="fa fa-line-chart" aria-hidden="true" />
						<h3>Track</h3>
					</div>
					<div className="frontend--features--container">
						<div className="frontend--features--track--box--container">
							<div className="features--box--currency features--box--currency--bitcoin">
								<i className="cc BTC" />
							</div>
							<div className="features--box--currency features--box--currency--ethereum">
								<i className="cc ETH" />
							</div>
							<div className="features--box--currency features--box--currency--neo">
								<i className="cc NEO" />
							</div>
							<div className="features--box--currency features--box--currency--gno">
								<i className="cc GNO" />
							</div>
							<div className="features--box--currency features--box--currency--doge">
								<i className="cc DOGE-alt" />
							</div>
							<div className="frontend--features--track--box">
								<div className="frontend--features--track--box--left--handle" />
								<div className="frontend--features--track--box--right--handle" />
								<h3>Cryptodasher</h3>
							</div>
						</div>
						<div className="frontend--features--track--information">
							<img src={featuresDash} alt="Dashboard" className="frontend--track--img" />
							<p>
								Track over 800 different cryptocurrencies, and select only the ones you care about. Your
								dashboard will only be populated with the currencies you choose to follow, and you can
								add or remove currencies at any time.
							</p>
							<div className="frontend--features--track--sample--currencies">
								<ul className="frontend--features--track--sample--list">
									{this.state.currencyTickers.map(item => {
										return <SampleCurrency ticker={item} key={item} />;
									})}
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="frontend--features--currency">
					<div className="frontend--features--currency--header">
						<i className="fa fa-money" aria-hidden="true" />
						<h3>Track in your own currency</h3>
					</div>
					<div className="frontend--features--currency--container">
						<div className="frontend--features--currency--information">
							<p>
								If following cryptocurrencies in foreign currencies doesn't make sense to you, do not
								fear. You can easily track cryptocurrencies in your own local currency. Cryptodasher
								supports over 30 fiat currencies including USD, EUR, SEK, NOK, TRY, RUB, SGD, JPY and
								many, many more.
							</p>
							<button className="frontend--features--currency--information--button">
								Start Tracking
							</button>
						</div>
						<div className="frontend--features--currency--stickman">
							<div className="stickman--head" />
							<div className="stickman--body">
								<i className="fa fa-globe" aria-hidden="true" />
								<div className="fiat--currencies">
									<div className="fiat--currency--box fiat--currency--box--usd">
										<i className="fa fa-usd" aria-hidden="true" />
									</div>
									<div className="fiat--currency--box fiat--currency--box--eur">
										<i className="fa fa-eur" aria-hidden="true" />
									</div>
									<div className="fiat--currency--box fiat--currency--box--jpy">
										<i className="fa fa-jpy" aria-hidden="true" />
									</div>
									<div className="fiat--currency--box fiat--currency--box--gbp">
										<i className="fa fa-gbp" aria-hidden="true" />
									</div>
								</div>
								<div className="stickman--left--arm--part--one" />
								<div className="stickman--left--arm--part--two" />
								<div className="stickman--left--hand" />
								<div className="stickman--right--arm--part--one" />
								<div className="stickman--right--arm--part--two" />
								<div className="stickman--right--hand" />
							</div>
							<div className="stickman--left--leg" />
							<div className="stickman--right--leg" />
						</div>
					</div>
				</div>
				<div className="frontend--features--trade">
					<div className="frontend--features--trade--header">
						<i className="fa fa-exchange" aria-hidden="true" />
						<h3>Trade Crypto Currencies</h3>
					</div>
					<div className="frontend--features--trade--container">
						<OrderDetails
							name={'Bitcoin'}
							fromIcon={'BTC-alt'}
							toIcon={'ETH'}
							fromAmount={'0.275'}
							toAmount={'4.53'}
							fromSymbol={'BTC'}
							toSymbol={'ETH'}
							color={'white'}
						/>
						<div className="frontend--features--trade--container--information">
							<p>Info here</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Features;
