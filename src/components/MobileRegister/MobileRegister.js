import React from 'react';
import Register from '../Register/Register';
import MobileBackButton from '../MobileBackButton/MobileBackButton';
import './mobileregister.css';

const MobileRegister = props => (
	<div className="mobile--register">
		<MobileBackButton history={props.history} />
		<Register history={props.history} />
	</div>
);

export default MobileRegister;
