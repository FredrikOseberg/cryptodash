import React from 'react';

const FacebookButton = props => (
	<div className="facebook--button social--login--button" onClick={props.handleFacebookAuth}>
		<i className="fa fa-facebook" aria-hidden="true" />
	</div>
);

export default FacebookButton;
