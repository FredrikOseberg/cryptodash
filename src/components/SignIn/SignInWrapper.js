import React from 'react';
import Header from '../Header/Header';
import MobileSignIn from '../MobileSignIn/MobileSignIn';
import SignIn from './SignIn';
import './signinwrapper.css';

const SignInWrapper = props => {
	let markup;
	console.log(this.history);
	if (props.isMobile) {
		console.log('component is mobile');
		markup = <MobileSignIn history={props.history} reauth={false} />;
	} else {
		markup = (
			<div className="frontend--background">
				<Header />
				<div className="container register--container">
					<div className="register--box--container">
						<SignIn history={props.history} reauth={false} />
					</div>
				</div>
			</div>
		);
	}

	return <div className="sigininwrapper--container">{markup}</div>;
};

export default SignInWrapper;
