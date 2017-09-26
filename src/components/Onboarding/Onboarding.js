import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from '../../firebase';
import localCurrencyData from '../../localCurrencyData';
import SearchCurrencies from '../SearchCurrencies/SearchCurrencies';
import CryptoCurrencyStep from './CryptoCurrencyStep/CryptoCurrencyStep';
import LocalCurrencyStep from './LocalCurrencyStep/LocalCurrencyStep';
import './onboarding.css';

// 1. If the logged in user has no currencies, choose crypto currencies.
// 2. Set user Currency
// 3. Set user wallet keys and amount.
// 4. Set completedOnboarding to true in databse

class Onboarding extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clickedExpandBox: false,
			amountOfSteps: 3,
			step: 'cryptoCurrencyStep',
			localCurrency: 'AUD'
		};

		this.handleClickedExpand = this.handleClickedExpand.bind(this);
		this.handleCurrencySubmit = this.handleCurrencySubmit.bind(this);
		this.handleLocalCurrencySubmit = this.handleLocalCurrencySubmit.bind(this);
		this.handleLocalCurrencyChange = this.handleLocalCurrencyChange.bind(this);
	}

	componentDidMount() {
		const storageLocation = database.ref('users/' + this.props.currentUser.uid);
		storageLocation.once('value', snapshot => {
			if (snapshot.hasChild('currencies')) {
				this.setState({ step: 'localCurrencyStep' });
				this.setState({ amountOfSteps: 2 });
			}
		});
	}

	handleClickedExpand() {
		this.setState({ clickedExpandBox: !this.state.clickedExpandBox });
	}

	handleCurrencySubmit() {
		const storageLocation = database.ref('users/' + this.props.currentUser.uid + '/currencies');

		this.props.selectedCurrencies.forEach(currency => {
			storageLocation.child(currency.symbol).set(currency);
		});

		this.setState({ step: 'localCurrencyStep' });
	}

	handleLocalCurrencyChange(event) {
		this.setState({ localCurrency: event.target.value });
	}

	handleLocalCurrencySubmit() {
		console.log('running');
		const storageLocation = database.ref('users/' + this.props.currentUser.uid);

		storageLocation.child('localCurrency').set(this.state.localCurrency);

		this.setState({ step: 'setWalletInfoStep' });
	}

	render() {
		let onboardingStep;
		if (this.state.step === 'cryptoCurrencyStep') {
			onboardingStep = (
				<CryptoCurrencyStep
					handleClickedExpand={this.handleClickedExpand}
					handleCurrencySubmit={this.handleCurrencySubmit}
					currentUser={this.props.currentUser}
				/>
			);
		} else if (this.state.step === 'localCurrencyStep') {
			onboardingStep = (
				<LocalCurrencyStep
					handleLocalCurrencySubmit={this.handleLocalCurrencySubmit}
					handleLocalCurrencyChange={this.handleLocalCurrencyChange}
					currentUser={this.props.currentUser}
					currencyData={localCurrencyData}
				/>
			);
		}
		return (
			<div className="onboarding">
				<div className="frontend--background">
					<div className="onboarding--container">
						{onboardingStep}
						<SearchCurrencies
							data={this.props.data}
							showSearch={this.state.clickedExpandBox}
							handleClickedExpand={this.handleClickedExpand}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	selectedCurrencies: state.selectedCurrencies,
	currentUser: state.auth
});

export default connect(mapStateToProps)(Onboarding);
