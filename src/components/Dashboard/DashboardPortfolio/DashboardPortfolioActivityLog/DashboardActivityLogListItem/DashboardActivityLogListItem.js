import React from 'react';
import bitcoin from '../../../../../img/coins/bitcoin.png';
import './dashboardactivityloglistitem.css';

const DashboardActivityLogListItem = props => {
	let listItem;
	if (props.eventType === 'add') {
		listItem = (
			<li className="dashboard--actvity--log--list--item">
				<div className="dashboard--activity--log--list--item--add">
					<i className="fa fa-plus" aria-hidden="true" />
				</div>
				<div className="dashboard--activity--log--list--item--date">01/12/2016</div>
				<div className="dashboard--actvitiy--log--list--item--coin">
					<img src={bitcoin} alt={'Bitcoin'} />
					Bitcoin
				</div>
				<div className="dashboard--activity--log--list--item--amount">1.44</div>
			</li>
		);
	} else {
		listItem = (
			<li className="dashboard--actvity--log--list--item">
				<div className="dashboard--activity--log--list--item--remove">
					<i className="fa fa-minus" aria-hidden="true" />
				</div>
				<div className="dashboard--activity--log--list--item--date">01/12/2016</div>
				<div className="dashboard--actvitiy--log--list--item--coin">
					<img src={bitcoin} alt={'Bitcoin'} />
					Bitcoin
				</div>
				<div className="dashboard--activity--log--list--item--amount">1.44</div>
			</li>
		);
	}

	return listItem;
};

export default DashboardActivityLogListItem;
