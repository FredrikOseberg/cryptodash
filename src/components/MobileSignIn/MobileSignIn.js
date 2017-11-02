import React from 'react';
import SignIn from '../SignIn/SignIn';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import './mobilesignin.css';

const MobileSignIn = props => {
	return (
		<div>
			<MobileNavigation />
			<div className="mobile--signin">
				<SignIn history={props.history} reauth={false} />
			</div>
		</div>
	);
};

export default MobileSignIn;
