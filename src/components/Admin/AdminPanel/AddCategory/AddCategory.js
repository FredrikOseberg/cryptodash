import React, { Component } from 'react';
import BlogCategoryInput from '../../Blog/BlogCategoryInput/BlogCategoryInput';
import { database } from '../../../../firebase';
import map from 'lodash/map';
import './addcategory.css';

class AddCategory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			categoryField: '',
			error: ''
		};

		this.handleCategoryInputChange = this.handleCategoryInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validate = this.validate.bind(this);
		this.checkIfCategoryExistsInDatabase = this.checkIfCategoryExistsInDatabase.bind(this);
	}

	handleCategoryInputChange(event) {
		this.setState({ categoryField: event.target.value });
	}

	checkIfCategoryExistsInDatabase() {
		return new Promise(resolve => {
			let categoryIsInDB = false;

			const blogRef = database.ref('blogs');

			blogRef.once('value', snapshot => {
				const categories = snapshot.val();

				map(categories, category => {
					const categoryInDBIsEqualToInput =
						category.name.toLowerCase() === this.state.categoryField.toLowerCase();
					if (categoryInDBIsEqualToInput) {
						categoryIsInDB = true;
					}
				});
				resolve(categoryIsInDB);
			});
		});
	}

	validate() {
		this.checkIfCategoryExistsInDatabase().then(categoryIsInDB => {
			let categoryExists = categoryIsInDB;

			const categoryIsLessThanTwo = this.state.categoryField.length < 3;
			if (categoryIsLessThanTwo) {
				this.setState({ error: 'Category must be longer than 3 characters' });
				return;
			} else if (categoryExists) {
				this.setState({ error: 'Category already exists in the database' });
				return;
			} else {
				return true;
			}
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const blogRef = database.ref('blogs');
		const validationPassed = this.validate();

		const categoryName = this.state.categoryField;
		if (validationPassed) {
			blogRef
				.child(categoryName)
				.child('name')
				.set(categoryName);

			this.props.setAdminPage('Add Blog');
		}
	}

	render() {
		return (
			<div className="admin--blog--add--category">
				<h1>Add Category</h1>
				<form>
					<BlogCategoryInput
						handleCategoryInputChange={this.handleCategoryInputChange}
						error={this.state.error}
					/>
					<button type="submit" className="admin--blog--add--category--button" onClick={this.handleSubmit}>
						Add Category
					</button>
				</form>
			</div>
		);
	}
}

export default AddCategory;
