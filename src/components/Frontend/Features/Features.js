import React from 'react';
import featuresDash from '../../../img/featuresDashboard.png';
import './features.css';

const Features = () => (
	<div className="frontend--features">
		<h1>Features</h1>
		<div className="frontend--features--track">
			<div className="frontend--features--track--header">
				<i className="fa fa-line-chart" aria-hidden="true" />
				<h3>Track</h3>
			</div>
			<div className="frontend--features--container">
				<div className="frontend--features--track--box--container">
					<div className="features--box--currency features--box--currency--bitcoin">
						<i className="cc BTC" />
					</div>
					<div className="features--box--currency features--box--currency--ethereum">
						<i className="cc ETH" />
					</div>
					<div className="features--box--currency features--box--currency--neo">
						<i className="cc NEO" />
					</div>
					<div className="features--box--currency features--box--currency--gno">
						<i className="cc GNO" />
					</div>
					<div className="features--box--currency features--box--currency--doge">
						<i className="cc DOGE-alt" />
					</div>
					<div className="frontend--features--track--box">
						<div className="frontend--features--track--box--left--handle" />
						<div className="frontend--features--track--box--right--handle" />
						<h3>Cryptodasher</h3>
					</div>
				</div>
				<div className="frontend--features--track--information">
					<img src={featuresDash} alt="Dashboard" className="frontend--track--img" />
					<p>
						Track over 800 different cryptocurrencies, and select only the ones you care about. Your
						dashboard will only be populated with the currencies you choose to follow, and you can add or
						remove currencies at any time.
					</p>
					<div className="frontend--features--track--sample--currencies" />
				</div>
			</div>
			<div />
		</div>
	</div>
);

export default Features;
