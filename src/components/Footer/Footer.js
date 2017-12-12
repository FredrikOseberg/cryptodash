import React, { Component } from 'react';
import bitcoin from '../../img/coins/bitcoin.png';
import ethereum from '../../img/coins/ether.png';
import { Link } from 'react-router-dom';
import './footer.css';

class Footer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bitcoinAddress: '14SvDFzhxEPVg85f4m91JhPe5rKR6afhFd',
			ethereumAddress: '0xBAB6993b2f0624171C15F48a606Ac9FEf0016a70',
			copyEtherSuccess: '',
			copyBitcoinSuccess: ''
		};

		this.handleCopyClick = this.handleCopyClick.bind(this);
		this.setCopySuccessMessage = this.setCopySuccessMessage.bind(this);
	}

	handleCopyClick(event) {
		const textField = document.createElement('textarea');
		let coinType = event.currentTarget.dataset.type;
		if (coinType === 'ETH') {
			textField.innerText = this.state.ethereumAddress;
		} else if (coinType === 'BTC') {
			textField.innerText = this.state.bitcoinAddress;
		}

		textField.classList.add('copy--address--field');
		document.body.appendChild(textField);
		textField.select();
		document.execCommand('copy');
		textField.remove();

		this.setCopySuccessMessage(coinType);
	}

	setCopySuccessMessage(coinType) {
		if (coinType === 'ETH') {
			this.setState({ copyEtherSuccess: 'Copied' }, () => {
				setTimeout(() => {
					this.setState({ copyEtherSuccess: '' });
				}, 3000);
			});
		} else {
			this.setState({ copyBitcoinSuccess: 'Copied' }, () => {
				setTimeout(() => {
					this.setState({ copyBitcoinSuccess: '' });
				}, 3000);
			});
		}
	}

	render() {
		let copyEtherSuccessMarkup, copyBitcoinSuccessMarkup;
		this.state.copyEtherSuccess
			? (copyEtherSuccessMarkup = (
					<div className="footer--copy--flash--message">{this.state.copyEtherSuccess}</div>
				))
			: (copyEtherSuccessMarkup = '');

		this.state.copyBitcoinSuccess
			? (copyBitcoinSuccessMarkup = (
					<div className="footer--copy--flash--message">{this.state.copyBitcoinSuccess}</div>
				))
			: (copyBitcoinSuccessMarkup = '');

		let mainFooterClasses;

		if (this.props.frontend) {
			mainFooterClasses = 'footer footer--frontend';
		} else {
			mainFooterClasses = 'footer';
		}
		return (
			<div className={mainFooterClasses}>
				<div className="footer--container">
					<div className="footer--logo">
						<h1>CryptoDasher</h1>
						<p>
							<i className="fa fa-envelope" />
							info@cryptodasher.com
						</p>
					</div>
					<div className="footer--links">
						<h3>Resources</h3>
						<ul>
							<Link to="/blog">
								<li>Blog</li>
							</Link>
							<Link to="/all">
								<li>All Coins</li>
							</Link>
							<Link
								to="http://www.changelly.com/?ref_id=172ccf841be7"
								target="_blank"
								rel="noreferrer noopener"
							>
								<li>Trade</li>
							</Link>
						</ul>
					</div>
					<div className="footer--support">
						<h3>Support this Project</h3>
						<div className="footer--bitcoin--support footer--coin-support">
							<img src={bitcoin} alt="bitcoin" className="footer--bitcoin--support--img" />
							<div className="footer--bitcoin--support--address footer--support--address">
								<div className="footer--address--value">14SvDFzhxEPVg85f4m91JhPe5rKR6afhFd</div>
								<i
									className="fa fa-clone"
									aria-hidden="true"
									data-type="BTC"
									onClick={this.handleCopyClick}
								/>
								{copyBitcoinSuccessMarkup}
							</div>
						</div>
						<div className="footer--ethereum--support footer--coin-support">
							<img src={ethereum} alt="ethereum" className="footer--ethereum--support--img" />
							<div className="footer--ethereum--support--address footer--support--address">
								<div className="footer--address--value">0xBAB6993b2f0624171C15F48a606Ac9FEf0016a70</div>
								<i
									className="fa fa-clone"
									aria-hidden="true"
									data-type="ETH"
									onClick={this.handleCopyClick}
								/>
								{copyEtherSuccessMarkup}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;
