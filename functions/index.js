// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.

var functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
var admin = require('firebase-admin');
var axios = require('axios');
var map = require('lodash/map');

admin.initializeApp(functions.config().firebase);

const db = admin.database();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.addPortfolioValue = functions.https.onRequest((request, response) => {
	const databaseRef = db.ref('/users/Y7sfciTW9vOpW5HUv0tXLsBPVm32');

	databaseRef.once('value', snapshot => {
		let portfolioValue = 0;
		const currencies = snapshot.child('currencies').val();

		const requests = map(currencies, currency => {
			if (currency.wallet) {
				return new Promise((resolve, reject) => {
					axios
						.get(`https://www.coincap.io/page/${currency.symbol}`)
						.then(response => {
							portfolioValue += response.data.price * currency.wallet.amount;
							resolve();
						})
						.catch(error => {
							reject(error);
						});
				});
			}
		});

		function addPortfolioVal(requests) {
			Promise.all(requests)
				.then(() => {
					const timestamp = Date.now();
					databaseRef
						.child('portfolio')
						.child(timestamp)
						.set({
							portfolioValue,
							timestamp
						});
					response.send('Added portfoliovalue');
				})
				.catch(error => {
					addPortfolioValue();
				});
		}

		addPortfolioVal(requests);
	});
});
