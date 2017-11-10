import React, { Component } from 'react';
import Header from '../../Header/Header';
import BlogPostCard from './BlogPostCard/BlogPostCard';
import { database } from '../../../firebase';
import map from 'lodash/map';
import './blog.css';

class Blog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			blogs: []
		};
	}

	componentDidMount() {
		let allPosts = [];
		const databaseRef = database.ref('blogs/posts');

		databaseRef.on('value', snapshot => {
			const posts = snapshot.val();
			map(posts, post => {
				allPosts.push(post);
			});

			allPosts = allPosts.filter(post => post.published);

			this.setState({ blogs: allPosts });
		});
	}

	render() {
		let blogPostCards = this.state.blogs.map(post => {
			return <BlogPostCard image={post.image} title={post.title} category={post.category} />;
		});
		return (
			<div className="frontend--background">
				<Header />
				<div className="frontend--blog">
					<div className="frontend--blog--container">
						<h1>Blog</h1>
						{blogPostCards}
					</div>
				</div>
			</div>
		);
	}
}

export default Blog;
