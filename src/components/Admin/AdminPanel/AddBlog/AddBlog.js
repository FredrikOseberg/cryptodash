import React from 'react';
import BlogTitleInput from '../../Blog/BlogTitleInput/BlogTitleInput';
import BlogBodyTextArea from '../../Blog/BlogBodyTextArea/BlogBodyTextArea';
import BlogUploadMedia from '../../Blog/BlogUploadMedia/BlogUploadMedia';
import './addblog.css';

const AddBlog = () => (
	<div className="admin--add--blog">
		<h1>Add Blog</h1>
		<form>
			<BlogTitleInput />
			<BlogBodyTextArea />
			<BlogUploadMedia />
		</form>
	</div>
);

export default AddBlog;
