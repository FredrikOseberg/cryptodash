import React from 'react';

const Nav = props => {
	const pages = props.pages.map(page => {
		let newTag;
		if (page.new) {
			newTag = <div className="dashboard--navigation--new">New</div>;
		}

		let navClasses;
		props.currentPage === page.name ? (navClasses = 'dashboard--navigation--list--active') : (navClasses = '');
		return (
			<li data-target={page.name} onClick={props.onClickHandler} key={page.icon} className={navClasses}>
				<i className={page.icon} aria-hidden="true" />
				<p>{page.name}</p>
				{newTag}
			</li>
		);
	});

	return <ul className="dashboard--navigation--list">{pages}</ul>;
};

export default Nav;
