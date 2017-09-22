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
		this.handleGithubAuth = this.handleGithubAuth.bind(this);
		this.handleFacebookAuth = this.handleFacebookAuth.bind(this);
		this.handleGoogleAuth = this.handleGoogleAuth.bind(this);
		this.actionAfterSignin = this.actionAfterSignin.bind(this);
		this.userHasCurrencies = this.userHasCurrencies.bind(this);
	}
	handleGithubAuth() {
		auth.signInWithPopup(githubAuthProvider).then(result => this.actionAfterSignin(result));
	}
	handleFacebookAuth() {
		auth.signInWithPopup(facebookAuthProvider).then(result => this.actionAfterSignin(result));
	}
	handleGoogleAuth() {
		auth.signInWithPopup(googleAuthProvider).then(result => this.actionAfterSignin(result));
	}
	actionAfterSignin(result) {
		const uniqueId = result.user.uid;
		this.userHasCurrencies(uniqueId);
		this.props.clearCurrencyState();
	}
	addCurrenciesToUser(uid) {
		const storageLocation = database.ref('users/' + uid + '/currencies');

		this.props.selectedCurrencies.forEach(currency => {
			storageLocation.child(currency.symbol).set(currency.symbol);
		});
	}
	userHasCurrencies(uid) {
		const storageLocation = database.ref('users/' + uid);
		storageLocation.once('value', snapshot => {
			if (!snapshot.hasChild('currencies')) {
				this.addCurrenciesToUser(uid);
			}
		});
	}

	render() {
		return (
			<div className="social--login--container">
				<GithubButton handleGithubAuth={this.handleGithubAuth} />
				<GoogleButton handleGoogleAuth={this.handleGoogleAuth} />
				<FacebookButton handleFacebookAuth={this.handleFacebookAuth} />
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
