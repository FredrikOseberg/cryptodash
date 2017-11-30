const portfolio = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_PORTFOLIO_VALUE':
			return {
				totalVal: action.totalVal
			};
		default:
			return state;
	}
};

export default portfolio;
