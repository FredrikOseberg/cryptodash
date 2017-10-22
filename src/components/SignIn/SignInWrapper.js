import React, { Component } from 'react';
import Header from '../Header/Header';
import MobileSignIn from '../MobileSignIn/MobileSignIn';
import firebase from '../../firebase';
import Loading from '../Loading/Loading';
import SignIn from './SignIn';
import { isMobile } from '../HoC/IsMobile';
import './signinwrapper.css';

class SignInWrapper extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
			if (!user) {
				this.setState({ loading: false });
			}
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		let markup;

		if (this.props.isMobile) {
			markup = <MobileSignIn history={this.props.history} reauth={false} />;
		} else {
			markup = (
				<div className="frontend--background">
					<Header />
					<div className="container register--container">
						<div className="register--box--container">
							<SignIn history={this.props.history} reauth={false} />
						</div>
					</div>
				</div>
			);
		}

		if (this.state.loading) {
			markup = <Loading />;
		}

		return <div className="sigininwrapper--container">{markup}</div>;
	}
}

export default isMobile(SignInWrapper);
