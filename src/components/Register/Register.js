import React, { Component } from 'react';
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
		const user = firebase
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.catch(error => {
				console.log('handle error');
			});

		console.log(user);
	}
	render() {
		return (
			<div className="frontend--background">
				<div className="frontend--layover">
					<Header />
					<div className="container">
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

export default Register;
