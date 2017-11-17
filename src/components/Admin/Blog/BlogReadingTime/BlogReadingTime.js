import React, { Component } from 'react';

class BlogReadingTime extends Component {
	constructor(props) {
		super(props);

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		this.props.handleBlogReadingTimeChange(event.target.value);
	}

	render() {
		return (
			<div className="admin--blog--title--input">
				<label>Reading Time</label>
				<input
					type="number"
					onChange={this.handleInputChange}
					value={this.props.number}
					className="admin--blog--title--input--field"
				/>
			</div>
		);
	}
}

export default BlogReadingTime;
