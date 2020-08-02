import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const user = await loginService.login(username, password);
			blogService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (error) {
			console.log(error);
		}
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
			<p>{user.name} logged in</p>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
