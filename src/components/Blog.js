import React, { useState } from 'react';

const Blog = ({ blog, increaseLike, currentUser, deleteBlog }) => {
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

	const handleLike = (e, blog) => {
		e.preventDefault();

		increaseLike(blog.id);
	};

	const handleDelete = (e, blog) => {
		e.preventDefault();

		if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)) {
			deleteBlog(blog.id);
		}
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
					{blog.likes}{' '}
					<button onClick={(e) => handleLike(e, blog)}>Like</button>
				</p>
				<p>{blog.author}</p>
				{currentUser === blog.user.username && (
					<button
						style={{ color: 'red', padding: '2px' }}
						onClick={(e) => handleDelete(e, blog)}
					>
						Remove
					</button>
				)}
			</div>
		</div>
	);
};

export default Blog;
