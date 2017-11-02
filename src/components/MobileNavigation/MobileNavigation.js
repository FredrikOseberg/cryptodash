import React, { Component } from 'react';
import { auth } from '../../firebase';
import { clearCurrency } from '../../actions/currencies';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import anonUser from '../../img/anonuser.png';
import './mobilenavigation.css';

class MobileNavigation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			openNav: false,
			navigation: [
				{ name: 'Dashboard', icon: 'fa fa-line-chart mobile--nav--list--icon' },
				{ name: 'Portfolio', icon: 'fa fa-money mobile--nav--list--icon' },
				{ name: 'Wallets', icon: 'fa fa-folder mobile--nav--list--icon' },
				{ name: 'All Coins', icon: 'fa fa-circle mobile--nav--list--icon' },
				{ name: 'Settings', icon: 'fa fa-cog mobile--nav--list--icon' },
				{ name: 'Support Me', icon: 'fa fa-life-ring mobile--nav--list--icon' },
				{ name: 'Sign Out', icon: 'fa fa-sign-out mobile--nav--list--icon' }
			]
		};

		this.handleOpenNavClick = this.handleOpenNavClick.bind(this);
		this.handleCloseNavClick = this.handleCloseNavClick.bind(this);
		this.handleNavClick = this.handleNavClick.bind(this);
		this.handleSignOut = this.handleSignOut.bind(this);
	}

	handleOpenNavClick() {
		this.setState({ openNav: true });
	}

	handleCloseNavClick() {
		this.setState({ openNav: false });
	}

	handleNavClick(event) {
		const li = event.currentTarget;
		if (li.dataset.target === 'Sign Out') {
			this.handleSignOut();
		} else {
			this.props.handleDashboardNavClick(li);
			this.handleCloseNavClick();
		}
	}

	handleSignOut() {
		auth.signOut();
		this.props.clearCurrencyFromState();
	}

	render() {
		const user = auth.currentUser;

		let navigationSidebarClasses, navButtonClasses, noUserSidebarClasses;
		if (this.state.openNav) {
			navigationSidebarClasses = 'mobile--navigation--sidebar mobile--navigation--active transition';
			noUserSidebarClasses = 'frontend--sidebar mobile--navigation--active transition';
			navButtonClasses = 'mobile--navigation--button';
		} else {
			navigationSidebarClasses = 'mobile--navigation--sidebar';
			noUserSidebarClasses = 'frontend--sidebar';
			navButtonClasses = 'mobile--navigation--button visible opacity transition';
		}

		let sidebarContent;
		if (this.props.user.status === 'SIGNED_IN') {
			const userImage = user.photoURL ? user.photoURL : anonUser;

			sidebarContent = (
				<div className="mobile--sidebar--signed--in--container">
					<div className="mobile--navigation--sidebar--header">
						<div className="mobile--navigation--sidebar--close" onClick={this.handleCloseNavClick}>
							<i className="fa fa-chevron-left" />
						</div>
						<div className="mobile--navigation--user--details">
							<img
								className="mobile--navigation--sidebar--header--img"
								src={userImage}
								alt={user.displayName}
							/>
							<p className="mobile--navigation--sidebar--name">{user.displayName || user.email}</p>
						</div>
					</div>
					<div className="mobile--navigation--nav--container">
						<ul className="mobile--navigation--nav--list">
							{this.state.navigation.map((nav, index) => {
								let activeClass;
								if (this.props.currentPage === nav.name) {
									activeClass = 'mobile--nav--list--item--active';
								}

								if (index === 3) {
									return (
										<Link
											to="http://www.changelly.com/?ref_id=172ccf841be7"
											target="_blank"
											rel="noreferrer noopener"
										>
											<li>
												<i
													className="fa fa-exchange mobile--nav--list--icon"
													aria-hidden="true"
												/>
												<p className="mobile--nav--list--name">Trade</p>
											</li>
										</Link>
									);
								} else {
									return (
										<li
											className={activeClass}
											key={nav.icon}
											data-target={nav.name}
											onClick={this.handleNavClick}
										>
											<i className={nav.icon} aria-hidden="true" />
											<p className="mobile--nav--list--name">{nav.name}</p>
										</li>
									);
								}
							})}
						</ul>
					</div>
				</div>
			);
		} else {
			sidebarContent = (
				<div className={noUserSidebarClasses}>
					<div className="mobile--navigation--sidebar--close" onClick={this.handleCloseNavClick}>
						<i className="fa fa-chevron-left" />
					</div>
					<ul className="frontend--sidebar--list">
						<Link to="/">
							<li>Home</li>
						</Link>
						<Link to="/all">
							<li>All Coins</li>
						</Link>
						<Link
							to="http://www.changelly.com/?ref_id=172ccf841be7"
							target="_blank"
							rel="noreferrer noopener"
						>
							<li>Trade</li>
						</Link>
						<Link to="/signin">
							<li>Sign In</li>
						</Link>
						<Link to="/register">
							<li>Register</li>
						</Link>
					</ul>
					<h3>CryptoDasher</h3>
				</div>
			);
		}

		return (
			<div className="mobile--navigation">
				<div className={navButtonClasses} onClick={this.handleOpenNavClick}>
					<i className="fa fa-bars" />
				</div>
				<div className={navigationSidebarClasses}>{sidebarContent}</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth
});

const mapDispatchToProps = dispatch => ({
	clearCurrencyFromState() {
		dispatch(clearCurrency());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileNavigation);
