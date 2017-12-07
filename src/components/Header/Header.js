import React, { Component } from 'react';
import anonymousUserPicture from '../../img/anonuser.png';
import { clearCurrency } from '../../actions/currencies';
import { clearCurrentCurrency } from '../../actions/currentCurrency';
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
		this.handleSignOutClick = this.handleSignOutClick.bind(this);
	}

	handleClickedNav() {
		this.setState({ clickedNav: !this.state.clickedNav });
	}
	handleSignOutClick() {
		firebase.auth().signOut();
		this.props.clearCurrencyFromState();
		this.props.clearCurrentCurrencyFromState();
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
						<li className="header--nav--selected">Register</li>
					</Link>
					<Link to="/all">
						<li>All Coins</li>
					</Link>
					<Link to="http://www.changelly.com/?ref_id=172ccf841be7" target="_blank" rel="noreferrer noopener">
						<li>Trade</li>
					</Link>
					<Link to="/blog">
						<li>Blog</li>
					</Link>
				</ul>
			);
		} else if (this.props.auth.status === 'SIGNED_IN') {
			let dropdownClasses;
			this.state.clickedNav
				? (dropdownClasses = 'header--nav--dropdown header--nav--dropdown--clicked')
				: (dropdownClasses = 'header--nav--dropdown');
			if (this.props.frontend) {
				headerClasses = 'header';
			} else {
				headerClasses = 'header header--dashboard';
			}
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
									<Link to="/">
										<li>
											<i className="fa fa-dashboard" aria-hidden="true" />Dashboard
										</li>
									</Link>

									<Link to="/all">
										<li>
											<i className="fa fa-money" aria-hidden="true" />
											All Coins
										</li>
									</Link>
									<Link
										to="http://www.changelly.com/?ref_id=172ccf841be7"
										target="_blank"
										rel="noreferrer noopener"
									>
										<li>
											<i className="fa fa-exchange" aria-hidden="true" />
											Trade
										</li>
									</Link>
									<li onClick={this.handleSignOutClick}>
										<i className="fa fa-sign-out" aria-hidden="true" />
										Sign out
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
						<h1 className="header--logo">CryptoDasher</h1>
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

const mapDispatchToProps = dispatch => ({
	clearCurrencyFromState() {
		dispatch(clearCurrency());
	},
	clearCurrentCurrencyFromState() {
		dispatch(clearCurrentCurrency());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
