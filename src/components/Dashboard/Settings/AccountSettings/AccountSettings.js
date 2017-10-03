import React, { Component } from 'react';
import './accountsettings.css';
import { auth } from '../../../../firebase';
import ChangePassword from './ChangePassword/ChangePassword';

class AccountSettings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			accountPage: 'defaultState'
		};

		this.handlePasswordClick = this.handlePasswordClick.bind(this);
		this.handleEmailClick = this.handleEmailClick.bind(this);
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
			</div>
		);

		const emailFormMarkup = (
			<div className="account--settings--content">
				<div>Email</div>
			</div>
		);

		return (
			<div className="account--settings">
				<div className="currency--wallet--header">
					<h3>Account Settings</h3>
				</div>
				{showDefaultState && defaultMarkup}
				{showEmailEditView && emailFormMarkup}
				{showPasswordEditView && <ChangePassword />}
			</div>
		);
	}
}

export default AccountSettings;
