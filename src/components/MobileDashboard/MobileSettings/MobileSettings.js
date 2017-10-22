import React, { Component } from 'react';
import Settings from '../../Dashboard/Settings/Settings';
import './mobilesettings.css';

class MobileSettings extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<div className="mobile--settings">
				<Settings startPage={'Personal Info'} />
			</div>
		);
	}
}

export default MobileSettings;
