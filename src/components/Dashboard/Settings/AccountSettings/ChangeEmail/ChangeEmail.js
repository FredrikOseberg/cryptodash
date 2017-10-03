import React, { Component } from 'react';
import { auth } from '../../../../../firebase';
import './changeemail.css';

class ChangeEmail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			emailVal: '',
			showSubmit: false,
			emailError: ''
		};

		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.setDefaultState = this.setDefaultState.bind(this);
	}

	validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	handleEmailChange(event) {
		if (event.target.value === '') {
			this.setState({ showSubmit: false });
		} else {
			this.setState({ emailVal: event.target.value });
			this.setState({ showSubmit: true });
		}
	}

	setDefaultState() {
		this.props.setDefaultState();
	}

	handleFormSubmit(event) {
		event.preventDefault();
		const inputExistsAndIsLongerThan5Characters = this.props.validate(this.state.emailVal);

		if (inputExistsAndIsLongerThan5Characters) {
			const isValidEmail = this.validateEmail(this.state.emailVal);
			isValidEmail &&
				auth.currentUser
					.updateEmail(this.state.emailVal)
					.then(() => {
						this.props.setDefaultState('Your email was changed successfully');
					})
					.catch(error => {
						console.log(error);
						this.setState({ showSubmit: false });
						this.setState({
							emailError:
								'Could not update your email. Please provide a valid email address and try again. '
						});
					});
		}
	}

	render() {
		let submitButtonClasses, emailErrorMessage, emailErrorMarkup, emailInputClasses;
		this.state.showSubmit
			? (submitButtonClasses = 'main-button change--email--button visible opacity static')
			: (submitButtonClasses = 'main-button change--email--button');

		emailErrorMessage = this.state.emailError;
		if (emailErrorMessage) {
			emailInputClasses = 'main--input account--settings--change--email--input main--input--error';
			emailErrorMarkup = <span className="main--input--error--message">{emailErrorMessage}</span>;
		} else {
			emailInputClasses = 'main--input account--settings--change--email--input';
		}
		return (
			<div className="account--settings--content">
				<h4>
					Change Email
					<i className="fa fa-arrow-left password--back" aria-hidden="true" onClick={this.setDefaultState} />
				</h4>
				<div className="account--settings--change--email--container">
					<form onSubmit={this.handleFormSubmit}>
						<div className="account--email--input--container">
							<label>New Email</label>
							<input type="email" className={emailInputClasses} onChange={this.handleEmailChange} />
							{emailErrorMarkup}
						</div>
						<button className={submitButtonClasses}>Change Email</button>
					</form>
				</div>
			</div>
		);
	}
}

export default ChangeEmail;
