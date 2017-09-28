import store from '../store/store';

export const convertPriceToLocalCurrency = price => {
	const state = store.getState();
	const postfix = state.localCurrency.currency;
	const rate = state.localCurrency.rate;
	const convertedPrice = (price * rate).toFixed(2);

	return convertedPrice;
};
