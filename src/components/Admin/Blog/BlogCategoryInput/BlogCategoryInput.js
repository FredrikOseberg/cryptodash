import React from 'react';
import './blogcategoryinput.css';

const BlogCategoryInput = props => {
	let inputClasses, errorMessage;
	if (props.error) {
		inputClasses = 'admin--blog--category--input--field main--input--error';
		errorMessage = <span className="main--input--error--message">{props.error}</span>;
	} else {
		inputClasses = 'admin--blog--category--input--field';
		errorMessage = '';
	}
	return (
		<div className="admin--blog--category--input">
			<label>Category</label>
			<input type="text" className={inputClasses} onChange={props.handleCategoryInputChange} />
			{errorMessage}
		</div>
	);
};

export default BlogCategoryInput;
