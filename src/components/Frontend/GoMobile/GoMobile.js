import React from 'react';
import mobileScreen from '../../../img/cryptodashermobile.png';
import './gomobile.css';

const GoMobile = () => (
	<div className="frontend--gomobile">
		<div className="frontend--gomobile--header">
			<h1>Go Mobile</h1>{' '}
		</div>
		<div className="frontend--gomobile--container">
			<div className="frontend--gomobile--information">
				<p>
					CryptoDasher is built on the newest technologies to offer you a seamless mobile experience. Built as
					a progressive web app, Cryptodasher offers you a native experience on your mobile phone when you add
					the web app to your mobile phones homescreen.
				</p>
				<p>
					In order to use CryptoDasher on your phone, just click the settings icon of your respective browser
					and choose "Add to homescreen". This will give you access to CryptoDasher on your phone, just like a
					normal app.
				</p>
			</div>
			<div className="frontend--gomobile--mobile--container">
				<div className="frontend--gomobile--mobile">
					<div className="frontend--gomobile--mobile--header">
						<div className="frontend--mobile--top--round--button" />
						<div className="frontend--mobile--top--long--button" />
					</div>
					<img src={mobileScreen} alt="Mobilescreen" />
					<div className="frontend--mobile--home--button" />
				</div>
			</div>
		</div>
	</div>
);

export default GoMobile;
