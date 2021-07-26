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

	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	//Checking localStorage for saved logins.
	useEffect(() => {
		const user = JSON.parse(window.localStorage.getItem("blogUser"));

		if (user) {
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const response = await loginService.login({ username, password });
			setUser(response.data);
			console.log(response.data);
			blogService.setToken(response.data.token);
			window.localStorage.setItem("blogUser", JSON.stringify(response.data));

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

	const handleLogout = (event) => {
		event.preventDefault();
		window.localStorage.removeItem("blogUser");
		setUser(null);
	};

	const handleCreateBlog = async (e) => {
		e.preventDefault();

		const newBlog = await blogService.create({
			title,
			author,
			url,
		});

		setBlogs([...blogs, newBlog]);
		setMessage({ message: `Blog "${newBlog.title}" added successfully !`, type: "success" });

		setTitle("");
		setAuthor("");
		setUrl("");
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

	const createBlogForm = () => (
		<form action=''>
			<h2>Create Blog</h2>

			<p>
				<label htmlFor=''>Title : </label>
				<input type='text' value={title} onChange={({ target }) => setTitle(target.value)} />
			</p>

			<p>
				<label htmlFor=''>Author : </label>
				<input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} />
			</p>

			<p>
				<label htmlFor=''>Url : </label>
				<input type='text' value={url} onChange={({ target }) => setUrl(target.value)} />
			</p>

			<button onClick={handleCreateBlog}>Create</button>
		</form>
	);

	const showBlogs = () => (
		<div>
			<h2>blogs</h2>
			<p>
				{user.username} logged in ! <button onClick={handleLogout}>Logout</button>{" "}
			</p>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);

	return (
		<div>
			{message && showMessage()}
			{!user && loginForm()}
			{user && createBlogForm()}
			{user && showBlogs()}
		</div>
	);
};

export default App;
