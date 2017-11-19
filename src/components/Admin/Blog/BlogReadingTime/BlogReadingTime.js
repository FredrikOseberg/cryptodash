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
		let input;

		if (this.props.readingTime) {
			input = (
				<input
					type="number"
					onChange={this.handleInputChange}
					value={this.props.readingTime}
					className="admin--blog--title--input--field"
				/>
			);
		} else {
			input = (
				<input type="number" onChange={this.handleInputChange} className="admin--blog--title--input--field" />
			);
		}
		return (
			<div className="admin--blog--title--input">
				<label>Reading Time</label>
				{input}
			</div>
		);
	}
}

export default BlogReadingTime;
