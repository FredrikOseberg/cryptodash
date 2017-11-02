import React from 'react';
import { Link } from 'react-router-dom';
import Features from '../Frontend/Features/Features';
import GoMobile from '../Frontend/GoMobile/GoMobile';
import Footer from '../Footer/Footer';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import './mobilelanding.css';

const MobileLanding = () => (
	<div>
		<MobileNavigation />
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
		<Features />
		<GoMobile />
		<Footer frontend={true} />
	</div>
);

export default MobileLanding;
