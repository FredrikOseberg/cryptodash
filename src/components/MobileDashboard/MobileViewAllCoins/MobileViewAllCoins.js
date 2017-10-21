import React, { Component } from 'react';
import ViewAllCurrencies from '../../ViewAllCurrencies/ViewAllCurrencies';
import './mobileviewallcoins.css';

class MobileViewAllCoins extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<div className="mobile--dashboard--all--coins">
				<div className="mobile--dashboard--all--coins--header">
					<h3>All Coins</h3>
				</div>
				<ViewAllCurrencies allCurrencies={this.props.allCurrencies} />
			</div>
		);
	}
}

export default MobileViewAllCoins;
