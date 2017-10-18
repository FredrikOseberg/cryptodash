import React, { Component } from 'react';
import Nav from '../../Nav/Nav';
import WalletSettings from './WalletSettings/WalletSettings';
import CurrencySettings from './CurrencySettings/CurrencySettings';
import AccountSettings from './AccountSettings/AccountSettings';
import PersonalSettings from './PersonalSettings/PersonalSettings';
import { isMobile } from '../../HoC/IsMobile';
import './settings.css';

class Settings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			settingsPage: 'Personal Info',
			settingsPages: [
				{
					name: 'Personal Info',
					icon: 'fa fa-user'
				},
				{
					name: 'Wallets',
					icon: 'fa fa-folder-open'
				},
				{
					name: 'Currency',
					icon: 'fa fa-money'
				},
				{
					name: 'Account',
					icon: 'fa fa-key'
				}
			]
		};

		this.handleSettingsNavClick = this.handleSettingsNavClick.bind(this);
	}

	validate(input) {
		if (input.length === 0 || input.length < 5) {
			return false;
		} else {
			return true;
		}
	}

	handleSettingsNavClick(event) {
		const li = event.currentTarget;
		switch (li.dataset.target) {
			case 'Personal Info':
				this.setState({ settingsPage: 'Personal Info' });
				break;
			case 'Wallets':
				this.setState({ settingsPage: 'Wallets' });
				break;
			case 'Account':
				this.setState({ settingsPage: 'Account' });
				break;
			case 'Currency':
				this.setState({ settingsPage: 'Currency' });
				break;
			default:
				this.setState({ settingsPage: 'Personal Info' });
		}
	}

	render() {
		const showWalletSettings = this.state.settingsPage === 'Wallets';
		const showCurrencySettings = this.state.settingsPage === 'Currency';
		const showAccountSettings = this.state.settingsPage === 'Account';
		const showPersonalSettings = this.state.settingsPage === 'Personal Info';
		return (
			<div className="dashboard--settings">
				<div className="dashboard--settings--header">
					<Nav
						currentPage={this.state.settingsPage}
						onClickHandler={this.handleSettingsNavClick}
						pages={this.state.settingsPages}
					/>
				</div>
				<div className="dashboard--settings--content">
					{showWalletSettings && <WalletSettings isMobile={this.props.isMobile} />}
					{showCurrencySettings && <CurrencySettings isMobile={this.props.isMobile} />}
					{showPersonalSettings && (
						<PersonalSettings validate={this.validate} isMobile={this.props.isMobile} />
					)}
					{showAccountSettings && <AccountSettings validate={this.validate} isMobile={this.props.isMobile} />}
				</div>
			</div>
		);
	}
}

export default isMobile(Settings);
