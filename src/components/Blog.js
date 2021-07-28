import React, { useState } from "react";

const Blog = ({ blog }) => {
	const [visibility, setVisibility] = useState(false);

	const showOrHide = { display: visibility ? "" : "none" };

	const toggleVisibility = () => {
		setVisibility(!visibility);
	};

	return (
		<div className='blog'>
			<div className='title'>
				{blog.title} <button onClick={toggleVisibility}>{visibility ? "hide" : "view"}</button>
			</div>

			<div style={showOrHide}>
				<p>Author: {blog.author}</p>
				<p>
					Likes: {blog.likes} <button>like</button>
				</p>
				<p>Url: {blog.url}</p>
			</div>
		</div>
	);
};

export default Blog;
