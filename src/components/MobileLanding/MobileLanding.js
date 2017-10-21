import React from 'react';
import { Link } from 'react-router-dom';
import './mobilelanding.css';

const MobileLanding = () => (
	<div className="mobile--landing">
		<div className="mobile--landing--header">
			<h1>CryptoDasher</h1>
			<p>Track any cryptocurrencies in realtime.</p>
		</div>
		<div className="mobile--landing--buttons">
			<Link to="/signin">
				<div className="mobile--landing--sign--in">Sign In</div>
			</Link>
			<Link to="/register">
				<div className="mobile--landing--register">Register</div>
			</Link>
		</div>
	</div>
);

export default MobileLanding;
