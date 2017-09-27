import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from '../../firebase';
import Loading from '../Loading/Loading';
import Landing from '../../components/Landing/Landing';
import Onboarding from '../../components/Onboarding/Onboarding';
import Dashboard from '../../components/Dashboard/Dashboard';
import store from '../../store/store';

class DashboardWrapper extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showOnboarding: false,
			showDashboard: false,
			showLanding: false
			// showLoading: true
		};
	}
	componentDidMount() {
		const storageLocation = database.ref('users/' + this.props.currentUser.uid);
		if (this.props.currentUser.status === 'SIGNED_IN') {
			storageLocation.on('value', snapshot => {
				if (snapshot.hasChild('completedOnboarding')) {
					this.setState({ showOnboarding: false });
					this.setState({ showDashboard: true });
					this.setState({ showLoading: false });
				} else {
					this.setState({ showOnboarding: true });
					this.setState({ showLoading: false });
				}
			});
		}

		if (!this.props.currentUser.status) {
			this.setState({ showLanding: true });
			this.setState({ showLoading: false });
		} else if (this.props.currentUser.status === 'ANONYMOUS') {
			this.setState({ showLoading: false });
			this.setState({ showLanding: true });
		} else if (this.props.currentUser.status === 'SIGNED_IN') {
			this.setState({ showLanding: false });
			this.setState({ showLoading: false });
		}
	}

	render() {
		return (
			<div className="dashboard--wrapper">
				{this.state.showOnboarding && <Onboarding data={this.props.coinData} />}
				{this.state.showDashboard && <Dashboard />}
				{this.state.showLanding && <Landing data={this.props.coinData} />}
				{/*	{this.state.showLoading && <Loading />} */}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth
});

export default connect(mapStateToProps)(DashboardWrapper);
