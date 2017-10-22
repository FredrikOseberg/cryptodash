import React, { Component } from 'react';
import Wallet from '../../Dashboard/Sidebar/Wallet/Wallet';
import './mobilewallet.css';

class MobileWallet extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
		document.body.style.height = 'auto';
	}

	componentWillUnmount() {
		document.body.style.height = '100%';
	}

	render() {
		return (
			<div className="mobile--wallet">
				<Wallet />
			</div>
		);
	}
}

export default MobileWallet;
