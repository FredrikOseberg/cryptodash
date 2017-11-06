import React, { Component } from 'react';
import './blogtitleinput.css';

class BlogTitleInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inputField: ''
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		this.setState({ inputField: event.target.value });
	}

	render() {
		return (
			<div className="admin--blog--title--input">
				<label>Title</label>
				<input type="text" onChange={this.handleInputChange} className="admin--blog--title--input--field" />
			</div>
		);
	}
}

export default BlogTitleInput;
