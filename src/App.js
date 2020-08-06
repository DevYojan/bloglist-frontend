import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUser = window.localStorage.getItem('loggedBlogUser');

		if (loggedUser) {
			const user = JSON.parse(loggedUser);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const user = await loginService.login(username, password);
			window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
			blogService.setToken(user);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogout = (e) => {
		e.preventDefault();
		if (user) {
			window.localStorage.removeItem('loggedBlogUser');
			setUser(null);
		}
	};

	const handleCreateNewBlog = async (e) => {
		e.preventDefault();

		const newBlog = {
			title,
			author,
			url,
		};

		const savedBlog = await blogService.create(newBlog);
		setBlogs(blogs.concat(savedBlog));
	};

	if (!user) {
		return (
			<div>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="username">Username: </label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div>
						<label htmlFor="password">Password: </label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button type="submit">Login</button>
				</form>
			</div>
		);
	}

	return (
		<div>
			<h2>blogs</h2>
			<p>
				{user.name} logged in <button onClick={handleLogout}>Log out</button>
			</p>

			<div>
				<h2>Create New</h2>
				<form onSubmit={handleCreateNewBlog}>
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
			</div>

			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
