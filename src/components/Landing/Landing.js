import React, { Component } from 'react';
import Header from '../Header/Header';
import SearchCurrencies from '../SearchCurrencies/SearchCurrencies';
import ChooseCurrency from '../ChooseCurrency/ChooseCurrency';
import Features from '../Frontend/Features/Features';
import GoMobile from '../Frontend/GoMobile/GoMobile';
import Footer from '../Footer/Footer';
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
		this.setState({ clickedExpandBox: !this.state.clickedExpandBox });
	}
	render() {
		// Adds HTML that displays how many currencies you have selected.
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
							</div>
							<div className="landing--cover--content--box--container">
								<div className="landing--cover--content--box">
									<ChooseCurrency handleClickedExpand={this.handleClickedExpand} />
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
