import firebase from 'firebase';

var config = {
	apiKey: 'AIzaSyA8pS2ZTYtndtqOyTPRK67h3iqe-PeTH1U',
	authDomain: 'cryptodash-da623.firebaseapp.com',
	databaseURL: 'https://cryptodash-da623.firebaseio.com',
	projectId: 'cryptodash-da623',
	storageBucket: 'cryptodash-da623.appspot.com',
	messagingSenderId: '308474534771'
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
