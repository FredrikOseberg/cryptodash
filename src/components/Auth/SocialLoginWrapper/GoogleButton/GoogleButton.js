import React from 'react';

const GoogleButton = props => (
	<div className="google--button social--login--button" onClick={props.handleGoogleAuth}>
		<i className="fa fa-google" aria-hidden="true" />
	</div>
);

export default GoogleButton;
