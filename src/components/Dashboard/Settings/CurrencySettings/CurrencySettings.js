import React, { Component } from 'react';
import localCurrencyData from '../../../../localCurrencyData';
import { connect } from 'react-redux';
import { database } from '../../../../firebase';
import './currencysettings.css';

class CurrencySettings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			edit: false,
			localCurrency: this.props.localCurrency.currency,
			submitSuccess: ''
		};

		this.handleLocalCurrencyChange = this.handleLocalCurrencyChange.bind(this);
		this.handleCurrencySettingsSubmit = this.handleCurrencySettingsSubmit.bind(this);
	}

	handleLocalCurrencyChange(event) {
		const currency = event.target.value;
		this.setState({ localCurrency: currency });
		this.setState({ edit: true });
	}

	handleCurrencySettingsSubmit() {
		const storageLocation = database.ref('users/' + this.props.currentUser.uid + '/localCurrency');
		storageLocation.set(this.state.localCurrency);

		this.setState({ edit: false });
		this.setState({ submitSuccess: 'Currency updated successfully ' }, () => {
			setTimeout(() => {
				this.setState({ submitSuccess: '' });
			}, 5000);
		});
	}

	render() {
		let successFlashMessage;
		this.state.submitSuccess
			? (successFlashMessage = (
					<span className="currency--wallet--submit--success localcurrency--success">
						{this.state.submitSuccess}
					</span>
				))
			: (successFlashMessage = '');
		let buttonClasses;
		if (this.state.edit) {
			if (this.props.isMobile) {
				buttonClasses =
					'main-button currency--settings--button visible opacity static mobile--settings--button transition';
			} else {
				buttonClasses = 'main-button currency--settings--button visible opacity static transition';
			}
		} else {
			buttonClasses = 'main-button currency--settings--button';
		}

		return (
			<div className="currency--settings">
				<div className="currency--wallet--header">
					<h3>Current Currency Settings</h3>
				</div>
				<div className="currency--settings--content">
					<select
						className="currency--settings--select"
						onChange={this.handleLocalCurrencyChange}
						defaultValue={this.state.localCurrency}
					>
						{localCurrencyData.map(currency => {
							return (
								<option key={currency.id} value={currency.ticker}>
									{currency.name} ({currency.ticker})
								</option>
							);
						})}
					</select>
				</div>
				{successFlashMessage}
				<div className={buttonClasses} onClick={this.handleCurrencySettingsSubmit}>
					{this.props.isMobile ? <i className="fa fa-save" aria-hidden="true" /> : 'Update'}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	localCurrency: state.localCurrency,
	currentUser: state.auth
});

// const mapDispatchToProps = dispatch => ({
// 	addLocalCurrencyToState() {

// 	}
// })

export default connect(mapStateToProps)(CurrencySettings);
