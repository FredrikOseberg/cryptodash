import store from '../store/store';
import { database } from '../firebase';
import { removeCurrency } from '../actions/currencies';

export const convertPriceToLocalCurrency = priceInDollars => {
	let convertedPrice;
	const state = store.getState();
	if (state.localCurrency.currency !== 'USD') {
		const rate = state.localCurrency.rate;
		convertedPrice = (priceInDollars * rate).toFixed(2);
	} else {
		return priceInDollars.toFixed(2);
	}

	return convertedPrice;
};

export const deleteItemFromDBandState = coinSymbol => {
	let index;
	const state = store.getState();
	const user = state.auth;
	const currencies = state.selectedCurrencies;

	currencies.forEach((currency, ind) => {
		if (currency.symbol === coinSymbol) {
			index = ind;
		}
	});

	const storageLocation = database.ref('users/' + user.uid + '/currencies');
	storageLocation.once('value', snapshot => {
		if (snapshot.hasChild(coinSymbol)) {
			storageLocation.child(coinSymbol).remove();
			store.dispatch(removeCurrency(index));
		}
	});
};

export const debounce = (func, wait, immediate) => {
	var timeout;
	return function() {
		var context = this,
			args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
