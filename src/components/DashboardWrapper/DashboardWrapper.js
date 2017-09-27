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
			showOnboarding: false,
			showDashboard: false,
			showLanding: false
		};
	}
	componentDidMount() {
		const storageLocation = database.ref('users/' + this.props.currentUser.uid);
		storageLocation.on('value', snapshot => {
			if (snapshot.hasChild('completedOnboarding')) {
				this.setState({ showOnboarding: false });
				this.setState({ showDashboard: true });
			} else {
				this.setState({ showOnboarding: true });
			}
		});

		const signedIn = this.props.currentUser.status === 'SIGNED_IN';

		if (!signedIn) {
			this.setState({ showLanding: true });
		}
	}

	render() {
		return (
			<div className="dashboard--wrapper">
				{this.state.showOnboarding && <Onboarding data={this.props.coinData} />}
				{this.state.showDashboard && <Dashboard />}
				{this.state.showLanding && <Landing data={this.props.coinData} />}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth
});

export default connect(mapStateToProps)(DashboardWrapper);
