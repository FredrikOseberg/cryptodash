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
		case 'ADD_PRICE':
			const oldState = state,
				newState = [];
			let newObj;
			oldState.forEach(obj => {
				newObj = { ...obj };
				if (obj.symbol === action.symbol) {
					newObj.price = action.price;
					newObj.percentage = action.percentage;
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

const currentCurrency = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_CURRENT_CURRENCY':
			console.log(action);
			return {
				...action
			};
		default:
			return state;
	}
};

const auth = (state = { status: 'ANONYMOUS' }, action) => {
	switch (action.type) {
		case 'SIGN_IN':
			return {
				status: 'SIGNED_IN',
				email: action.email,
				displayName: action.displayName,
				photoURL: action.photoURL,
				uid: action.uid
			};
		case 'SIGN_OUT':
			return {
				status: 'ANONYMOUS',
				email: null,
				displayName: null,
				photoURL: null,
				uid: null
			};
		default:
			return state;
	}
};

const rootReducer = combineReducers({ selectedCurrencies, auth, currentCurrency });

export default rootReducer;
