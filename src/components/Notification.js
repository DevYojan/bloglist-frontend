import React from 'react';

const Notification = ({ notification }) => {
	if (notification === null) {
		return null;
	}

	return (
		<div>
			<p className={notification.type}>{notification.message}</p>
		</div>
	);
};

export default Notification;
