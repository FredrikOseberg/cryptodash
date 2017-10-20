import React, { Component } from 'react';
import anonymousUserPicture from '../../img/anonuser.png';
import { connect } from 'react-redux';
import firebase from './../../firebase';
import { Link } from 'react-router-dom';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clickedNav: false
		};

		this.handleClickedNav = this.handleClickedNav.bind(this);
	}

	handleClickedNav() {
		this.setState({ clickedNav: !this.state.clickedNav });
	}
	handleSignOutClick() {
		firebase.auth().signOut();
	}
	render() {
		let navLinks,
			headerClasses = 'header';
		if (this.props.auth.status === 'ANONYMOUS') {
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
		} else if (this.props.auth.status === 'SIGNED_IN') {
			let dropdownClasses;
			this.state.clickedNav
				? (dropdownClasses = 'header--nav--dropdown header--nav--dropdown--clicked')
				: (dropdownClasses = 'header--nav--dropdown');
			headerClasses = 'header header--dashboard';
			navLinks = (
				<ul className="header--nav">
					<li className="header--nav--signed--in" onClick={this.handleClickedNav}>
						<img
							src={this.props.auth.photoURL || anonymousUserPicture}
							alt={this.props.auth.displayName || this.props.auth.email}
						/>
						<p>{this.props.auth.displayName || this.props.auth.email}</p>
						<div className="header--nav--dropdown--container">
							<i className="fa fa-chevron-down" aria-hidden="true" />
							<div className={dropdownClasses}>
								<ul className="header--nav--dropdown--list">
									<li onClick={this.handleSignOutClick}>
										<i className="fa fa-sign-out" aria-hidden="true" />
										Sign out
									</li>
									<li>
										<i className="fa fa-cog" aria-hidden="true" />
										Settings
									</li>
								</ul>
							</div>
						</div>
					</li>
				</ul>
			);
		}
		return (
			<div className={headerClasses}>
				<div className="container">
					<Link to="/">
						<h1 className="header--logo">cDash</h1>
					</Link>
					{navLinks}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Header);
