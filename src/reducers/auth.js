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

export default auth;
