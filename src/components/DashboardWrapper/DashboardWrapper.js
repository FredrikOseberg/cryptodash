import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from '../../firebase';
import Landing from '../../components/Landing/Landing';
import Onboarding from '../../components/Onboarding/Onboarding';
import Dashboard from '../../components/Dashboard/Dashboard';

class DashboardWrapper extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showOnboarding: true
		};
	}
	componentDidMount() {
		const storageLocation = database.ref('users/' + this.props.currentUser.uid);
		console.log(this.props.currentUser);
		storageLocation.on('value', snapshot => {
			if (snapshot.hasChild('completedOnboarding')) {
				this.setState({ showOnboarding: false });
			}
		});
	}

	render() {
		let landingComponent;
		const signedIn = this.props.currentUser.status === 'SIGNED_IN';
		if (signedIn) {
			if (this.state.showOnboarding) {
				landingComponent = <Onboarding data={this.props.coinData} />;
			} else {
				landingComponent = <Dashboard />;
			}
		} else {
			landingComponent = <Landing data={this.props.coinData} />;
		}
		return <div className="dashboard--wrapper">{landingComponent}</div>;
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth
});

export default connect(mapStateToProps)(DashboardWrapper);
