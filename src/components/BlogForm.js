import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createNewBlog }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const [visible, setVisible] = useState(false);

	const addBlog = (e) => {
		e.preventDefault();

		createNewBlog({
			title,
			author,
			url,
		});

		setTitle('');
		setAuthor('');
		setUrl('');
		toggleVisibility();
	};

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const hiddenWhenVisible = { display: visible ? 'none' : '' };
	const visibleWhenVisible = { display: visible ? true : 'none' };

	return (
		<div>
			<button style={hiddenWhenVisible} onClick={toggleVisibility}>
				Create New Blog
			</button>
			<div style={visibleWhenVisible}>
				<h2>Create New</h2>
				<form onSubmit={addBlog}>
					<div>
						<label htmlFor="title">Title: </label>
						<input
							type="text"
							name="title"
							value={title}
							onChange={({ target }) => setTitle(target.value)}
						/>
					</div>
					<div>
						<label htmlFor="author">Author: </label>
						<input
							type="text"
							name="author"
							value={author}
							onChange={({ target }) => setAuthor(target.value)}
						/>
					</div>
					<div>
						<label htmlFor="url">Url: </label>
						<input
							type="text"
							name="url"
							value={url}
							onChange={({ target }) => setUrl(target.value)}
						/>
					</div>
					<button type="submit">Create</button>
				</form>
				<button style={visibleWhenVisible} onClick={toggleVisibility}>
					Cancel
				</button>
			</div>
		</div>
	);
};

BlogForm.propTypes = {
	createNewBlog: PropTypes.func.isRequired,
};

export default BlogForm;
