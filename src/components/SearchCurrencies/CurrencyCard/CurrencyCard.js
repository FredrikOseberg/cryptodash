import React, { Component } from 'react';

class CurrencyCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeCard: this.props.active
		};

		this.handleClickedCard = this.handleClickedCard.bind(this);
	}

	handleClickedCard(event) {
		const object = {
			name: this.props.name,
			img: this.props.img,
			symbol: this.props.symbol,
			id: this.props.id
		};

		if (this.state.activeCard) {
			this.props.removeCurrencyFromState(object);
		}

		if (!this.state.activeCard) {
			this.props.addCurrencyToState(object);
		}

		this.setState({ activeCard: !this.state.activeCard });
	}

	render() {
		const currencyCardClasses = this.state.activeCard ? 'currency--card currency--card--active' : 'currency--card';
		return (
			<div className={currencyCardClasses} onClick={this.handleClickedCard}>
				<img src={this.props.img} alt={this.props.name} />
				<h5>{this.props.name}</h5>
				<p>{this.props.symbol}</p>
			</div>
		);
	}
}

export default CurrencyCard;
