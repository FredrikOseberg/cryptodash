import React, { Component } from 'react';
import { isMobile } from '../HoC/IsMobile';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Register from './Register';
import MobileRegister from '../MobileRegister/MobileRegister';

class RegisterWrapper extends Component {
	constructor(props) {
		super(props);
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

		return <div className="registerwrapper--container">{markup}</div>;
	}
}

const mapStateToProps = state => ({
	selectedCurrencies: state.selectedCurrencies
});

export default connect(mapStateToProps)(isMobile(RegisterWrapper));
