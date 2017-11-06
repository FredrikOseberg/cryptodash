import React, { Component } from 'react';
import Header from '../../Header/Header';
import AddBlog from './AddBlog/AddBlog.js';
import './adminpanel.css';

class AdminPanel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			adminPage: 'Add Blog'
		};
	}

	render() {
		let adminDashboard = (
			<div className="add--blog--button">
				<i className="fa fa-plus" />
			</div>
		);

		const showAdminDashboard = this.state.adminPage === 'Default';
		const showAddBlog = (this.state.adminPage = 'Add Blog');

		return (
			<div className="admin">
				<Header />
				<div className="admin--container">
					{showAdminDashboard && adminDashboard}
					{showAddBlog && <AddBlog />}
				</div>
			</div>
		);
	}
}

export default AdminPanel;
