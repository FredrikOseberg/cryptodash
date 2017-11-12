import React from 'react';
import './blogpostcard.css';

const BlogPostCard = props => (
	<div className="frontend--blog--post--card">
		<img src={props.image} alt="blogpost" />
		<div className="frontend--blog--post--card--details">
			<h3>{props.title}</h3>
			<div className="frontend--blog--post--card--dummy--text--short" />
			<div className="frontend--blog--post--card--dummy--text--long" />
			<div className="frontend--blog--post--card--dummy--text--medium" />
			<p>{props.category}</p>
		</div>
	</div>
);

export default BlogPostCard;
