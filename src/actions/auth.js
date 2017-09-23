import { auth } from '../firebase';

export const signIn = user => {
	return {
		type: 'SIGN_IN',
		email: user.email,
		displayName: user.displayName,
		photoURL: user.photoURL,
		uid: user.uid
	};
};

export const signOut = () => {
	return {
		type: 'SIGN_OUT',
		email: null,
		displayName: null,
		photoURL: null,
		uid: null
	};
};

export const startListeningToAuthChanges = () => {
	return dispatch => {
		auth.onAuthStateChanged(user => {
			if (user) {
				dispatch(signIn(user));
			} else {
				dispatch(signOut());
			}
		});
	};
};
