import React, { Component } from 'react';
import './changepassword.css';

class ChangePassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showSubmit: false,
			showConfirm: false,
			passwordErrMessage: '',
			equalPasswordsErrMessage: '',
			password: '',
			confirmPassword: ''
		};

		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
		this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
	}

	handlePasswordChange(event) {
		this.setState({ passwordErrMessage: '' });
		this.setState({ password: event.target.value.toString().trim() });
		this.setState({ showConfirm: true });
	}

	handleConfirmPasswordChange(event) {
		this.setState({ confirmPassword: event.target.value.toString().trim() });
		this.setState({ showSubmit: true });
	}

	validatePassword() {
		const password = this.state.password;
		const passwordMustIncludePhrase =
			'Passwords must include a number, an uppercase character and be longer than 8 characters.';
		if (password.length >= 8) {
			if (/[A-Z]/.test(password)) {
				if (/\d/.test(password)) {
					return true;
				} else {
					this.setState(
						{
							passwordErrMessage: `Password must include a number. ${passwordMustIncludePhrase}`
						},
						() => {
							this.setState({ showConfirm: false });
						}
					);
				}
			} else {
				this.setState(
					{
						passwordErrMessage: `Password must include an uppercase letter. ${passwordMustIncludePhrase}`
					},
					() => {
						this.setState({ showConfirm: false });
					}
				);
			}
		} else {
			this.setState(
				{
					passwordErrMessage: `Password must be longer or equal to 8 characters. ${passwordMustIncludePhrase}`
				},
				() => {
					this.setState({ showConfirm: false });
				}
			);
		}
		return false;
	}

	handlePasswordSubmit(event) {
		event.preventDefault();
		const passwordsAreTheSame = this.state.password === this.state.confirmPassword;

		if (!passwordsAreTheSame) {
			this.setState({ equalPasswordsErrMessage: 'Passwords must be equal' });
		}

		const validationPassed = this.validatePassword();

		if (validationPassed && passwordsAreTheSame) {
			this.setState({ equalPasswordsErrMessage: '' });
			// Update password
			console.log('updating');
		}
	}

	render() {
		let passwordConfirmContainerClasses,
			submitButtonClasses,
			passwordErrorMessage,
			passwordClasses,
			passwordErrMarkup,
			equalPasswordsErrorMarkup;
		this.state.equalPasswordsErrMessage
			? (equalPasswordsErrorMarkup = (
					<span className="main--input--error--message">{this.state.equalPasswordsErrMessage}</span>
				))
			: '';
		this.state.showConfirm
			? (passwordConfirmContainerClasses = 'account--password--confirm--container visible opacity static')
			: (passwordConfirmContainerClasses = 'account--password--confirm--container');
		this.state.showSubmit
			? (submitButtonClasses = 'main-button change--password--button visible opacity static')
			: (submitButtonClasses = 'main-button change--password--button');
		passwordErrorMessage = this.state.passwordErrMessage;
		if (passwordErrorMessage) {
			passwordClasses =
				'main--input account--settings--password--input account--password--input main--input--error';
			passwordErrMarkup = <span className="main--input--error--message">{passwordErrorMessage}</span>;
		} else {
			passwordClasses = 'main--input account--settings--password--input account--password--input';
		}
		return (
			<div className="account--settings--content">
				<h4>Change Password</h4>
				<div className="account--settings--change--password--container">
					<form>
						<div className="account--password--input--container">
							<label>New Password</label>
							<input
								type="password"
								className={passwordClasses}
								onChange={this.handlePasswordChange}
								onBlur={this.validatePassword}
							/>
							{passwordErrMarkup}
						</div>
						<div className={passwordConfirmContainerClasses}>
							<label>Confirm Password</label>
							<input
								type="password"
								className="main--input account--settings--passsword--confirm--input account--password--input"
								onChange={this.handleConfirmPasswordChange}
							/>
							{equalPasswordsErrorMarkup}
						</div>
						<button className={submitButtonClasses} onClick={this.handlePasswordSubmit}>
							Change Password
						</button>
					</form>
				</div>
			</div>
		);
	}
}

export default ChangePassword;
