import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    createBlog({ title, author, url });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
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

      <button onClick={handleSubmit}>Create</button>
    </form>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
