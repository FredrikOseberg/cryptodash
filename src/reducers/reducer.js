const currencies = (state = [], action) => {
	switch (action.type) {
		case 'ADD_CURRENCY':
			return [
				...state,
				{
					name: action.name,
					id: action.id,
					img: action.img,
					symbol: action.symbol
				}
			];
		case 'REMOVE_CURRENCY':
			console.log(action.position);
			const newArr = [...state.slice(0, action.position), ...state.slice(action.position + 1)];
			console.log(state);
			console.log(newArr);
			return newArr;
		default:
			return state;
	}
};

const rootReducer = currencies;

export default rootReducer;
