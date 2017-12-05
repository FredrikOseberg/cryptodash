import React from 'react';
import bitcoin from '../../../../../img/coins/bitcoin.png';
import './dashboardactivityloglistitem.css';

const DashboardActivityLogListItem = props => {
	let listItem;
	if (props.eventType === 'add') {
		listItem = (
			<li className="dashboard--activity--log--list--item">
				<div className="dashboard--activity--log--list--item--add">
					<i className="fa fa-plus" aria-hidden="true" />
				</div>
				<div className="dashboard--activity--log--list--item--date">{props.timestamp}</div>
				<div className="dashboard--actvitiy--log--list--item--coin">
					<img src={props.img} alt={props.name} />
					{props.name}
				</div>
				<div className="dashboard--activity--log--list--item--amount dashboard--activity--log--list--item--amount--add">
					+{props.amount}
				</div>
			</li>
		);
	} else {
		listItem = (
			<li className="dashboard--activity--log--list--item">
				<div className="dashboard--activity--log--list--item--remove">
					<i className="fa fa-minus" aria-hidden="true" />
				</div>
				<div className="dashboard--activity--log--list--item--date">{props.timestamp}</div>
				<div className="dashboard--actvitiy--log--list--item--coin">
					<img src={props.img} alt={props.name} />
					{props.name}
				</div>
				<div className="dashboard--activity--log--list--item--amount dashboard--activity--log--list--item--amount--remove">
					-{props.amount}
				</div>
			</li>
		);
	}

	return listItem;
};

export default DashboardActivityLogListItem;
