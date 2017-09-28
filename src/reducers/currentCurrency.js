const currentCurrency = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_CURRENT_CURRENCY':
			return {
				...action
			};
		default:
			return state;
	}
};

export default currentCurrency;
