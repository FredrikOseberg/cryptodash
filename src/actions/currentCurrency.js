import { convertPriceToLocalCurrency } from '../common/helpers';

export const addCurrentCurrency = obj => {
	return {
		type: 'ADD_CURRENT_CURRENCY',
		name: obj.name,
		id: obj.id,
		symbol: obj.symbol,
		price: convertPriceToLocalCurrency(obj.price),
		percentage: obj.percentage
	};
};

export const clearCurrentCurrency = () => {
	return {
		type: 'CLEAR_CURRENT_CURRENCY'
	};
};
