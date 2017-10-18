import React, { Component } from 'react';
import { auth } from '../../../../firebase';
import './personalsetting.css';

class PersonalSettings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			displayNameInput: auth.currentUser.displayName,
			displayNameErrorMessage: '',
			photoURLInput: auth.currentUser.photoURL,
			photoURLErrorMessage: '',
			submitSuccess: '',
			submitError: '',
			edit: false
		};

		this.handleDisplayNameOnChange = this.handleDisplayNameOnChange.bind(this);
		this.handlePhotoURLOnChange = this.handlePhotoURLOnChange.bind(this);
		this.handlePersonalInfoFormSubmit = this.handlePersonalInfoFormSubmit.bind(this);
	}

	handleDisplayNameOnChange(event) {
		this.setState({ displayNameErrorMessage: '' });
		this.setState({ displayNameInput: event.target.value.toString().trim() });
		this.setState({ edit: true });
	}

	handlePhotoURLOnChange(event) {
		this.setState({ photoURLErrorMessage: '' });
		this.setState({ photoURLInput: event.target.value.toString().trim() });
		this.setState({ edit: true });
	}

	handlePersonalInfoFormSubmit(event) {
		event.preventDefault();
		let validationPassed, validName, validPhotoURL;
		validName = this.props.validate(this.state.displayNameInput);
		validPhotoURL = this.props.validate(this.state.photoURLInput);

		if (!validName) {
			this.setState({ displayNameErrorMessage: 'You need to prive a valid name.' });
			this.setState({ edit: false });
		}

		if (!validPhotoURL) {
			this.setState({ photoURLErrorMessage: 'You need to provide a valid photo url' });
			this.setState({ edit: false });
		}

		if (validName || validPhotoURL) {
			validationPassed = true;
		}

		if (validationPassed) {
			auth.currentUser
				.updateProfile({
					displayName: this.state.displayNameInput,
					photoURL: this.state.photoURLInput
				})
				.then(() => {
					this.setState({ edit: false }, () => {
						this.setState({ submitSuccess: 'Your personal information was successfully updated.' }, () => {
							setTimeout(() => {
								this.setState({ submitSuccess: '' });
							}, 5000);
						});
					});
				})
				.catch(error => {
					this.setState({ edit: false }, () => {
						this.setState({
							submitError: 'Something went wrong with updating your information. Please try again. '
						});
					});
				});
		}
	}

	render() {
		let submitButtonClasses;
		if (this.state.edit) {
			if (this.props.isMobile) {
				submitButtonClasses =
					'main-button personal--info--button static opacity visible mobile--settings--button transition';
			} else {
				submitButtonClasses = 'main-button personal--info--button static opacity visible transition';
			}
		} else {
			submitButtonClasses = 'main-button personal--info--button';
		}

		let displayNameErrorMessage, displayNameErrorMarkup, displayNameInputClasses;
		displayNameErrorMessage = this.state.displayNameErrorMessage;
		if (displayNameErrorMessage) {
			displayNameErrorMarkup = <span className="main--input--error--message">{displayNameErrorMessage}</span>;
			displayNameInputClasses = 'main--input personal--info--input main--input--error';
		} else {
			displayNameInputClasses = 'main--input personal--info--input';
			displayNameErrorMarkup = '';
		}

		let photoURLErrorMessage, photoURLErrorMarkup, photoURLInputClasses;
		photoURLErrorMessage = this.state.photoURLErrorMessage;
		if (photoURLErrorMessage) {
			photoURLErrorMarkup = <span className="main--input--error--message">{photoURLErrorMessage}</span>;
			photoURLInputClasses = 'main--input personal--info--input main--input--error';
		} else {
			photoURLErrorMarkup = '';
			photoURLInputClasses = 'main--input personal--info--input';
		}

		let successFlashMessage;
		this.state.submitSuccess
			? (successFlashMessage = <span className="account--password--success">{this.state.submitSuccess}</span>)
			: (successFlashMessage = '');

		let submitErrorMessage;
		this.state.submitError
			? (submitErrorMessage = <span className="main--input--error--message">{this.state.submitError}</span>)
			: '';
		return (
			<div className="account--personal--settings">
				<div className="currency--wallet--header">
					<h3>Personal Info</h3>
				</div>
				<div className="account--personal--settings--container">
					<form onSubmit={this.handlePersonalInfoFormSubmit}>
						<div className="account--personal--info--input--container">
							<label>Display name</label>
							<input
								type="text"
								name="displayName"
								className={displayNameInputClasses}
								defaultValue={this.state.displayNameInput}
								onChange={this.handleDisplayNameOnChange}
							/>
							{displayNameErrorMarkup}
						</div>
						<div className="account--personal--info--input--container">
							<label>Photo URL</label>
							<input
								type="text"
								name="photoURL"
								className={photoURLInputClasses}
								defaultValue={this.state.photoURLInput}
								onChange={this.handlePhotoURLOnChange}
							/>
							{photoURLErrorMarkup}
							{submitErrorMessage}
							{successFlashMessage}
						</div>
						<button className={submitButtonClasses}>
							{this.props.isMobile ? <i className="fa fa-save" aria-hidden="true" /> : 'Update'}
						</button>
					</form>
				</div>
			</div>
		);
	}
}

export default PersonalSettings;
