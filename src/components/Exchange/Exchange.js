import React from 'react';
import './exchange.css';

const Exchange = () => {
	let iframeStyles = {
		overflowY: 'hidden',
		border: 'none',
		width: 100 + '%'
	};
	return (
		<div className="exchange">
			<div className="currency--wallet--header">
				<h3>Exchange Cryptocurrencies</h3>
			</div>
			<div className="exchange--content">
				<iframe
					src="https://changelly.com/widget/v1?auth=email&from=BTC&to=ETH&merchant_id=172ccf841be7&address=&amount=1&ref_id=172ccf841be7&color=565699"
					width="600"
					height="500"
					className="changelly"
					scrolling="no"
					style={iframeStyles}
				>
					Can't load widget
				</iframe>
			</div>
		</div>
	);
};

export default Exchange;
