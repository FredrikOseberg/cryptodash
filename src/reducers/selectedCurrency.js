const selectedCurrencies = (state = [], action) => {
	const oldState = state,
		newState = [];
	let newObj;
	switch (action.type) {
		case 'ADD_CURRENCY':
			return [
				...state,
				{
					name: action.name,
					id: action.id,
					img: action.img,
					symbol: action.symbol,
					amount: action.amount || null,
					wallet: action.wallet || null
				}
			];
		case 'REMOVE_CURRENCY':
			return [...state.slice(0, action.position), ...state.slice(action.position + 1)];
		case 'ADD_PRICE':
			oldState.forEach(obj => {
				newObj = { ...obj };
				if (obj.symbol === action.symbol) {
					newObj.price = action.price;
					newObj.percentage = action.percentage;
				}
				newState.push(newObj);
			});
			return newState;
		case 'ADD_AMOUNT_TO_CURRENCY':
			oldState.forEach(obj => {
				newObj = { ...obj };
				if (obj.symbol === action.symbol) {
					newObj.amount = action.amount;
				}
				newState.push(newObj);
			});
			return newState;
		case 'ADD_WALLET_INFO_TO_CURRENCY':
			oldState.forEach(obj => {
				newObj = { ...obj };
				if (obj.symbol === action.symbol) {
					newObj.wallet = action.wallet;
				}
				newState.push(newObj);
			});
			return newState;
		case 'CLEAR_CURRENCY':
			return [];
		default:
			return state;
	}
};

export default selectedCurrencies;
