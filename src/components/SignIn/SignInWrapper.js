import React, { Component } from 'react';
import Header from '../Header/Header';
import MobileSignIn from '../MobileSignIn/MobileSignIn';
import SignIn from './SignIn';
import { isMobile } from '../HoC/IsMobile';
import './signinwrapper.css';

class SignInWrapper extends Component {
	constructor(props) {
		super(props);
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

		return <div className="sigininwrapper--container">{markup}</div>;
	}
}

export default isMobile(SignInWrapper);
