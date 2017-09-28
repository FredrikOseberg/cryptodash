export const addLocalCurrency = obj => {
	return {
		type: 'ADD_LOCAL_CURRENCY',
		currency: obj.currency,
		rate: obj.rate
	};
};

export const clearLocalCurrency = () => {
	return {
		type: 'REMOVE_LOCAL_CURRENCY'
	};
};
