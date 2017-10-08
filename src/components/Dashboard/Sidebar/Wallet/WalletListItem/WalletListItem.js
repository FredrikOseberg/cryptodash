import React, { Component } from 'react';

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
		const textField = document.createElement('textarea');
		textField.innerText = this.state.address;
		textField.classList.add('copy--address--field');
		document.body.appendChild(textField);
		textField.select();
		document.execCommand('copy');
		textField.remove();

		this.setState({ copySuccess: 'Copied!' }, () => {
			setTimeout(() => {
				this.setState({ copySuccess: '' });
			}, 3000);
		});
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
				<input className="main--input" disabled value={this.props.wallet} ref="copyAddress" />
				{copyMarkup}
				<div onClick={this.handleListItemCopyClick} className="wallet--list--item--copy">
					<i className="fa fa-clone" aria-hidden="true" />
				</div>
			</li>
		);
	}
}

export default WalletListItem;
