import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from '../../firebase';
import firebase from '../../firebase';
import Recaptcha from 'react-gcaptcha';
import SocialLoginWrapper from '../Auth/SocialLoginWrapper/SocialLoginWrapper';

class Register extends Component {
	constructor() {
		super();

		this.state = {
			emailErrMessage: '',
			passwordErrMessage: '',
			firebaseError: '',
			password: '',
			email: '',
			verifiedUser: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
		this.validateInput = this.validateInput.bind(this);
		this.handleSocialError = this.handleSocialError.bind(this);
		this.verifyCallback = this.verifyCallback.bind(this);
	}
	componentDidMount() {
		this.refs.registerPassword.focus();
	}
	verifyCallback() {
		this.setState({ verifiedUser: true });
	}
	handleEmailChange(event) {
		this.setState({ email: event.target.value.toString().trim() });
	}
	handlePasswordChange(event) {
		this.setState({ password: event.target.value.toString().trim() });
	}
	validateEmail() {
		const email = this.state.email;

		if (email.includes('@')) {
			return true;
		}
		this.setState({ emailErrMessage: 'You must provide a valid email.' });
		return false;
	}
	validatePassword() {
		const password = this.state.password;
		if (password.length >= 8) {
			if (/[A-Z]/.test(password)) {
				if (/\d/.test(password)) {
					return true;
				} else {
					this.setState({ passwordErrMessage: 'Password must include a number.' });
				}
			} else {
				this.setState({ passwordErrMessage: 'Password must include an uppercase letter.' });
			}
		} else {
			this.setState({ passwordErrMessage: 'Password must be longer or equal to 8 characters.' });
		}
		return false;
	}
	validateInput() {
		const validEmail = this.validateEmail();
		const validPassword = this.validatePassword();

		if (validEmail) {
			this.setState({ emailErrMessage: '' });
		}

		if (validPassword) {
			this.setState({ passwordErrMessage: '' });
		}

		if (validEmail && validPassword) {
			return true;
		}
	}
	handleSubmit(event) {
		event.preventDefault();

		const validationPassed = this.validateInput();

		if (this.state.verifiedUser) {
			if (validationPassed) {
				const email = this.state.email;
				const password = this.state.password;
				firebase
					.auth()
					.createUserWithEmailAndPassword(email, password)
					.then(user => {
						const storageLocation = database.ref('users/' + user.uid + '/currencies');

						this.props.selectedCurrencies.forEach(currency => {
							storageLocation.child(currency.symbol).set(currency);
						});

						this.setState({ email: '' });
						this.setState({ password: '' });

						this.props.history.push('/');
					})
					.catch(error => {
						let errorMessage;
						if (error.code) {
							errorMessage = error.message;
						} else {
							errorMessage = 'Something went wrong.';
						}
						this.setState({ firebaseError: errorMessage });
					});
			}
		} else {
			this.setState({ firebaseError: 'Click the recaptcha in order to continue with your registration' });
		}
	}
	// Handle errors that happens when a user tries to log in with a social account
	handleSocialError(error) {
		let errorMessage;
		if (error.code) {
			errorMessage = error.message;
		} else {
			errorMessage = 'Something went wrong.';
		}
		this.setState({ firebaseError: errorMessage });
	}
	render() {
		// Set email error messages if there are any
		let emailErrMessage = this.state.emailErrMessage,
			emailClasses,
			emailErrorMarkup;
		if (emailErrMessage) {
			emailClasses = 'main--input main--input--error';
			emailErrorMarkup = <span className="main--input--error--message">{emailErrMessage}</span>;
		} else {
			emailClasses = 'main--input';
		}
		// Set password error messages if there are any
		let passwordErrMessage = this.state.passwordErrMessage,
			passwordClasses,
			passwordErrMarkup;
		if (passwordErrMessage) {
			passwordClasses = 'main--input main--input--error';
			passwordErrMarkup = <span className="main--input--error--message">{passwordErrMessage}</span>;
		} else {
			passwordClasses = 'main--input';
		}
		// Set firebase error messaage if there are any
		let firebaseErrMessage = this.state.firebaseError,
			firebaseErrMarkup;
		firebaseErrMessage
			? (firebaseErrMarkup = <span className="main--input--error--message">{firebaseErrMessage}</span>)
			: (firebaseErrMarkup = '');
		return (
			<div className="register--box--container">
				<div className="register--box box">
					<h3>Register</h3>
					<form>
						<div className="register--box--input--container">
							<div className="register--box--input--group">
								<label htmlFor="email">Email</label>
								<input
									type="text"
									name="email"
									className={emailClasses}
									onChange={this.handleEmailChange}
								/>
								{emailErrorMarkup}
							</div>
							<div className="register--box--input--group">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									name="password"
									className={passwordClasses}
									ref="registerPassword"
									onChange={this.handlePasswordChange}
								/>
								{passwordErrMarkup}
							</div>
							{firebaseErrMarkup}
							<Recaptcha
								sitekey="6LfmIzUUAAAAACy4n-7a9BLUYITzQ3dSZgDSrAoE"
								verifyCallback={this.verifyCallback}
							/>
							<button type="submit" className="auth--button main-button" onClick={this.handleSubmit}>
								Register
							</button>
						</div>
						<p>Or sign in with these</p>
						<SocialLoginWrapper handleError={this.handleSocialError} history={this.props.history} />
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	selectedCurrencies: state.selectedCurrencies
});

export default connect(mapStateToProps)(Register);
