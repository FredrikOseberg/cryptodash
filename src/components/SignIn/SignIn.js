import React, { Component } from 'react';
import firebase from '../../firebase';
import Header from '../Header/Header';
import SocialLoginWrapper from '../Auth/SocialLoginWrapper/SocialLoginWrapper';

class SignIn extends Component {
	constructor() {
		super();

		this.state = {
			emailErrMessage: '',
			passwordErrMessage: '',
			firebaseError: '',
			password: '',
			email: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.handleSocialError = this.handleSocialError.bind(this);
	}
	handleEmailChange(event) {
		this.setState({ email: event.target.value.toString().trim() });
	}
	handlePasswordChange(event) {
		this.setState({ password: event.target.value.toString().trim() });
	}
	handleSocialError(error) {
		let errorMessage;
		if (error.code) {
			errorMessage = error.message;
		} else {
			errorMessage = 'Something went wrong.';
		}
		this.setState({ firebaseError: errorMessage });
	}
	validateEmail() {
		const email = this.state.email;

		if (email.includes('@')) {
			return true;
		}
		this.setState({ emailErrMessage: 'You must provide a valid email.' });
		return false;
	}
	handleSubmit(event) {
		event.preventDefault();

		const validationPassed = this.validateEmail();

		if (validationPassed) {
			this.setState({ emailErrMessage: '' });
			const email = this.state.email;
			const password = this.state.password;
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then(user => {
					this.setState({ firebaseError: '' });
					console.log('logged in');
				})
				.catch(error => {
					const errorMessage = error.message;
					this.setState({ firebaseError: errorMessage });
				});
		}
	}
	render() {
		// Set email error messages if there are any
		let emailErrMessage = this.state.emailErrMessage,
			emailClasses,
			emailErrorMarkup;
		if (emailErrMessage) {
			emailClasses = 'auth--input auth--input--error';
			emailErrorMarkup = <span className="auth--input--error--message">{emailErrMessage}</span>;
		} else {
			emailClasses = 'auth--input';
		}
		// Set firebase error messaage if there are any
		let firebaseErrMessage = this.state.firebaseError,
			firebaseErrMarkup,
			passwordClasses;
		if (firebaseErrMessage) {
			firebaseErrMarkup = <span className="auth--input--error--message">{firebaseErrMessage}</span>;
			passwordClasses = 'auth--input auth--input--error';
		} else {
			firebaseErrMarkup = '';
			passwordClasses = 'auth--input';
		}
		return (
			<div className="frontend--background">
				<Header />
				<div className="container register--container">
					<div className="register--box--container">
						<div className="register--box box">
							<h3>Sign In</h3>
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
									</div>
									{firebaseErrMarkup}
									<button
										type="submit"
										className="auth--button main-button"
										onClick={this.handleSubmit}
									>
										Sign In
									</button>
								</div>
								<p>Or sign in with these</p>
								<SocialLoginWrapper handleError={this.handleSocialError} />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SignIn;