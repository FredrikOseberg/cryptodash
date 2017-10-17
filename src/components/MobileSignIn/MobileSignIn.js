import React from 'react';
import SignIn from '../SignIn/SignIn';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import './mobilesignin.css';

const MobileSignIn = props => {
	console.log(props);
	return (
		<div className="mobile--signin">
			<SignIn history={props.history} reauth={false} />
		</div>
	);
};

export default MobileSignIn;
