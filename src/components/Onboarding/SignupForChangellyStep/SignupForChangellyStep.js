import React from 'react';
import changelly from '../../../img/changelly.png';
import { Link } from 'react-router-dom';
import './signupforchangelly.css';

const SignupForChangellyStep = props => (
	<div className="onboarding--card">
		<div className="onboarding--card--header">
			<h3>Hi,</h3>
			<p className="onboarding--card--header--name">{props.currentUser.displayName || props.currentUser.email}</p>
			<p>We just need a little more information to personalize your experience</p>
		</div>
		<Link to="https://changelly.com/?ref_id=172ccf841be7" target="_blank" rel="noopener referrer">
			<div className="onboarding--changelly">
				<h3>Sign up for Changelly</h3>
				<Link to="https://changelly.com/?ref_id=172ccf841be7" target="_blank" rel="noopener referrer">
					<p>
						In order to use the built in trading platform, you need to sign up for an account at Changelly.
						Don't worry, it's done in a minute.{' '}
						<span className="onboarding--changelly--cta">Click here to sign up.</span>
					</p>
				</Link>

				<img src={changelly} alt="company" />
			</div>
		</Link>
		<div className="main-button onboarding--button" onClick={props.handleChangellySubmit}>
			Continue
		</div>
	</div>
);

export default SignupForChangellyStep;
