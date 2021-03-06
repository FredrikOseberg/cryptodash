import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from '../../firebase';
import { addCurrency, clearCurrency } from '../../actions/currencies';
import { isMobile } from '../HoC/IsMobile';
import { portfolioEntry } from '../../events/portfolioevents';
import Loading from '../Loading/Loading';
import localCurrencyData from '../../localCurrencyData';
import SearchCurrencies from '../SearchCurrencies/SearchCurrencies';
import CryptoCurrencyStep from './CryptoCurrencyStep/CryptoCurrencyStep';
import LocalCurrencyStep from './LocalCurrencyStep/LocalCurrencyStep';
import SignupForChangellyStep from './SignupForChangellyStep/SignupForChangellyStep';
import WalletInfoStep from './WalletInfoStep/WalletInfoStep';
import map from 'lodash/map';
import './onboarding.css';

class Onboarding extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clickedExpandBox: false,
			amountOfSteps: 3,
			step: 'cryptoCurrencyStep',
			localCurrency: 'USD',
			validationError: '',
			loading: true,
			showStep: false
		};

		this.handleClickedExpand = this.handleClickedExpand.bind(this);
		this.handleCurrencySubmit = this.handleCurrencySubmit.bind(this);
		this.handleLocalCurrencySubmit = this.handleLocalCurrencySubmit.bind(this);
		this.handleLocalCurrencyChange = this.handleLocalCurrencyChange.bind(this);
		this.checkFirebaseForCryptoCurrencyValue = this.checkFirebaseForCryptoCurrencyValue.bind(this);
		this.updateSelectedCurrencies = this.updateSelectedCurrencies.bind(this);
		this.handleWalletInfoSubmit = this.handleWalletInfoSubmit.bind(this);
		this.handleFinishLaterClick = this.handleFinishLaterClick.bind(this);
		this.handleChangellySubmit = this.handleChangellySubmit.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			this.checkFirebaseForCryptoCurrencyValue().then(() => {
				const storageLocation = database.ref('users/' + this.props.currentUser.uid);
				storageLocation.once('value', snapshot => {
					this.setState({ loading: false });
					this.setState({ showStep: true });
					if (snapshot.hasChild('localCurrency')) {
						this.setState({ step: 'setWalletInfoStep' });
					}
				});
			});
			this.updateSelectedCurrencies();
		}, 1000);
	}

	updateSelectedCurrencies() {
		this.props.clearCurrenciesFromState();
		const storageLocation = database.ref('users/' + this.props.currentUser.uid + '/currencies');

		storageLocation.once('value', snapshot => {
			const currencies = snapshot.val();
			// Lodash Object Map
			map(currencies, currency => {
				this.props.addCurrencyToState({ payload: currency });
			});
		});
	}

	checkFirebaseForCryptoCurrencyValue() {
		return new Promise(resolve => {
			const storageLocation = database.ref('users/' + this.props.currentUser.uid);
			storageLocation.once('value', snapshot => {
				if (snapshot.hasChild('currencies')) {
					this.setState({ step: 'localCurrencyStep' });
					this.setState({ amountOfSteps: 2 });
				}
				resolve();
			});
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

		this.updateSelectedCurrencies();
	}

	handleLocalCurrencyChange(event) {
		this.setState({ localCurrency: event.target.value });
	}

	handleLocalCurrencySubmit() {
		const storageLocation = database.ref('users/' + this.props.currentUser.uid);

		storageLocation.child('localCurrency').set(this.state.localCurrency);

		this.setState({ step: 'signupForChangellyStep' });

		if (this.props.isMobile) {
			this.handleFinishLaterClick();
		}
	}

	handleChangellySubmit() {
		this.setState({ step: 'setWalletInfoStep' });
	}

	handleFinishLaterClick() {
		const userStorageLocation = database.ref('users/' + this.props.currentUser.uid);
		userStorageLocation.child('completedOnboarding').set(true);

		this.props.dataSetup();
	}

	handleWalletInfoSubmit(event) {
		event.preventDefault();
		// Validation
		let validationPassed = false,
			count = 0;

		this.props.selectedCurrencies.forEach((currency, index) => {
			if (currency.wallet) {
				if (currency.wallet.amount && currency.wallet.wallet) {
					count += 1;
				}
				if (count === this.props.selectedCurrencies.length) {
					validationPassed = true;
				}
			}
		});

		if (validationPassed) {
			this.setState({ validationError: '' });
			const storageLocation = database.ref('users/' + this.props.currentUser.uid + '/currencies');

			this.props.selectedCurrencies.forEach(currency => {
				storageLocation
					.child(currency.symbol)
					.child('wallet')
					.set({
						amount: currency.wallet.amount,
						wallet: currency.wallet.wallet
					});

				portfolioEntry(currency.wallet.amount, currency.name, currency.img, Date.now(), 'add');
			});

			const userStorageLocation = database.ref('users/' + this.props.currentUser.uid);
			userStorageLocation.child('completedOnboarding').set(true);

			this.props.dataSetup();
		} else {
			this.setState({
				validationError:
					'Please provide input in each field. Numbers for amounts and text input for wallet addresses. '
			});
		}
	}

	render() {
		let onboardingStep;
		const loading = <Loading />;
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
		} else if (this.state.step === 'signupForChangellyStep') {
			onboardingStep = (
				<SignupForChangellyStep
					handleChangellySubmit={this.handleChangellySubmit}
					currentUser={this.props.currentUser}
				/>
			);
		} else if (this.state.step === 'setWalletInfoStep') {
			onboardingStep = (
				<WalletInfoStep
					currentUser={this.props.currentUser}
					selectedCurrencies={this.props.selectedCurrencies}
					handleWalletInfoSubmit={this.handleWalletInfoSubmit}
					handleFinishLaterClick={this.handleFinishLaterClick}
					validationError={this.state.validationError}
				/>
			);
		}

		return (
			<div className="onboarding">
				<div className="onboarding--background">
					<div className="onboarding--container">
						{this.state.loading && loading}
						{this.state.showStep && onboardingStep}
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

const mapDispatchToProps = dispatch => ({
	addCurrencyToState(obj) {
		dispatch(addCurrency(obj));
	},
	clearCurrenciesFromState() {
		dispatch(clearCurrency());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(isMobile(Onboarding));
