import React from 'react';
import BlogList from '../BlogList/BlogList';

const AdminDashboardMainPage = props => (
	<div className="admin--dashboard--main--page">
		<BlogList setAdminPage={props.setAdminPage} setBlogPostToEdit={props.setBlogPostToEdit} />
	</div>
);

export default AdminDashboardMainPage;
