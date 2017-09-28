const localCurrency = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_LOCAL_CURRENCY':
			return {
				currency: action.currency || null,
				rate: action.rate
			};
		case 'REMOVE_LOCAL_CURRENCY':
			return {};
		default:
			return state;
	}
};

export default localCurrency;
