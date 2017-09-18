import React from 'react';

const Header = () => (
	<div className="header">
		<div className="container">
			<h1 className="header--logo">CryptoDash</h1>
			<ul className="header--nav">
				<a href="#">
					<li>Sign In</li>
				</a>
				<a href="#">
					<li>Register</li>
				</a>
			</ul>
		</div>
	</div>
);

export default Header;
