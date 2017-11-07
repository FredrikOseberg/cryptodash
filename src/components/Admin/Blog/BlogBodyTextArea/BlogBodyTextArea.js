import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './blogbodytextarea.css';

class BlogBodyTextArea extends Component {
	constructor(props) {
		super(props);

		this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
	}

	handleTextAreaChange(value) {
		this.props.handleBlogContentChange(value);
	}

	render() {
		return (
			<div className="admin--blog--body--text--area">
				<label>Blog Content</label>
				<ReactQuill onChange={this.handleTextAreaChange} className="admin--blog--text--input" />
			</div>
		);
	}
}

export default BlogBodyTextArea;
