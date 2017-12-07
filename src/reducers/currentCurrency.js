const currentCurrency = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_CURRENT_CURRENCY':
			return {
				...action
			};
		case 'CLEAR_CURRENT_CURRENCY':
			return '';
		default:
			return state;
	}
};

export default currentCurrency;
