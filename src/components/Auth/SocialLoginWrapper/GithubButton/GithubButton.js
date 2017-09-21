import React from 'react';

const GithubButton = props => (
	<div className="github--button social--login--button" onClick={props.handleGithubAuth}>
		<i className="fa fa-github" aria-hidden="true" />
	</div>
);

export default GithubButton;
