import React, { Component } from 'react';
import { isMobile } from '../HoC/IsMobile';
import { connect } from 'react-redux';
import firebase from '../../firebase';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import Register from './Register';
import MobileRegister from '../MobileRegister/MobileRegister';

class RegisterWrapper extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
			if (!user) {
				this.setState({ loading: false });
			}
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		let stateInfo;
		if (this.props.selectedCurrencies.length > 0) {
			stateInfo = (
				<div className="register--state--info">
					<h3>Finish your registration in order to follow these currencies</h3>
					{this.props.selectedCurrencies.map(currency => {
						return (
							<img
								src={currency.img}
								key={currency.id}
								className="register--state--img"
								alt={currency.name}
							/>
						);
					})}
				</div>
			);
		}

		let markup;

		if (this.props.isMobile) {
			markup = <MobileRegister history={this.props.history} />;
		} else {
			markup = (
				<div className="frontend--background">
					<Header />
					<div className="container register--container">{stateInfo}</div>
					<Register history={this.props.history} />
				</div>
			);
		}

		if (this.state.loading) {
			markup = <Loading />;
		}

		return <div className="registerwrapper--container">{markup}</div>;
	}
}

const mapStateToProps = state => ({
	selectedCurrencies: state.selectedCurrencies
});

export default connect(mapStateToProps)(isMobile(RegisterWrapper));
