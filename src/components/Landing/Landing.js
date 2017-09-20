import React, { Component } from 'react';
import Header from '../Header/Header';
import SearchCurrencies from '../SearchCurrencies/SearchCurrencies';
// Temporary importing images
import bitcoin from '../../img/coins/bitcoin.png';
import ether from '../../img/coins/ether.png';

class Landing extends Component {
	render() {
		// Adds HTML that displays how many currencies you have selected.
		let selectedCurrenciesText;
		if (this.props.selectedCurrencies.length > 0) {
			selectedCurrenciesText = (
				<div className="landing--cover--content--box--selected--currencies">
					<p>You have selected {this.props.selectedCurrencies.length} currencies to track.</p>
				</div>
			);
		}
		return (
			<div className="landing frontend--background">
				<div className="frontend--layover">
					<SearchCurrencies
						data={this.props.data}
						showSearch={this.props.clickedExpandBox}
						handleClickedExpand={this.props.handleClickedExpand}
						addCurrencyToState={this.props.addCurrencyToState}
						removeCurrencyFromState={this.props.removeCurrencyFromState}
						selectedCurrencies={this.props.selectedCurrencies}
					/>
					<Header />
					<div className="container">
						<div className="landing--cover--content">
							<div className="landing--cover--content--text">
								<h2>Your personalized crypto dashboard.</h2>
								<p>The easiest way to keep up to date on your digital currency.</p>
							</div>
							<div className="landing--cover--content--box--container">
								<div className="landing--cover--content--box">
									<h4>Choose which currencies to track</h4>
									{/* Refacor this */}
									<div className="landing--cover--content--box--currency">
										<div
											className="landing--cover--content--box--image--container"
											onClick={this.props.handleClickedExpand}
										>
											<img
												src={bitcoin}
												className="landing--cover--content--box--image"
												alt="Bitcoin"
											/>
											<p>Bitcoin</p>
										</div>
										<div
											className="landing--cover--content--box--image--container"
											onClick={this.props.handleClickedExpand}
										>
											<img
												src={ether}
												className="landing--cover--content--box--image"
												alt="ethereum"
											/>
											<p>Ethereum</p>
										</div>
									</div>
									{selectedCurrenciesText}
									<div className="landing--cover--content--box--button main-button">Continue</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Landing;
