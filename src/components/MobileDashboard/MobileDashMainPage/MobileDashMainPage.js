import React, { Component } from 'react';
import MobileLineChart from '../MobileLineChart/MobileLineChart';
import MobileDashboardCurrencyItem from '../MobileDashboardCurrencyItem/MobileDashboardCurrencyItem';

class MobileDashMainPage extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		document.body.style.height = 'auto';
		window.scrollTo(0, 0);
	}

	componentWillUnmount() {
		document.body.style.height = '100%';
	}

	render() {
		let showLineChart = this.props.currentCurrency;
		return (
			<div className="mobile--dashboard--main--page">
				{showLineChart && <MobileLineChart getCurrentCurrency={this.props.getCurrentCurrency} />}
				<div className="mobile--currencies">
					<h3 className="mobile--currencies--header">Tracked Currencies</h3>
					<ul className="mobile--currencies--list">
						{this.props.currencies.map(currency => {
							return (
								<MobileDashboardCurrencyItem
									symbol={currency.symbol}
									percentage={currency.percentage}
									price={currency.price}
									name={currency.name}
									img={currency.img}
									key={currency.symbol}
								/>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}

export default MobileDashMainPage;
