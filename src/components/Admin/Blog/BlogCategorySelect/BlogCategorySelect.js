import React, { Component } from 'react';
import { database } from '../../../../firebase';
import map from 'lodash/map';
import './blogcategoryselect.css';

class BlogCategorySelect extends Component {
	constructor(props) {
		super(props);

		this.state = {
			categories: []
		};

		this.addCategory = this.addCategory.bind(this);
	}

	componentDidMount() {
		let newCategories = [];

		const blogRef = database.ref('blogs');

		blogRef.once('value', snapshot => {
			const categories = snapshot.val();

			map(categories, category => {
				newCategories.push(category.name);
			});

			this.setState({ categories: newCategories });
		});
	}

	addCategory() {
		this.props.setAdminPage('Add Category');
	}

	render() {
		let addCategoryButton = (
			<div className="admin--add--category--button" onClick={this.addCategory}>
				<i className="fa fa-plus" />
			</div>
		);
		let categoriesMarkup;
		if (this.state.categories.length > 0) {
			categoriesMarkup = (
				<div className="admin--blog--category--categories">
					<select>
						{this.state.categories.map(category => {
							return (
								<option key={category} value={category}>
									{category}
								</option>
							);
						})}
					</select>
					{addCategoryButton}
				</div>
			);
		} else {
			categoriesMarkup = (
				<div className="admin--blog--category--no--categories">
					<p>No categories to display. Add a new category.</p>
					{addCategoryButton}
				</div>
			);
		}

		return (
			<div className="admin--blog--category--select">
				<label>Category</label>
				{categoriesMarkup}
			</div>
		);
	}
}

export default BlogCategorySelect;
