import React from 'react';
import Register from '../Register/Register';
import './mobileregister.css';

const MobileRegister = props => (
	<div className="mobile--register">
		<Register history={props.history} />
	</div>
);

export default MobileRegister;
