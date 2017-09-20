import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../firebase';
import Header from '../Header/Header';

class Register extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
	}
	handleEmailChange(event) {
		this.setState({ email: event.target.value });
	}
	handlePasswordChange(event) {
		this.setState({ password: event.target.value });
	}
	handleSubmit(event) {
		event.preventDefault();
		// Validation here

		const user = firebase
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.catch(error => {
				// Handle errors
				console.log('handle error');
			});

		// Add state to database under user uid
		console.log(user);
	}
	render() {
		// Reads global application state and outputs pictures of current selected currencies
		let stateInfo;
		if (this.props.selectedCurrencies.length > 0) {
			stateInfo = (
				<div className="register--state--info">
					<h3>Finish your registration in order to follow these currencies</h3>
					{this.props.selectedCurrencies.map(currency => {
						return <img src={currency.img} key={currency.id} className="register--state--img" />;
					})}
				</div>
			);
		}
		return (
			<div className="frontend--background">
				<div className="frontend--layover">
					<Header />
					<div className="container register--container">
						{stateInfo}
						<div className="register--box--container">
							<div className="register--box box">
								<h3>Register</h3>
								<div className="register--box--input--container">
									<div className="register--box--input--group">
										<label htmlFor="email">Email</label>
										<input
											type="text"
											name="email"
											className="auth--input"
											onChange={this.handleEmailChange}
										/>
									</div>
									<div className="register--box--input--group">
										<label htmlFor="password">Password</label>
										<input
											type="password"
											name="password"
											className="auth--input"
											onChange={this.handlePasswordChange}
										/>
									</div>
									<button
										type="submit"
										className="auth--button main-button"
										onClick={this.handleSubmit}
									>
										Register
									</button>
								</div>
								<p>Or sign in with these</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	selectedCurrencies: state.selectedCurrencies
});

export default connect(mapStateToProps)(Register);
