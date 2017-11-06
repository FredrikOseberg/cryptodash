import React from 'react';
import BlogTitleInput from '../../Blog/BlogTitleInput/BlogTitleInput';
import BlogBodyTextArea from '../../Blog/BlogBodyTextArea/BlogBodyTextArea';
import BlogUploadMedia from '../../Blog/BlogUploadMedia/BlogUploadMedia';
import BlogCategorySelect from '../../Blog/BlogCategorySelect/BlogCategorySelect';
import './addblog.css';

const AddBlog = props => (
	<div className="admin--add--blog">
		<h1>Add Blog</h1>
		<form>
			<BlogTitleInput />
			<BlogCategorySelect setAdminPage={props.setAdminPage} />
			<BlogBodyTextArea />
			<BlogUploadMedia />
		</form>
	</div>
);

export default AddBlog;
