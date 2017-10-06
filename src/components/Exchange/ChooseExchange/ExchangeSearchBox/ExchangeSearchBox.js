import React, { Component } from 'react';

class ExchangeSearchBox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchTerm: ''
		};

		this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
		this.handleListItemClick = this.handleListItemClick.bind(this);
	}

	handleSearchTermChange(event) {
		this.setState({ searchTerm: event.target.value.toString().trim() });
	}

	handleListItemClick(event) {
		const symbol = event.currentTarget.dataset.symbol;
		this.props.handler(symbol);
	}

	render() {
		let chooseCurrencyListClasses;
		this.props.show
			? (chooseCurrencyListClasses = 'exchange--choose--currency--list--container visible opacity')
			: (chooseCurrencyListClasses = 'exchange--choose--currency--list--container');

		return (
			<div className={chooseCurrencyListClasses}>
				<input
					type="text"
					placeholder="Search"
					className="exchange--choose--currency--list--search"
					onChange={this.handleSearchTermChange}
				/>
				<div className="exchange--choose--currency--list--inner--container">
					<ul className="exchange--choose--currency--list">
						{this.props.currencies
							.filter(currency => {
								return (
									`${currency.name} ${currency.symbol}`
										.toLowerCase()
										.indexOf(this.state.searchTerm.toLowerCase()) >= 0
								);
							})
							.map(currency => {
								return (
									<li
										data-symbol={currency.symbol.toLowerCase()}
										onClick={this.handleListItemClick}
										key={currency.id}
									>
										<div className="choose--currency--list--image--container">
											<img src={currency.img} alt={currency.name} />
										</div>
										<h5 className="choose--currency--list--currency--name">
											{currency.name} ({currency.symbol})
										</h5>
									</li>
								);
							})}
					</ul>
				</div>
			</div>
		);
	}
}

export default ExchangeSearchBox;
