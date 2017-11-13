import React, { Component } from 'react';
import { database } from '../../../../firebase';
import map from 'lodash/map';

class BlogPost extends Component {
	constructor(props) {
		super(props);

		this.state = {
			blogpost: ''
		};
	}

	componentDidMount() {
		const blogPostSlug = this.props.match.params.id;
		const databaseRef = database.ref('blogs/posts');

		databaseRef.once('value', snapshot => {
			const posts = snapshot.val();

			map(posts, post => {
				if (post.slug === blogPostSlug) {
					this.setState({ blogpost: post });
				}
			});
		});
	}

	render() {
		const blogpost = this.state.blogpost;
		return (
			<div className="frontend--blog--blogpost">
				<img src={blogpost.image} alt="blogpost" />
			</div>
		);
	}
}

export default BlogPost;
