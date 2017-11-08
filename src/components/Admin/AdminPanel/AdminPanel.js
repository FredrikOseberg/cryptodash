import React, { Component } from 'react';
import Header from '../../Header/Header';
import AddBlog from './AddBlog/AddBlog';
import AddCategory from './AddCategory/AddCategory';
import EditBlog from './EditBlog/EditBlog';
import AdminDashboardMainPage from '../AdminPanel/AdminDashboardMainPage/AdminDashboardMainPage';
import Nav from '../../Nav/Nav';
import './adminpanel.css';

class AdminPanel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			adminPage: 'Dashboard',
			adminPages: [
				{ name: 'Dashboard', icon: 'fa fa-tachometer' },
				{ name: 'Add Blog', icon: 'fa fa-plus' },
				{ name: 'Add Category', icon: 'fa fa-tags' }
			],
			blogPostEditId: ''
		};

		this.setAdminPage = this.setAdminPage.bind(this);
		this.handleAdminNavClick = this.handleAdminNavClick.bind(this);
		this.setBlogPostToEdit = this.setBlogPostToEdit.bind(this);
	}

	setAdminPage(page) {
		this.setState({ adminPage: page });
	}

	setBlogPostToEdit(id) {
		this.setState({ blogPostEditId: id });
	}

	handleAdminNavClick(event) {
		const li = event.currentTarget;
		switch (li.dataset.target) {
			case 'Dashboard':
				this.setState({ adminPage: 'Dashboard' });
				break;
			case 'Add Blog':
				this.setState({ adminPage: 'Add Blog' });
				break;
			case 'Add Category':
				this.setState({ adminPage: 'Add Category' });
				break;
			default:
				this.setState({ adminPage: 'Dashboard' });
		}
	}

	render() {
		const showAdminDashboard = this.state.adminPage === 'Dashboard';
		const showAddBlog = this.state.adminPage === 'Add Blog';
		const showAddCategory = this.state.adminPage === 'Add Category';
		const showEditBlogPost = this.state.adminPage === 'Edit Blog';

		return (
			<div className="admin">
				<Header />
				<div className="admin--nav--container">
					<Nav
						pages={this.state.adminPages}
						onClickHandler={this.handleAdminNavClick}
						currentPage={this.state.adminPage}
					/>
				</div>
				<div className="admin--container">
					{showAdminDashboard && (
						<AdminDashboardMainPage
							setAdminPage={this.setAdminPage}
							setBlogPostToEdit={this.setBlogPostToEdit}
						/>
					)}
					{showAddBlog && <AddBlog setAdminPage={this.setAdminPage} />}
					{showAddCategory && <AddCategory setAdminPage={this.setAdminPage} />}
					{showEditBlogPost && <EditBlog id={this.state.blogPostEditId} setAdminPage={this.setAdminPage} />}
				</div>
			</div>
		);
	}
}

export default AdminPanel;
