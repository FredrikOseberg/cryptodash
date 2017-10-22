import React, { Component } from 'react';
import { iosSafariCopy, copyText } from '../../../../../common/helpers';

class WalletListItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			address: this.props.wallet,
			copySuccess: ''
		};

		this.handleListItemCopyClick = this.handleListItemCopyClick.bind(this);
	}

	handleListItemCopyClick(event) {
		let successMessage, successful;
		let coinType = event.currentTarget.dataset.type;

		if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
			const input = document.querySelector('.wallet--list--item--input');
			successful = iosSafariCopy(input);
			successMessage = successful ? `You successfully copied the ${this.props.name} wallet address.` : ' ';
		} else {
			successful = copyText(this.state.address);
		}

		if (successful) {
			successMessage = `You successfully copied the ${this.props.name} wallet address.`;
			this.setState({ copySuccess: successMessage }, () => {
				setTimeout(() => {
					this.setState({ copySuccess: '' });
				}, 5000);
			});
		}
	}

	render() {
		let copyMarkup;
		this.state.copySuccess
			? (copyMarkup = <span className="copy--flash--message">{this.state.copySuccess}</span>)
			: (copyMarkup = '');

		return (
			<li>
				<img src={this.props.img} alt={this.props.name} />
				<p>{this.props.name}</p>
				<div className="wallet--list--item--copy">
					<input className="main--input wallet--list--item--input" disabled value={this.props.wallet} />
					{copyMarkup}
				</div>
				<div onClick={this.handleListItemCopyClick} className="wallet--list--item--copy--button">
					<i className="fa fa-copy" aria-hidden="true" />
				</div>
			</li>
		);
	}
}

export default WalletListItem;
