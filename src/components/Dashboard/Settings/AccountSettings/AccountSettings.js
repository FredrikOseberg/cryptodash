import React, { Component } from 'react';
import './accountsettings.css';
import { auth } from '../../../../firebase';
import ChangePassword from './ChangePassword/ChangePassword';
import ChangeEmail from './ChangeEmail/ChangeEmail';

class AccountSettings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			accountPage: 'defaultState',
			successMessage: ''
		};

		this.handlePasswordClick = this.handlePasswordClick.bind(this);
		this.handleEmailClick = this.handleEmailClick.bind(this);
		this.setDefaultState = this.setDefaultState.bind(this);
	}

	setDefaultState(flashMessage) {
		this.setState({ accountPage: 'defaultState' });

		if (flashMessage) {
			this.setState({ successMessage: flashMessage }, () => {
				setTimeout(() => {
					this.setState({ successMessage: '' });
				}, 5000);
			});
		}
	}

	handlePasswordClick() {
		// Set up re-authentication
		this.setState({ accountPage: 'password' });
	}

	handleEmailClick() {
		// Set up re-authentication
		this.setState({ accountPage: 'email' });
	}

	render() {
		const showDefaultState = this.state.accountPage === 'defaultState';
		const showPasswordEditView = this.state.accountPage === 'password';
		const showEmailEditView = this.state.accountPage === 'email';

		let successFlashMessage;
		this.state.successMessage
			? (successFlashMessage = <span className="account--password--success">{this.state.successMessage}</span>)
			: (successFlashMessage = '');

		const defaultMarkup = (
			<div className="account--settings--content">
				<div className="account--settings--edit--buttons--container">
					<div
						className="account--settings--edit--button"
						data-target="email"
						onClick={this.handleEmailClick}
					>
						<i className="fa fa-envelope-o" aria-hidden="true" />
						<p>Edit Email</p>
					</div>
					<div
						className="account--settings--edit--button"
						data-target="password"
						onClick={this.handlePasswordClick}
					>
						<i className="fa fa-lock" aria-hidden="true" />
						<p>Edit Password</p>
					</div>
				</div>
				{successFlashMessage}
			</div>
		);

		return (
			<div className="account--settings">
				<div className="currency--wallet--header">
					<h3>Account Settings</h3>
				</div>
				{showDefaultState && defaultMarkup}
				{showEmailEditView && (
					<ChangeEmail validate={this.props.validate} setDefaultState={this.setDefaultState} />
				)}
				{showPasswordEditView && <ChangePassword setDefaultState={this.setDefaultState} />}
			</div>
		);
	}
}

export default AccountSettings;
