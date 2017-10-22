import React, { Component } from 'react';
import CurrencyPortfolio from '../../Dashboard/CurrencyPortfolio/CurrencyPortfolio';
import './mobileportfolio.css';

class MobilePortfolio extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<div className="mobile--portfolio">
				<CurrencyPortfolio />
			</div>
		);
	}
}

export default MobilePortfolio;
