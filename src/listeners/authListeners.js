import { auth } from '../firebase';
import { signIn, signOut } from '../actions/auth';
import { clearLocalCurrency } from '../actions/localCurrency';

export const startListeningToAuthChanges = () => {
	return dispatch => {
		auth.onAuthStateChanged(user => {
			if (user) {
				dispatch(signIn(user));
			} else {
				dispatch(signOut());
				dispatch(clearLocalCurrency());
			}
		});
	};
};
