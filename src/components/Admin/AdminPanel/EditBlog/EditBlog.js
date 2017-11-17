import React, { Component } from 'react';
import BlogTitleInput from '../../Blog/BlogTitleInput/BlogTitleInput';
import BlogBodyTextArea from '../../Blog/BlogBodyTextArea/BlogBodyTextArea';
import BlogUploadMedia from '../../Blog/BlogUploadMedia/BlogUploadMedia';
import BlogCategorySelect from '../../Blog/BlogCategorySelect/BlogCategorySelect';
import BlogPublishedSelect from '../../Blog/BlogPublishedSelect/BlogPublishedSelect';
import BlogReadingTime from '../../Blog/BlogReadingTime/BlogReadingTime';
import { database, storage, auth } from '../../../../firebase';
import map from 'lodash/map';
import '../AddBlog/addblog.css';

class EditBlog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			downloadURL: '',
			uploadRef: '',
			blogTitle: '',
			blogPublished: false,
			blogCategory: '',
			blogReadingTime: 0,
			blogContent: '',
			previousTitle: '',
			previousCategory: '',
			blogPost: {}
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
		this.handleBlogReadingTimeChange = this.handleBlogReadingTimeChange.bind(this);
	}

	componentDidMount() {
		const databaseRef = database.ref('/blogs/posts');

		databaseRef.on('value', snapshot => {
			const posts = snapshot.val();

			map(posts, post => {
				if (post.slug === this.props.id) {
					this.setState({ blogPost: post });
					this.setState({ blogTitle: post.title });
					this.setState({ blogPublished: post.published });
					this.setState({ blogCategory: post.category });
					this.setState({ blogContent: post.body });
					this.setState({ downloadURL: post.image || 'noPhoto' });
					this.setState({ readingTime: post.readingTime });
					this.setState({ previousTitle: post.title });
					this.setState({ previousCategory: post.category });
				}
			});
		});
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
		if (storageRef) {
			const databaseRef = database.ref(`blogs/posts/${this.slugifyTitle(this.state.blogTitle)}`);

			this.setState({ downloadURL: 'noPhoto' });
			this.setState({ uploadRef: '' });

			databaseRef.child('image').set('');
			storageRef.delete();
		}
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

	handleBlogReadingTimeChange(time) {
		this.setState({ blogReadingTime: time });
	}

	handleBlogTitleChange(title) {
		this.setState({ blogTitle: title });
	}

	slugifyTitle(title) {
		return title.replace(/\s/gi, '-').toLowerCase();
	}

	handleSubmit(event) {
		event.preventDefault();

		const databaseRef = database.ref('blogs/posts');
		const categoriesRef = database.ref('blogs/categories');
		const slug = this.slugifyTitle(this.state.blogTitle);

		const blogPost = {
			title: this.state.blogTitle,
			slug: slug,
			image: this.state.downloadURL,
			published: this.state.blogPublished,
			timestamp: Date.now(),
			category: this.state.blogCategory,
			readingTime: this.state.readingTime,
			body: this.state.blogContent,
			author: {
				name: auth.currentUser.displayName,
				image: auth.currentUser.photoURL
			}
		};

		const previousBlogpostID = this.slugifyTitle(this.state.previousTitle);
		console.log(previousBlogpostID, this.state.previousCategory);
		databaseRef.child(previousBlogpostID).remove();
		categoriesRef
			.child(this.state.previousCategory)
			.child(previousBlogpostID)
			.remove();

		categoriesRef
			.child(blogPost.category)
			.child(slug)
			.set({ postID: slug });
		databaseRef.child(slug).set(blogPost);
	}

	render() {
		return (
			<div className="admin--add--blog">
				<h1>Edit Blog</h1>
				<form>
					<BlogTitleInput handleBlogTitleChange={this.handleBlogTitleChange} title={this.state.blogTitle} />
					<BlogReadingTime
						handleBlogReadingTimeChange={this.handleBlogReadingTimeChange}
						readingTime={this.state.readingTime}
					/>
					{this.state.blogCategory && (
						<BlogCategorySelect
							setAdminPage={this.props.setAdminPage}
							handleBlogCategoryChange={this.handleBlogCategoryChange}
							setCategory={this.setCategory}
							selected={this.state.blogCategory}
						/>
					)}
					<BlogPublishedSelect
						handleBlogPublishedChange={this.handleBlogPublishedChange}
						published={this.state.blogPublished}
					/>
					<BlogBodyTextArea
						handleBlogContentChange={this.handleBlogContentChange}
						content={this.state.blogContent}
					/>

					<div>
						<label>Please upload a 800x550px photo</label>
						{this.state.downloadURL && (
							<BlogUploadMedia
								setDownloadURL={this.setDownloadURL}
								setUploadRef={this.setUploadRef}
								uploadRef={this.state.uploadRef}
								removeImageFromFirebase={this.removeImageFromFirebase}
								downloadURL={this.state.downloadURL}
							/>
						)}
					</div>

					<button type="submit" className="main-button" onClick={this.handleSubmit}>
						Add Blog
					</button>
				</form>
			</div>
		);
	}
}

export default EditBlog;
