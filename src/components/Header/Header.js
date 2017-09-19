import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<div className="header">
		<div className="container">
			<Link to="/">
				<h1 className="header--logo">CryptoDash</h1>
			</Link>
			<ul className="header--nav">
				<Link to="/signin">
					<li>Sign In</li>
				</Link>
				<Link to="/register">
					<li>Register</li>
				</Link>
			</ul>
		</div>
	</div>
);

export default Header;
