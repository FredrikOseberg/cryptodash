import React, { Component } from 'react';
import Header from '../Header/Header';
import SearchCurrencies from '../SearchCurrencies/SearchCurrencies';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Temporary importing images
import bitcoin from '../../img/coins/bitcoin.png';
import ether from '../../img/coins/ether.png';

class Landing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clickedExpandBox: false,
			selectedCurrencies: []
		};

		this.handleClickedExpand = this.handleClickedExpand.bind(this);
	}
	// Handles the state for the search box that opens on the landing pages
	handleClickedExpand() {
		this.setState({ clickedExpandBox: !this.state.clickedExpandBox });
	}
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
						showSearch={this.state.clickedExpandBox}
						handleClickedExpand={this.handleClickedExpand}
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
											onClick={this.handleClickedExpand}
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
											onClick={this.handleClickedExpand}
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
									<Link to="/register">
										<div className="landing--cover--content--box--button main-button">Continue</div>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	selectedCurrencies: state.selectedCurrencies
});

export default connect(mapStateToProps)(Landing);
