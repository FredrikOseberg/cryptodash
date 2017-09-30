import React, { Component } from 'react';
import Nav from '../../Nav/Nav';
import WalletSettings from './WalletSettings/WalletSettings';
import './settings.css';

class Settings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			settingsPage: 'Wallets',
			settingsPages: [
				{
					name: 'Personal Info',
					icon: 'fa fa-user'
				},
				{
					name: 'Wallets',
					icon: 'fa fa-money'
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
			default:
				this.setState({ settingsPage: 'Personal Info' });
		}
	}

	render() {
		const showWalletSettings = this.state.settingsPage === 'Wallets';
		return (
			<div className="dashboard--settings">
				<div className="dashboard--settings--header">
					<Nav
						currentPage={this.state.settingsPage}
						onClickHandler={this.handleSettingsNavClick}
						pages={this.state.settingsPages}
					/>
				</div>
				<div className="dashboard--settings--content">{showWalletSettings && <WalletSettings />}</div>
			</div>
		);
	}
}

export default Settings;
