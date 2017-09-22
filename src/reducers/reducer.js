import { combineReducers } from 'redux';

const selectedCurrencies = (state = [], action) => {
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
			return [...state.slice(0, action.position), ...state.slice(action.position + 1)];
		case 'CLEAR_CURRENCY':
			return [];
		default:
			return state;
	}
};

const rootReducer = combineReducers({ selectedCurrencies });

export default rootReducer;
