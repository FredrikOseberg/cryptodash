import React, { Component } from 'react';
import axios from 'axios';

class SampleCurrency extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ticker: this.props.ticker,
			information: {},
			updated: false
		};

		this.getCoinData = this.getCoinData.bind(this);
	}

	componentDidMount() {
		this.getCoinData();

		this.interval = setInterval(() => {
			this.getCoinData();
		}, 5000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getCoinData() {
		axios.get(`https://coincap.io/page/${this.props.ticker}`).then(results => {
			console.log(results);
			let updatedCurrency = {
				name: results.data.display_name,
				ticker: results.data.id,
				perc: results.data.cap24hrChange,
				price: results.data.price
			};

			this.setState({ information: updatedCurrency }, () => {
				this.setState({ updated: true }, () => {
					setTimeout(() => {
						this.setState({ updated: false });
					}, 1500);
				});
			});
		});
	}

	render() {
		let percentageClasses;
		if (this.state.information.perc > 0) {
			percentageClasses = 'samplecurrency--positive';
		} else {
			percentageClasses = 'samplecurrency--negative';
		}

		let updatedMarkup;
		if (this.state.updated) {
			updatedMarkup = 'samplecurrency--updated opacity';
		} else {
			updatedMarkup = 'samplecurrency--updated';
		}
		return (
			<li>
				<div className={updatedMarkup} />
				<h4>
					{this.state.information.name} ({this.props.ticker})
				</h4>
				<h4 className={percentageClasses}>{this.state.information.perc}%</h4>
				<h4>
					{this.state.information.price}
					<span className="price--postfix">USD</span>
				</h4>
			</li>
		);
	}
}

export default SampleCurrency;
