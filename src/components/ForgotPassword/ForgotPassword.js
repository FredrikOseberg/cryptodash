import React, { Component } from 'react';
import { auth } from '../../firebase';
import { isMobile } from '../HoC/IsMobile';
import MobileBackButton from '../MobileBackButton/MobileBackButton';
import Header from '../Header/Header';
import './forgotpassword.css';

class ForgotPassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			errorMessage: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();

		const validationPassed = this.validateEmail();

		if (validationPassed) {
			this.setState({ errorMessage: '' });
			const emailAddress = this.state.email;
			auth
				.sendPasswordResetEmail(emailAddress)
				.then(() => {
					this.props.history.push('/');
				})
				.catch(error => {
					this.setState({ errorMessage: error.message });
				});
		}
	}

	handleInputChange(event) {
		this.setState({ errorMessage: '' });
		this.setState({ email: event.target.value });
	}

	validateEmail() {
		const email = this.state.email;

		if (email.includes('@')) {
			return true;
		}
		this.setState({ errorMessage: 'You must provide a valid email.' });
		return false;
	}

	render() {
		let emailErrMessage = this.state.errorMessage,
			emailClasses,
			emailErrorMarkup;
		if (emailErrMessage) {
			emailClasses = 'main--input main--input--error';
			emailErrorMarkup = <span className="main--input--error--message">{emailErrMessage}</span>;
		} else {
			emailClasses = 'main--input';
		}

		let headerMarkup, mobileBackButton;

		if (this.props.isMobile) {
			headerMarkup = '';
			mobileBackButton = <MobileBackButton history={this.props.history} emailReset={true} />;
		} else {
			headerMarkup = <Header />;
			mobileBackButton = '';
		}

		return (
			<div className="frontend--background">
				{headerMarkup}
				<div className="forgot--password">
					{mobileBackButton}
					<div className="container register--container">
						<div className="register--box--container">
							<div className="register--box">
								<h3>Reset Password</h3>
								<form>
									<div className="register--box--input--group">
										<label htmlFor="email">Email</label>
										<input
											type="text"
											name="email"
											className={emailClasses}
											onChange={this.handleInputChange}
										/>
										{emailErrorMarkup}
									</div>
									<button
										type="submit"
										className="auth--button main-button"
										onClick={this.handleSubmit}
									>
										Send Reset Email
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default isMobile(ForgotPassword);
