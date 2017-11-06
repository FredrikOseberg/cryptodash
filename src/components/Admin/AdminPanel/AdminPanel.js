import React, { Component } from 'react';
import Header from '../../Header/Header';
import AddBlog from './AddBlog/AddBlog';
import AddCategory from './AddCategory/AddCategory';
import './adminpanel.css';

class AdminPanel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			adminPage: 'Add Blog'
		};

		this.setAdminPage = this.setAdminPage.bind(this);
	}

	setAdminPage(page) {
		this.setState({ adminPage: page });
	}

	render() {
		let adminDashboard = (
			<div className="add--blog--button">
				<i className="fa fa-plus" />
			</div>
		);

		const showAdminDashboard = this.state.adminPage === 'Default';
		const showAddBlog = this.state.adminPage === 'Add Blog';
		const showAddCategory = this.state.adminPage === 'Add Category';

		return (
			<div className="admin">
				<Header />
				<div className="admin--container">
					{showAdminDashboard && adminDashboard}
					{showAddBlog && <AddBlog setAdminPage={this.setAdminPage} />}
					{showAddCategory && <AddCategory setAdminPage={this.setAdminPage} />}
				</div>
			</div>
		);
	}
}

export default AdminPanel;
