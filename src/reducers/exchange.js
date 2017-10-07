const exchange = (state = {}, action) => {
	let exchange;
	switch (action.type) {
		case 'ADD_EXCHANGE_FROM_OBJECT':
			exchange = { ...state };
			exchange.fromCurrency = action.fromCurrency;
			return exchange;
		case 'ADD_EXCHANGE_TO_OBJECT':
			exchange = { ...state };
			exchange.toCurrency = action.toCurrency;
			return exchange;
		case 'ADD_EXCHANGE_AMOUNT':
			exchange = { ...state };
			exchange.amount = action.amount;
			return exchange;
		case 'ADD_EXCHANGE_MIN_AMOUNT':
			exchange = { ...state, ...action.minAmount };
			return exchange;
		case 'REMOVE_EXCHANGE_OBJECTS':
			return {};
		default:
			return state;
	}
};

export default exchange;
