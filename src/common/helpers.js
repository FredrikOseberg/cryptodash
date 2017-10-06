import store from '../store/store';

export const convertPriceToLocalCurrency = priceInDollars => {
	const state = store.getState();
	const rate = state.localCurrency.rate;
	const convertedPrice = (priceInDollars * rate).toFixed(2);

	return convertedPrice;
};
