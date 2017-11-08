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
			error: '',
			validationPassed: false
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

				if (categories) {
					map(categories.categories, category => {
						const categoryInDBIsEqualToInput =
							category.name.toLowerCase() === this.state.categoryField.toLowerCase();
						if (categoryInDBIsEqualToInput) {
							categoryIsInDB = true;
						}
					});
				}

				resolve(categoryIsInDB);
			});
		});
	}

	validate() {
		return new Promise(resolve => {
			this.setState({ error: '' });
			this.checkIfCategoryExistsInDatabase().then(categoryIsInDB => {
				let categoryExists = categoryIsInDB;

				const categoryIsLessThanTwo = this.state.categoryField.length < 3;
				if (categoryIsLessThanTwo) {
					this.setState({ error: 'Category must be longer than 3 characters' });
					this.setState({ validationPassed: false });
				} else if (categoryExists) {
					this.setState({ error: 'Category already exists in the database' });
					this.setState({ validationPassed: false });
				} else {
					this.setState({ validationPassed: true });
				}
				resolve();
			});
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const blogRef = database.ref('blogs');
		this.validate().then(() => {
			const validationPassed = this.state.validationPassed;

			const categoryName = this.state.categoryField;
			if (validationPassed) {
				blogRef
					.child('categories')
					.child(categoryName)
					.child('name')
					.set(categoryName);

				this.props.setAdminPage('Add Blog');
			}
		});
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
