import { createStore, compose } from 'redux';
import reducer from '../reducers/reducer';

// Remember to remove redux devtools

const store = createStore(
	reducer,
	compose(
		typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
			? window.devToolsExtension()
			: f => f
	)
);

export default store;
