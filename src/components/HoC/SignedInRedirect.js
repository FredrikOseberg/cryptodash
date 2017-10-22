import React, { Component } from 'react';
import { auth } from '../../firebase';

export function signedInRedirect(WrappedComponent) {
	return class extends Component {
		componentWillMount() {
			if (auth.currentUser) {
				this.props.history.push('/');
			}
		}

		render() {
			return <WrappedComponent />;
		}
	};
}
