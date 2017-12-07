import { database, auth } from '../firebase';

export const portfolioEntry = (amount, coin, coinImage, timestamp, type) => {
	const databaseRef = database.ref(`/users/${auth.currentUser.uid}`);

	const entry = {
		type: type,
		coinName: coin,
		img: coinImage,
		timestamp,
		amount: amount
	};

	databaseRef
		.child('portfolioEvents')
		.child(timestamp)
		.set(entry);
};
