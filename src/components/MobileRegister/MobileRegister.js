import React from 'react';
import Register from '../Register/Register';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import './mobileregister.css';

const MobileRegister = props => (
	<div>
		<MobileNavigation />
		<div className="mobile--register">
			<Register history={props.history} />
		</div>
	</div>
);

export default MobileRegister;
