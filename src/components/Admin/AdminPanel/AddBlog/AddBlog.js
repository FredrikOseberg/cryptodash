import React, { Component } from 'react';
import BlogTitleInput from '../../Blog/BlogTitleInput/BlogTitleInput';
import BlogBodyTextArea from '../../Blog/BlogBodyTextArea/BlogBodyTextArea';
import BlogUploadMedia from '../../Blog/BlogUploadMedia/BlogUploadMedia';
import BlogCategorySelect from '../../Blog/BlogCategorySelect/BlogCategorySelect';
import BlogPublishedSelect from '../../Blog/BlogPublishedSelect/BlogPublishedSelect';
import { database, storage, auth } from '../../../../firebase';
import './addblog.css';

class AddBlog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			downloadURL: '',
			uploadRef: '',
			blogTitle: '',
			blogPublished: false,
			blogCategory: '',
			blogContent: ''
		};

		this.setDownloadURL = this.setDownloadURL.bind(this);
		this.setUploadRef = this.setUploadRef.bind(this);
		this.setCategory = this.setCategory.bind(this);
		this.removeImageFromFirebase = this.removeImageFromFirebase.bind(this);
		this.handleBlogPublishedChange = this.handleBlogPublishedChange.bind(this);
		this.handleBlogCategoryChange = this.handleBlogCategoryChange.bind(this);
		this.handleBlogContentChange = this.handleBlogContentChange.bind(this);
		this.handleBlogTitleChange = this.handleBlogTitleChange.bind(this);
		this.slugifyTitle = this.slugifyTitle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	setDownloadURL(downloadURL) {
		this.setState({ downloadURL });
	}

	setCategory(category) {
		this.setState({ blogCategory: category });
	}

	setUploadRef(uploadRef) {
		this.setState({ uploadRef });
	}

	removeImageFromFirebase() {
		const storageRef = storage.ref(this.state.uploadRef);

		storageRef.delete();
	}

	handleBlogPublishedChange(boolean) {
		this.setState({ blogPublished: boolean });
	}

	handleBlogCategoryChange(category) {
		this.setState({ blogCategory: category });
	}

	handleBlogContentChange(content) {
		this.setState({ blogContent: content });
	}

	handleBlogTitleChange(title) {
		this.setState({ blogTitle: title });
	}

	slugifyTitle(title) {
		return title.replace(/\s/gi, '-').toLowerCase();
	}

	handleSubmit(event) {
		event.preventDefault();

		const databaseRef = database.ref('blogs');
		const slug = this.slugifyTitle(this.state.blogTitle);

		const blogPost = {
			title: this.state.blogTitle,
			slug: slug,
			image: this.state.downloadURL,
			published: this.state.blogPublished,
			timestamp: Date.now(),
			category: this.state.blogCategory,
			body: this.state.blogContent,
			author: {
				name: auth.currentUser.displayName,
				image: auth.currentUser.photoURL
			}
		};

		databaseRef.child(slug).set(blogPost);
	}

	render() {
		return (
			<div className="admin--add--blog">
				<h1>Add Blog</h1>
				<form>
					<BlogTitleInput handleBlogTitleChange={this.handleBlogTitleChange} />
					<BlogCategorySelect
						setAdminPage={this.props.setAdminPage}
						handleBlogCategoryChange={this.handleBlogCategoryChange}
						setCategory={this.setCategory}
					/>
					<BlogPublishedSelect handleBlogPublishedChange={this.handleBlogPublishedChange} />
					<BlogBodyTextArea handleBlogContentChange={this.handleBlogContentChange} />
					<BlogUploadMedia
						setDownloadURL={this.setDownloadURL}
						setUploadRef={this.setUploadRef}
						uploadRef={this.state.uploadRef}
						removeImageFromFirebase={this.removeImageFromFirebase}
					/>
					<button type="submit" className="main-button" onClick={this.handleSubmit}>
						Add Blog
					</button>
				</form>
			</div>
		);
	}
}

export default AddBlog;
