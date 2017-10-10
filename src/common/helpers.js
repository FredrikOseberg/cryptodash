import store from '../store/store';

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
