export const addCurrency = obj => {
	return {
		type: 'ADD_CURRENCY',
		name: obj.payload.name,
		id: obj.payload.id,
		img: obj.payload.img,
		symbol: obj.payload.symbol
	};
};

export const removeCurrency = index => {
	return {
		type: 'REMOVE_CURRENCY',
		position: index
	};
};
