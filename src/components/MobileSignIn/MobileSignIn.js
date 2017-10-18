import React from 'react';
import SignIn from '../SignIn/SignIn';
import './mobilesignin.css';

const MobileSignIn = props => {
	return (
		<div className="mobile--signin">
			<SignIn history={props.history} reauth={false} />
		</div>
	);
};

export default MobileSignIn;
