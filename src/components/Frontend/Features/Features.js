import React, { Component } from 'react';
import featuresDash from '../../../img/featuresDashboardResized.png';
import SampleCurrency from './SampleCurrency/SampleCurrency';
import OrderDetails from './OrderDetails/OrderDetails';
import axios from 'axios';
import changelly from '../../../img/changelly.png';
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
						<h3>
							<i className="fa fa-line-chart" aria-hidden="true" />Track
						</h3>
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
							<div className="frontend--features--track--img--container">
								<img src={featuresDash} alt="Dashboard" className="frontend--track--img" />
							</div>
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
						<h3>
							<i className="fa fa-money" aria-hidden="true" />Local Currency
						</h3>
					</div>
					<div className="frontend--features--currency--container">
						<div className="frontend--features--currency--information">
							<p>
								If following cryptocurrencies in foreign currencies doesn't make sense to you, do not
								fear. You can easily track cryptocurrencies in your own local currency. Cryptodasher
								supports over 30 fiat currencies including USD, EUR, SEK, NOK, TRY, RUB, SGD, JPY and
								many, many more.
							</p>
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
						<h3>
							{' '}
							<i className="fa fa-exchange" aria-hidden="true" />Trade
						</h3>
					</div>
					<div className="frontend--features--trade--container">
						<div className="frontend--features--trade--order--details">
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
						</div>
						<div className="frontend--features--trade--container--information">
							<p>
								CryptoDasher is integrated with a trusted 3rd party that handles all trades. Using the
								built in widget, or going{' '}
								<a
									href="https://changelly.com/?ref_id=172ccf841be7"
									target="_blank"
									rel="noreferrer noopener"
									className="features--link"
								>
									directly to their web page
								</a>{' '}
								you can easily trade in over 70 different cryptocurrencies
							</p>
							<a
								href="https://changelly.com/?ref_id=172ccf841be7"
								target="_blank"
								rel="noreferrer noopener"
							>
								<img src={changelly} alt="Changelly" />
							</a>
						</div>
					</div>
				</div>
				<div className="frontend--features--store">
					<div className="frontend--features--store--header">
						<h3>
							<i className="fa fa-folder" aria-hidden="true" />Store Wallet Information
						</h3>
					</div>
					<div className="frontend--features--store--container">
						<div className="frontend--features--store--information">
							<p>
								Once you get up and running in the crypto currency space, you might end up with a lot of
								different wallets to store different cryptocurrencies. Having lots of different wallet
								addresses in different apps and balances makes it hard to keep an overview over your
								addresses and total balance. Not here.
							</p>
							<p>
								Simply add the amount of coins you own and your public address key, and you can easily
								access and copy the address at the click of a button, as well as seeing your total
								portfolio value update in real time.
							</p>
						</div>
						<div className="frontend--features--store--wallet--container">
							<div className="frontend--features--store--wallet--currencies">
								<div className="features--box--currency wallet--currency--box--btc">
									<i className="cc BTC" />
								</div>
								<div className="features--box--currency wallet--currency--box--eth">
									<i className="cc ETH" />
								</div>
								<div className="features--box--currency wallet--currency--box--neo">
									<i className="cc NEO" />
								</div>
								<div className="features--box--currency wallet--currency--box--gno">
									<i className="cc GNO" />
								</div>
								<div className="features--box--currency wallet--currency--box--doge">
									<i className="cc DOGE-alt" />
								</div>
							</div>
							<div className="frontend--features--store--wallet">
								<div className="frontend--features--store--inner--wallet">
									<div className="frontend--features--store--inner--wallet--text">
										<h3>
											Total Balance: 6122<span className="price--postfix">USD</span>
										</h3>
									</div>
									<div className="frontend--features--store--wallet--button" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Features;
