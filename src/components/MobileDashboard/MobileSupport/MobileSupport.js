import React, { Component } from 'react';
import bitcoin from '../../../img/coins/bitcoin.png';
import ethereum from '../../../img/coins/ether.png';
import './mobilesupport.css';

class MobileSupport extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bitcoinAddress: '14SvDFzhxEPVg85f4m91JhPe5rKR6afhFd',
			ethereumAddress: '0xBAB6993b2f0624171C15F48a606Ac9FEf0016a70',
			copySuccess: ''
		};

		this.handleCopyClick = this.handleCopyClick.bind(this);
	}

	handleCopyClick(event) {
		const textField = document.createElement('textarea');
		let coinType = event.currentTarget.dataset.type;
		if (coinType === 'ETH') {
			textField.innerText = this.state.ethereumAddress;
		} else if (coinType === 'BTC') {
			textField.innerText = this.state.bitcoinAddress;
		}

		if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
			const input = document.querySelector(`.mobile--support--input--${coinType}`);

			var el = input;
			var editable = el.contentEditable;
			var readOnly = el.readOnly;
			el.contentEditable = true;
			el.readOnly = false;
			var range = document.createRange();
			range.selectNodeContents(el);
			var sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
			el.setSelectionRange(0, 999999);
			el.contentEditable = editable;
			el.readOnly = readOnly;

			var successful = document.execCommand('copy');

			var msg = successful ? 'successful ' : 'un-successful ';
		} else {
			textField.classList.add('copy--address--field');
			document.body.appendChild(textField);
			textField.select();
			document.execCommand('copy');
			textField.remove();
		}

		let successMessage = `You successfully copied the ${event.currentTarget.dataset.name} address.`;
		this.setState({ copySuccess: successMessage }, () => {
			setTimeout(() => {
				this.setState({ copySuccess: '' });
			}, 4000);
		});
	}

	render() {
		let successMarkup;
		if (this.state.copySuccess) {
			successMarkup = <span className="mobile--support--success--message">{this.state.copySuccess}</span>;
		} else {
			successMarkup = '';
		}

		return (
			<div className="mobile--support">
				<div className="mobile--support--header">
					<h3>Support this Project</h3>
				</div>
				<div className="mobile--support--container">
					<p className="mobile--support--subheader">
						If you are enjoying this project, consider buying me lunch. You can donate directly by using the
						addresses below, or support indirectly by{' '}
						<a href="https://changelly.com/?ref_id=172ccf841be7" rel="noopener noreferrer" target="_blank">
							<span className="mobile--support--link">
								signing up for an account on changelly using this url.
							</span>
						</a>
					</p>
					<div className="mobile--support--address--container">
						<div className="mobile--support--bitcoin--address">
							<h3>Bitcoin</h3>
							<div className="mobile--support--address">
								<img src={bitcoin} alt="Bitcoin" />
								<input
									className="main--input mobile--support--input mobile--support--input--BTC"
									disabled
									value={this.state.bitcoinAddress}
								/>
							</div>
							<div
								className="mobile--support--copy"
								data-type="BTC"
								onClick={this.handleCopyClick}
								data-name="Bitcoin"
							>
								<i className="fa fa-copy" aria-hidden="true" />
							</div>
						</div>
						{successMarkup}
						<div className="mobile--support--ethereum--address">
							<h3>Ethereum</h3>
							<div className="mobile--support--address">
								<img src={ethereum} alt="Ethereum" />
								<input
									className="main--input mobile--support--input mobile--support--input--ETH"
									disabled
									value={this.state.ethereumAddress}
								/>
							</div>
							<div
								className="mobile--support--copy"
								data-type="ETH"
								onClick={this.handleCopyClick}
								data-name="Ethereum"
							>
								<i className="fa fa-copy" aria-hidden="true" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MobileSupport;
