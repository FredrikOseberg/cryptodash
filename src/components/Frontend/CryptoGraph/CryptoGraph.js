import React from 'react';
import './cryptograph.css';

const CryptoGraph = props => (
	<div className="landing--cryptograph">
		<div className="landing--cryptograph--container">
			<div className="cryptograph--line cryptograph--line--one" />
			<div className="cryptograph--line--point cryptograph--line--point--one">
				<div className="cryptograph--line--point--one--crypto--info--group">
					<div className="cryptograph--line--point--info cryptograph--line--point--one--info">
						<i className="cc BTC-alt" />
						<div className="cryptograph--line--one--point--info--arrow" />
					</div>
					<div className="cryptograph--line--point--one--info--text">
						<p className="cryptograph--line--one--info--text--header">Bitcoin (BTC)</p>
						<p className="cryptograph--line--point--crypto--info--price">
							7142 <span className="price--postfix">USD</span>
						</p>
					</div>
				</div>
			</div>

			<div className="cryptograph--line cryptograph--line--two" />
			<div className="cryptograph--line--point cryptograph--line--point--two">
				<div className="cryptograph--line--point--two--info--group">
					<div className="cryptograph--line--point--info cryptograph--line--point--two--info">
						<i className="cc ETH" />
						<div className="cryptograph--line--two--point--arrow" />
					</div>
					<div className="cryptograph--line--point--two--info--text">
						<p>Ethereum (ETH)</p>
						<p className="cryptograph--line--point--crypto--info--price">
							300 <span className="price--postfix">USD</span>
						</p>
					</div>
				</div>
			</div>

			<div className="cryptograph--line cryptograph--line--three" />
		</div>
	</div>
);

export default CryptoGraph;
