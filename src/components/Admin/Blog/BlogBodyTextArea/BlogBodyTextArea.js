import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './blogbodytextarea.css';

class BlogBodyTextArea extends Component {
	constructor(props) {
		super(props);

		this.state = {
			textarea: ''
		};

		this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
	}

	handleTextAreaChange(value) {
		this.setState({ textarea: value });
	}

	render() {
		return (
			<div className="admin--blog--body--text--area">
				<label>Blog Content</label>
				<ReactQuill
					value={this.state.textarea}
					onChange={this.handleTextAreaChange}
					className="admin--blog--text--input"
				/>
			</div>
		);
	}
}

export default BlogBodyTextArea;
