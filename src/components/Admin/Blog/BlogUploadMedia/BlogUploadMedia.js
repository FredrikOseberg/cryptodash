import React, { Component } from 'react';
import { storage } from '../../../../firebase';
import './adminbloguploadmedia.css';

class BlogUploadMedia extends Component {
	constructor(props) {
		super(props);

		this.state = {
			compState: 'Default',
			imageURL: '',
			progress: 0,
			error: ''
		};

		this.validate = this.validate.bind(this);
		this.handleUploadChange = this.handleUploadChange.bind(this);
		this.reset = this.reset.bind(this);
		this.removeImage = this.removeImage.bind(this);
	}

	componentDidMount() {
		if (this.props.downloadURL && this.props.downloadURL !== 'noPhoto') {
			this.setState({ compState: 'Uploaded' });
			this.setState({ imageURL: this.props.downloadURL });
		} else if (this.props.downloadURL === 'noPhoto') {
			console.log('running');
			this.reset();
		}
	}

	validate(file) {
		let validFile = false;
		const allowedExtensions = ['jpg', 'png', 'jpeg'];
		const fileExtension = file.name
			.split('.')
			.pop()
			.toLowerCase();

		allowedExtensions.forEach(extension => {
			if (extension === fileExtension) {
				validFile = true;
			}
		});

		return validFile;
	}

	reset() {
		this.setState({ compState: 'Default' });
		this.setState({ imageURL: '' });
		this.setState({ progress: 0 });
		this.setState({ error: '' });
	}

	removeImage() {
		this.props.removeImageFromFirebase();
		this.reset();
	}

	handleUploadChange(event) {
		const file = event.target.files[0];
		const validationPassed = this.validate(file);

		if (validationPassed) {
			const fileName = file.name;

			const storageRef = storage.ref(`/blogImages/${fileName}`);

			this.setState({ compState: 'Uploading' });
			const uploadTask = storageRef.put(file);

			uploadTask.on(
				'state_changed',
				snapshot => {
					const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
					this.setState({ progress });
				},
				error => {
					this.setState({ error: error.code });
				},
				() => {
					const downloadURL = uploadTask.snapshot.downloadURL;
					const uploadRef = `blogImages/${fileName}`;
					this.setState({ imageURL: downloadURL }, () => {
						this.setState({ compState: 'Uploaded' });
						this.props.setUploadRef(uploadRef);
					});

					this.props.setDownloadURL(downloadURL);
				}
			);
		}

		// In parent component. Check to see if blogpost form has been submitted. If it hasn't remove image from firebase.
	}

	render() {
		const innerProgressBarStyles = {
			width: `${this.state.progress}%`
		};
		// Show image when completed upload
		const progressBar = (
			<div className="admin--blog--upload--progress--bar">
				<div className="admin--blog--upload--progress--bar--inner--bar" style={innerProgressBarStyles} />
			</div>
		);

		const upload = (
			<label>
				<i className="fa fa-upload" aria-hidden="true" />
				<input type="file" onChange={this.handleUploadChange} />
			</label>
		);

		const image = (
			<div className="admin--blog--upload--image">
				<div className="admin--blog--upload--image--container">
					<img src={this.state.imageURL} alt="Blog thumbnail" />
				</div>
				<div className="admin--blog--upload--image--delete" onClick={this.removeImage}>
					<i className="fa fa-trash" aria-hidden="true" />
				</div>
			</div>
		);

		const showUpload = this.state.compState === 'Default';
		const showProgressBar = this.state.compState === 'Uploading';
		const showImage = this.state.compState === 'Uploaded';
		return (
			<div className="admin--blog--upload--media">
				<h3>Upload Media</h3>
				{showUpload && upload}
				{showProgressBar && progressBar}
				{showImage && image}
			</div>
		);
	}
}

export default BlogUploadMedia;
