import React, { Component } from 'react';
import Header from '../Header/Header';
import SearchCurrencies from '../SearchCurrencies/SearchCurrencies';
import CryptoGraph from '../Frontend/CryptoGraph/CryptoGraph';
import Features from '../Frontend/Features/Features';
import GoMobile from '../Frontend/GoMobile/GoMobile';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Landing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clickedExpandBox: false
		};

		this.handleClickedExpand = this.handleClickedExpand.bind(this);
	}
	// Handles the state for the search box that opens on the landing pages
	handleClickedExpand() {
		window.scrollTo(0, 0);
		this.setState({ clickedExpandBox: !this.state.clickedExpandBox });
	}
	render() {
		let buttonMarkup;
		if (this.props.selectedCurrencies.length === 0) {
			buttonMarkup = (
				<button className="landing--cover--start--tracking--button" onClick={this.handleClickedExpand}>
					Select currencies to track
				</button>
			);
		} else {
			buttonMarkup = (
				<Link to="/register">
					<button className="landing--cover--start--tracking--button" onClick={this.handleClickedExpand}>
						Register to start tracking
					</button>
				</Link>
			);
		}
		return (
			<div className="landing">
				<div className="landing frontend--background">
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
								<p>It's free. Get started today.</p>
								{buttonMarkup}
							</div>
							<div className="landing--cover--content--box--container">
								<div className="landing--cover--content--box">
									<CryptoGraph />
								</div>
							</div>
						</div>
					</div>
				</div>
				<Features />
				<GoMobile />
				<Footer frontend={true} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	selectedCurrencies: state.selectedCurrencies
});

export default connect(mapStateToProps)(Landing);
