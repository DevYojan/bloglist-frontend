import React, { useState } from 'react';

const Blog = ({ blog }) => {
	const [visible, setVisible] = useState(false);

	const toggle = () => {
		setVisible(!visible);
	};

	const hidden = { display: 'none' };
	const shown = { display: '' };

	const blogStyle = {
		padding: '5px',
		paddingLeft: '2px',
		margin: '5px',
		border: '1px solid blue',
	};

	return (
		<div style={blogStyle}>
			<div>
				{blog.title}{' '}
				<button onClick={toggle}>{visible ? 'hide' : 'show'}</button>
			</div>
			<div style={visible ? shown : hidden}>
				<p>{blog.url}</p>
				<p>
					{blog.likes} <button>Like</button>
				</p>
				<p>{blog.author}</p>
			</div>
		</div>
	);
};

export default Blog;
