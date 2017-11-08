import React, { Component } from 'react';
import './blogpublishedselect.css';

class BlogPublishedSelect extends Component {
	constructor(props) {
		super(props);

		this.handleSelectChange = this.handleSelectChange.bind(this);
	}

	handleSelectChange(event) {
		this.props.handleBlogPublishedChange(event.currentTarget.value);
	}

	render() {
		return (
			<div className="admin--blog--published--select">
				<label>Blog Status</label>
				<select onChange={this.handleSelectChange} value={this.props.published}>
					<option value={false}>Draft</option>
					<option value={true}>Published</option>
				</select>
			</div>
		);
	}
}

export default BlogPublishedSelect;
