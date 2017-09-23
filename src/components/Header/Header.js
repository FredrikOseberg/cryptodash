import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = props => {
	let navLinks;
	console.log(props.auth);
	if (props.auth.status === 'ANONYMOUS') {
		navLinks = (
			<ul className="header--nav">
				<Link to="/signin">
					<li>Sign In</li>
				</Link>
				<Link to="/register">
					<li>Register</li>
				</Link>
			</ul>
		);
	} else if (props.auth.status === 'SIGNED_IN') {
		navLinks = (
			<ul className="header--nav">
				<Link to="/dashboard">
					<li>Dashboard</li>
				</Link>
			</ul>
		);
	}
	return (
		<div className="header">
			<div className="container">
				<Link to="/">
					<h1 className="header--logo">CryptoDash</h1>
				</Link>
				{navLinks}
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Header);
