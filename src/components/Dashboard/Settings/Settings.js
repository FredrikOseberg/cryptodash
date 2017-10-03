import React, { Component } from 'react';
import Nav from '../../Nav/Nav';
import WalletSettings from './WalletSettings/WalletSettings';
import CurrencySettings from './CurrencySettings/CurrencySettings';
import AccountSettings from './AccountSettings/AccountSettings';
import './settings.css';

class Settings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			settingsPage: 'Account',
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
					{showWalletSettings && <WalletSettings />}
					{showCurrencySettings && <CurrencySettings />}
					{showAccountSettings && <AccountSettings />}
				</div>
			</div>
		);
	}
}

export default Settings;
