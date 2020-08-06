import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
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
	const [notification, setNotification] = useState(null);

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
			setNotification({
				message: `Welcome Back ${user.name}`,
				type: 'success',
			});
			setTimeout(() => {
				setNotification(null);
			}, 5000);
			setUsername('');
			setPassword('');
		} catch (error) {
			console.log(error);
			setNotification({ message: 'wrong username or password', type: 'error' });
			setTimeout(() => {
				setNotification(null);
			}, 5000);
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
		setNotification({
			message: `A new blog ${savedBlog.title} by ${savedBlog.author} added`,
			type: 'success',
		});
		setTimeout(() => {
			setNotification(null);
		}, 5000);
	};

	if (!user) {
		return (
			<div>
				<Notification notification={notification} />
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
			<Notification notification={notification} />
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
