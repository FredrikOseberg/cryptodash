import React from 'react';
import Header from '../Header/Header';
import SignIn from './SignIn';

const SignInWrapper = props => (
	<div className="frontend--background">
		<Header />
		<div className="container register--container">
			<div className="register--box--container">
				<SignIn history={props.history} reauth={false} />
			</div>
		</div>
	</div>
);

export default SignInWrapper;
