import React from 'react';

const Nav = props => (
	<ul className="dashboard--navigation--list">
		{props.pages.map(page => {
			let navClasses;
			props.currentPage === page.name ? (navClasses = 'dashboard--navigation--list--active') : (navClasses = '');
			return (
				<li data-target={page.name} onClick={props.onClickHandler} key={page.icon} className={navClasses}>
					<i className={page.icon} aria-hidden="true" />
					<p>{page.name}</p>
				</li>
			);
		})}
	</ul>
);

export default Nav;
