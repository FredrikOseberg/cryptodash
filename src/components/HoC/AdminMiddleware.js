import React from 'react';
import { auth, database } from '../../firebase';
import Loading from '../Loading/Loading';
import { connect } from 'react-redux';

export function AdminMiddleware(Component) {
	class AuthenticatedComponent extends React.Component {
		componentWillMount() {
			this.checkAuth();

			this.state = {
				loading: true
			};
		}

		componentWillUnmount() {
			this.unsubscribe();
		}

		checkAuth() {
			this.unsubscribe = auth.onAuthStateChanged(user => {
				if (user) {
					const databaseRef = database.ref('users/' + user.uid);

					databaseRef.once('value', snapshot => {
						const userData = snapshot.val();

						this.setState({ loading: false });

						if (!userData.isAdmin) {
							this.props.history.push('/');
						}
					});
				} else {
					this.props.history.push('/');
				}
			});
		}

		render() {
			return this.state.loading ? <Loading /> : <Component {...this.props} />;
		}
	}

	return connect(null)(AuthenticatedComponent);
}
