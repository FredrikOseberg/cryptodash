export const addExchangeFromCurrency = obj => {
	return {
		type: 'ADD_EXCHANGE_FROM_OBJECT',
		fromCurrency: {
			...obj
		}
	};
};

export const addExchangeToCurrency = obj => {
	return {
		type: 'ADD_EXCHANGE_TO_OBJECT',
		toCurrency: {
			...obj
		}
	};
};

export const addMinAmountToExchange = obj => {
	return {
		type: 'ADD_EXCHANGE_MIN_AMOUNT',
		minAmount: {
			...obj
		}
	};
};

export const addExchangeAmount = obj => {
	return { type: 'ADD_EXCHANGE_AMOUNT', amount: obj.amount };
};
