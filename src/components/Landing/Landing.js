import React from 'react';
import Header from '../Header/Header';
// Temporary importing images
import bitcoin from '../../img/coins/bitcoin.png';
import ether from '../../img/coins/ether.png';

const Landing = () => (
	<div className="landing">
		<div className="landing--layover">
			<Header />
			<div className="container">
				<div className="landing--cover--content">
					<div className="landing--cover--content--text">
						<h2>Your personalized crypto dashboard.</h2>
						<p>The easiest way to keep up to date on your digital currency.</p>
					</div>
					<div className="landing--cover--content--box--container">
						<div className="landing--cover--content--box">
							<h4>Choose which currencies to track</h4>
							{/* Refacor this */}
							<div className="landing--cover--content--box--currency">
								<div className="landing--cover--content--box--image--container">
									<img src={bitcoin} className="landing--cover--content--box--image" />
									<p>Bitcoin</p>
								</div>
								<div className="landing--cover--content--box--image--container">
									<img src={ether} className="landing--cover--content--box--image" />
									<p>Ethereum</p>
								</div>
							</div>
							<div className="landing--cover--content--box--button">Continue</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default Landing;
