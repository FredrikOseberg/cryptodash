import React, { Component } from 'react';
import './adminbloguploadmedia.css';

class BlogUploadMedia extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="admin--blog--upload--media">
				<h3>Upload Media</h3>
				<label>
					<i className="fa fa-upload" aria-hidden="true" />
					<input type="file" />
				</label>
			</div>
		);
	}
}

export default BlogUploadMedia;
