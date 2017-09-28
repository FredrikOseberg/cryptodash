import React, { Component } from 'react';
import { auth, database, githubAuthProvider, facebookAuthProvider, googleAuthProvider } from '../../../firebase';
import { clearCurrency } from '../../../actions/currencies';
import { connect } from 'react-redux';
import GithubButton from './GithubButton/GithubButton';
import FacebookButton from './FacebookButton/FacebookButton';
import GoogleButton from './GoogleButton/GoogleButton';

class SocialLoginWrapper extends Component {
	constructor(props) {
		super(props);

		this.addCurrenciesToUser = this.addCurrenciesToUser.bind(this);
		this.handleSocialAuth = this.handleSocialAuth.bind(this);
		this.actionAfterSignin = this.actionAfterSignin.bind(this);
		this.userHasCurrencies = this.userHasCurrencies.bind(this);
	}
	handleSocialAuth(provider) {
		return () => {
			auth
				.signInWithPopup(provider)
				.then(result => this.actionAfterSignin(result))
				.catch(error => this.props.handleError(error));
		};
	}
	actionAfterSignin(result) {
		return new Promise(resolve => {
			const uniqueId = result.user.uid;
			this.userHasCurrencies(uniqueId, resolve);
		});
	}
	addCurrenciesToUser(uid, resolve) {
		const storageLocation = database.ref('users/' + uid + '/currencies');

		this.props.selectedCurrencies.forEach(currency => {
			storageLocation.child(currency.symbol).set(currency);
		});

		this.props.clearCurrencyState();
		this.props.history.push('/');

		resolve();
	}
	userHasCurrencies(uid, resolve) {
		const storageLocation = database.ref('users/' + uid);
		storageLocation.once('value', snapshot => {
			if (!snapshot.hasChild('currencies')) {
				this.addCurrenciesToUser(uid, resolve);
			} else {
				this.props.history.push('/');
			}
		});
	}

	render() {
		const handleGithubAuth = this.handleSocialAuth(githubAuthProvider);
		const handleGoogleAuth = this.handleSocialAuth(googleAuthProvider);
		const handleFacebookAuth = this.handleSocialAuth(facebookAuthProvider);
		return (
			<div className="social--login--container">
				<GithubButton handleGithubAuth={handleGithubAuth} />
				<GoogleButton handleGoogleAuth={handleGoogleAuth} />
				<FacebookButton handleFacebookAuth={handleFacebookAuth} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	selectedCurrencies: state.selectedCurrencies
});

const mapDispatchToProps = dispatch => ({
	clearCurrencyState() {
		dispatch(clearCurrency());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialLoginWrapper);
