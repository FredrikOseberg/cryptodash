import React from 'react';
import { connect } from 'react-redux';

export function requireAuthentication(Component) {
	class AuthenticatedComponent extends React.Component {
		componentWillMount() {
			this.checkAuth();
		}

		checkAuth() {
			if (this.props.isAuthenticated.status === 'SIGNED_IN') {
				this.props.history.push('/');
			}
		}

		render() {
			return (
				<div>{this.props.isAuthenticated.status === 'ANONYMOUS' ? <Component {...this.props} /> : null}</div>
			);
		}
	}

	const mapStateToProps = state => ({
		isAuthenticated: state.auth
	});

	return connect(mapStateToProps)(AuthenticatedComponent);
}
