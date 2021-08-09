import React, { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [message, setMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    (async function () {
      const blogs = await blogService.getAll();
      blogs.sort((a, b) => b.likes - a.likes);
      blogs.map((blog) => {
        blog.visible = false;
      });
      setBlogs(blogs);
    })();
  }, []);

  //Checking localStorage for saved logins.
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('blogUser'));

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
      blogService.setToken(response.data.token);
      window.localStorage.setItem('blogUser', JSON.stringify(response.data));

      setMessage({ message: `welcome back ${response.data.username}`, type: 'success' });
      setTimeout(() => {
        setMessage(null);
      }, 5000);

      setUsername('');
      setPassword('');
    } catch {
      setMessage({ message: 'Incorrect Credentials', type: 'error' });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('blogUser');
    setUser(null);

    setMessage({ message: 'Logged out successfully !', type: 'success' });

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const createBlog = async (blogData) => {
    const newBlog = await blogService.create(blogData);

    blogFormRef.current.toggleVisibility();
    setBlogs([...blogs, newBlog]);
    setMessage({ message: `Blog "${newBlog.title}" added successfully !`, type: 'success' });

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleLike = async (blogToLike) => {
    const increasedLikeBlog = {
      user: blogToLike.user.id,
      likes: blogToLike.likes + 1,
      author: blogToLike.author,
      title: blogToLike.title,
      url: blogToLike.url,
      id: blogToLike.id,
    };

    const modifiedBlog = await blogService.like(increasedLikeBlog);

    //replace the modified blog
    const temp = [...blogs];

    temp.map((blog) => {
      if (blog.id === modifiedBlog.id) {
        blog.likes = modifiedBlog.likes;
      }
    });

    temp.sort((a, b) => b.likes - a.likes);

    setBlogs(temp);
  };

  const deleteBlog = async (id) => {
    const response = await blogService.remove(id);

    if (response.status !== 204) {
      setMessage({ message: 'OOps an error occured deleting blog !', type: 'error' });

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }

    setBlogs(blogs.filter((blog) => blog.id !== id));
    setMessage({ message: 'Blog Deleted Successfully', type: 'success' });

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const showMessage = () => <p className={message.type}>{message.message}</p>;

  const loginForm = () => (
    <form action=''>
      <h2>Login</h2>
      <label htmlFor=''>Username: </label>
      <input
        id='username'
        type='text'
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      <label htmlFor=''>Password: </label>
      <input
        id='password'
        type='text'
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </form>
  );

  const createBlogForm = () => (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  );

  const showBlogs = () => (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          deleteBlog={deleteBlog}
          userId={user.id}
          className='blog'
        />
      ))}
    </div>
  );

  return (
    <div>
      <h2>blogs</h2>

      {message && showMessage()}
      {user && (
        <p>
          {user.username} logged in ! <button onClick={handleLogout}>Logout</button>{' '}
        </p>
      )}
      {!user && loginForm()}
      {user && createBlogForm()}
      {user && showBlogs()}
    </div>
  );
};

export default App;
