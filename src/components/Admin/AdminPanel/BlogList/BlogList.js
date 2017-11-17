import React, { Component } from 'react';
import { database, storage } from '../../../../firebase';
import map from 'lodash/map';
import './bloglist.css';

class BlogList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			showConfirm: false,
			currentTarget: ''
		};

		this.setEditBlogInformation = this.setEditBlogInformation.bind(this);
		this.deleteBlog = this.deleteBlog.bind(this);
		this.showConfirm = this.showConfirm.bind(this);
		this.closeConfirm = this.closeConfirm.bind(this);
		this.deletePostImage = this.deletePostImage.bind(this);
		this.deletePostFromCategory = this.deletePostFromCategory.bind(this);
		this.deletePost = this.deletePost.bind(this);
		this.updateList = this.updateList.bind(this);
	}

	componentDidMount() {
		this.updateList();
	}

	setEditBlogInformation(event) {
		const id = event.target.dataset.id;
		this.props.setAdminPage('Edit Blog');
		this.props.setBlogPostToEdit(id);
	}

	updateList() {
		const posts = [];

		const databaseRef = database.ref('blogs/posts');
		databaseRef.once('value', snapshot => {
			const blogPosts = snapshot.val();
			console.log(blogPosts);
			map(blogPosts, blogPost => {
				posts.push(blogPost);
			});

			this.setState({ posts: posts });
		});
	}

	showConfirm(event) {
		this.setState({ showConfirm: !this.state.showConfirm });
		if (event.target.dataset.id) {
			this.setState({ currentPost: event.target.dataset.id });
		}
	}

	closeConfirm() {
		this.setState({ showConfirm: false });
	}

	deleteBlog() {
		this.closeConfirm();

		const databaseRef = database.ref('blogs/posts');

		databaseRef.once('value', snapshot => {
			const posts = snapshot.val();
			let postToDelete;

			map(posts, post => {
				if (post.slug === this.state.currentPost) {
					postToDelete = post;
				}
			});

			this.deletePostImage(postToDelete.imageRef);
			this.deletePostFromCategory(postToDelete.category, postToDelete.slug);
			this.deletePost(postToDelete.slug);
			this.updateList();
		});
	}

	deletePostImage(imageRef) {
		const imageToDeleteRef = storage.ref(imageRef);

		if (imageRef) {
			imageToDeleteRef
				.delete()
				.then(() => {
					console.log('image deleted');
				})
				.catch(error => {
					console.log(error);
				});
		}
	}

	deletePostFromCategory(category, slug) {
		const databaseRef = database.ref(`blogs/categories/${category}/${slug}`);
		databaseRef.remove();
	}

	deletePost(slug) {
		const databaseRef = database.ref(`blogs/posts/${slug}`);
		databaseRef.remove();
	}

	render() {
		let modalClasses;

		this.state.showConfirm
			? (modalClasses = 'admin--modal visible opacity transition')
			: (modalClasses = 'admin--modal');

		return (
			<div className="admin--blog--list">
				<div className={modalClasses}>
					<div className="admin--modal--box">
						<h2>Are you sure? Once you delete this post it will never return.</h2>
						<div className="admin--modal--buttons">
							<button className="admin--modal--confirm" onClick={this.deleteBlog}>
								Yes I'm sure.
							</button>
							<button className="admin--modal--cancel" onClick={this.showConfirm}>
								Cancel
							</button>
						</div>
					</div>
				</div>
				<ul>
					{this.state.posts.map(post => {
						return (
							<li key={post.slug}>
								<p>{post.title}</p>
								<div className="admin--blog--list--item--actions">
									<i
										className="fa fa-edit"
										aria-hidden="true"
										onClick={this.setEditBlogInformation}
										data-id={post.slug}
									/>
									<i
										className="fa fa-trash"
										aria-hidden="true"
										onClick={this.showConfirm}
										data-id={post.slug}
									/>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default BlogList;
