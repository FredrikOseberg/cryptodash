import React from 'react';
import { connect } from 'react-redux';
import bitcoin from '../../img/coins/bitcoin.png';
import ether from '../../img/coins/ether.png';
import './choosecurrency.css';

const ChooseCurrency = props => {
	let selectedCurrenciesText;
	if (props.selectedCurrencies.length > 0) {
		selectedCurrenciesText = (
			<div className="landing--cover--content--box--selected--currencies">
				<p>You have selected {props.selectedCurrencies.length} currencies to track.</p>
			</div>
		);
	}
	return (
		<div className="choose--currency">
			<h4>Choose which currencies to track</h4>
			<div className="choose--currency--content--box--currency">
				<div className="choose--currency--content--box--image--container" onClick={props.handleClickedExpand}>
					<img src={bitcoin} className="choose--currency--content--box--image" alt="Bitcoin" />
					<p>Bitcoin</p>
				</div>
				<div className="choose--currency--content--box--image--container" onClick={props.handleClickedExpand}>
					<img src={ether} className="choose--currency--content--box--image" alt="ethereum" />
					<p>Ethereum</p>
				</div>
			</div>
			{selectedCurrenciesText}
		</div>
	);
};

const mapStateToProps = state => ({
	selectedCurrencies: state.selectedCurrencies
});

export default connect(mapStateToProps)(ChooseCurrency);
