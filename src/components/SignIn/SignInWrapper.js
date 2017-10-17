import React, { Component } from 'react';
import Header from '../Header/Header';
import MobileSignIn from '../MobileSignIn/MobileSignIn';
import SignIn from './SignIn';
import './signinwrapper.css';

class SignInWrapper extends Component {
	constructor(props) {
		super(props);

		this.state = {
			width: window.innerWidth
		};
	}

	componentWillMount() {
		window.addEventListener('resize', this.handleWindowSizeChange);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowSizeChange);
	}

	handleWindowSizeChange = () => {
		this.setState({ width: window.innerWidth });
	};

	render() {
		let markup;

		const isMobile = this.state.width <= 790;

		if (isMobile) {
			console.log('component is mobile');
			markup = <MobileSignIn history={this.props.history} reauth={false} />;
		} else {
			markup = (
				<div className="frontend--background">
					<Header />
					<div className="container register--container">
						<div className="register--box--container">
							<SignIn history={this.props.history} reauth={false} />
						</div>
					</div>
				</div>
			);
		}

		return <div className="sigininwrapper--container">{markup}</div>;
	}
}

export default SignInWrapper;
