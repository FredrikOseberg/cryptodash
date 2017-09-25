export const addCurrentCurrency = obj => {
	return {
		type: 'ADD_CURRENT_CURRENCY',
		name: obj.name,
		id: obj.id,
		symbol: obj.symbol,
		price: obj.price.toFixed(2),
		percentage: obj.percentage
	};
};
