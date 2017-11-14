import React, { Component } from 'react';
import { database } from '../../../../firebase';
import Header from '../../../Header/Header';
import map from 'lodash/map';
import './blogpost.css';

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

		databaseRef.on('value', snapshot => {
			const posts = snapshot.val();

			map(posts, post => {
				if (post.slug === blogPostSlug) {
					this.setState({ blogpost: post });
				}
			});
		});
	}

	render() {
		let markup;

		const blogpost = this.state.blogpost;
		if (blogpost) {
			markup = (
				<div className="frontend--blog--blogpost--container">
					<div className="frontend--blog--blogpost">
						<img src={blogpost.image} alt="blogpost" />
						<div className="frontend--blog--blogpost--inner--container">
							<h1 className="frontend--blog--blogpost--title">{blogpost.title}</h1>
							<div className="frontend--blog--blogpost--author">
								<img src={blogpost.author.image} alt={blogpost.author.name} />
								<h3>{blogpost.author.name}</h3>
							</div>
							<div
								className="frontend--blog--blogpost--content"
								dangerouslySetInnerHTML={{ __html: blogpost.body }}
							/>
						</div>
					</div>
				</div>
			);
		} else {
			markup = '';
		}

		return (
			<div className="frontend--background">
				<Header frontend={true} />
				{markup}
			</div>
		);
	}
}

export default BlogPost;
