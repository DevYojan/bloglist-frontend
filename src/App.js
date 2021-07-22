import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState("");
	const [message, setMessage] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const response = await loginService.login({ username, password });
			setUser(response.data);
			setMessage({ message: `welcome back ${response.data.username}`, type: "success" });
			setTimeout(() => {
				setMessage(null);
			}, 5000);
			setUsername("");
			setPassword("");
		} catch {
			setMessage({ message: "Incorrect Credentials", type: "error" });
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	const showMessage = () => <p className={message.type}>{message.message}</p>;

	const loginForm = () => (
		<form action=''>
			<h2>Login</h2>
			<label htmlFor=''>Username: </label>
			<input type='text' value={username} onChange={({ target }) => setUsername(target.value)} />
			<br />
			<label htmlFor=''>Password: </label>
			<input type='text' value={password} onChange={({ target }) => setPassword(target.value)} />
			<br />
			<button onClick={handleLogin}>Login</button>
		</form>
	);

	const showBlogs = () => (
		<div>
			<h2>blogs</h2>
			<p>{user.username} logged in !</p>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);

	return (
		<div>
			{message && showMessage()}
			{!user && loginForm()}
			{user && showBlogs()}
		</div>
	);
};

export default App;
