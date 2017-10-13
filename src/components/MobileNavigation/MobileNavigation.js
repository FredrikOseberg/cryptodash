import React, { Component } from 'react';
import { auth } from '../../firebase';
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
				{ name: 'All Coins', icon: 'fa fa-circle mobile--nav--list--icon' }
			]
		};

		this.handleOpenNavClick = this.handleOpenNavClick.bind(this);
		this.handleCloseNavClick = this.handleCloseNavClick.bind(this);
		this.handleNavClick = this.handleNavClick.bind(this);
	}

	handleOpenNavClick() {
		this.setState({ openNav: true });
	}

	handleCloseNavClick() {
		this.setState({ openNav: false });
	}

	handleNavClick(event) {
		const li = event.currentTarget;

		this.props.handleDashboardNavClick(li);
		this.handleCloseNavClick();
	}

	render() {
		const user = auth.currentUser;

		let navigationSidebarClasses, navButtonClasses;
		if (this.state.openNav) {
			navigationSidebarClasses = 'mobile--navigation--sidebar mobile--navigation--active';
			navButtonClasses = 'mobile--navigation--button';
		} else {
			navigationSidebarClasses = 'mobile--navigation--sidebar';
			navButtonClasses = 'mobile--navigation--button visible opacity transition';
		}

		const userImage = user.photoURL ? user.photoURL : anonUser;
		return (
			<div className="mobile--navigation">
				<div className={navButtonClasses} onClick={this.handleOpenNavClick}>
					<i className="fa fa-bars" />
				</div>
				<div className={navigationSidebarClasses}>
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
							<p className="mobile--navigation--sidebar--name">{user.displayName}</p>
						</div>
					</div>
					<div className="mobile--navigation--nav--container">
						<ul className="mobile--navigation--nav--list">
							{this.state.navigation.map(nav => {
								let activeClass;
								if (this.props.currentPage === nav.name) {
									activeClass = 'mobile--nav--list--item--active';
								}
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
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default MobileNavigation;
