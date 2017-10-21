import React, { Component } from 'react';
import { connect } from 'react-redux';
import CurrencyCard from './CurrencyCard/CurrencyCard.js';

class SearchCurrencies extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchTerm: '',
			allData: this.props.data,
			renderData: [],
			currentIndex: 0
		};

		this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
		this.setRenderData = this.setRenderData.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
	}
	componentDidMount() {
		this.setRenderData();
	}

	setRenderData() {
		this.setState({ loading: true });
		let index = (this.state.currentIndex += 50);
		this.setState({ currentIndex: index });
		let renderData = [];
		console.log(index);
		for (let i = 0; i < index; i++) {
			let object = this.state.allData[i];
			renderData.push(object);
		}

		this.setState({ renderData }, () => {
			this.setState({ loading: false });
		});
	}
	// Handles state change for search input
	handleSearchTermChange(event) {
		this.setState({ searchTerm: event.target.value });
	}
	render() {
		// Conditionally set classes for the searchbox based on prop 'showSearch'
		const currencyLayoverClasses = this.props.showSearch
			? 'search--currency--selector--layover visible opacity search--currency--selector--layover--active'
			: 'search--currency--selector--layover';
		// First: Filter out data based on what the user types in the search field
		// Second: Map over the data and check whether or not each item in the dataset is already in application state.
		// If it is, set it's active property to true.
		let currencyCards;
		if (this.state.searchTerm !== '') {
			currencyCards = this.props.data
				.filter(
					currency =>
						`${currency.name} ${currency.symbol}`
							.toUpperCase()
							.indexOf(this.state.searchTerm.toUpperCase()) >= 0
				)
				.map(currency => {
					let active = false;
					this.props.selectedCurrencies.forEach(curr => {
						if (curr.name === currency.name) {
							active = true;
						}
					});
					return (
						<CurrencyCard
							key={currency.id}
							id={currency.id}
							name={currency.name}
							img={currency.img}
							symbol={currency.symbol}
							active={active}
						/>
					);
				});
		} else {
			currencyCards = this.state.renderData.map(currency => {
				let active = false;
				this.props.selectedCurrencies.forEach(curr => {
					if (curr.name === currency.name) {
						active = true;
					}
				});
				return (
					<CurrencyCard
						key={currency.id}
						id={currency.id}
						name={currency.name}
						img={currency.img}
						symbol={currency.symbol}
						active={active}
					/>
				);
			});
		}
		return (
			<div className={currencyLayoverClasses}>
				<div className="search--currency--container">
					<div className="search--currency--header">
						<h2>Choose which currencies to track</h2>
						<button className="search--currency--exit" onClick={this.props.handleClickedExpand}>
							&times;
						</button>
					</div>
					<input
						type="text"
						placeholder="Search for currencies"
						className="search--currency--searchfield"
						onChange={this.handleSearchTermChange}
					/>
					<div className="search--currency--results">{currencyCards}</div>
					<div className="search--currency--fab" onClick={this.props.handleClickedExpand}>
						<i className="fa fa-floppy-o" aria-hidden="true" />
					</div>
					<div className="main-button load--more--button" onClick={this.setRenderData}>
						Load More
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	selectedCurrencies: state.selectedCurrencies
});

export default connect(mapStateToProps)(SearchCurrencies);
