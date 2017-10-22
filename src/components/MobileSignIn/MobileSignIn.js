import React from 'react';
import SignIn from '../SignIn/SignIn';
import MobileBackButton from '../MobileBackButton/MobileBackButton';
import './mobilesignin.css';

const MobileSignIn = props => {
	return (
		<div className="mobile--signin">
			<MobileBackButton history={props.history} />
			<SignIn history={props.history} reauth={false} />
		</div>
	);
};

export default MobileSignIn;
