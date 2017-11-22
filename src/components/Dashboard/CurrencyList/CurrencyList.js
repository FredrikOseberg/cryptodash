import React from 'react';
import CurrencyListItem from './CurrencyListItem/CurrencyListItem';
import './currencylist.css';

const CurrencyList = props => {
	let currencyListItems = props.currencies.map(currency => {
		return (
			<CurrencyListItem
				name={currency.name}
				img={currency.img}
				key={currency.id}
				symbol={currency.symbol}
				price={currency.price}
				percentage={currency.percentage}
				wallet={currency.wallet}
				handleAddWalletClick={props.handleAddWalletClick}
			/>
		);
	});
	return (
		<div className="dashboard--currency--list">
			<ul>{currencyListItems}</ul>
		</div>
	);
};

const mapStateToProps = state => ({
	selectedCurrencies: state.selectedCurrencies
});

export default CurrencyList;
