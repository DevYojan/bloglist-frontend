import React, { useState } from 'react';

const Blog = ({ blog, handleLike, deleteBlog, userId }) => {
  const [visibility, setVisibility] = useState(false);

  const showOrHide = { display: visibility ? '' : 'none' };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleClick = (blog) => {
    const result = window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`);

    if (result) {
      deleteBlog(blog.id);
    }
  };

  return (
    <div className='blog'>
      <div className='title'>{blog.title}</div>
      <p className='author'>Author: {blog.author}</p>
      <button className='showButton' onClick={toggleVisibility}>
        {visibility ? 'hide' : 'view'}
      </button>

      <div style={showOrHide} className='details'>
        <p className='likes'>
          Likes: <span id='likes'>{blog.likes}</span>
          <button className='likeButton' onClick={() => handleLike(blog)}>
            like
          </button>
        </p>
        <p>Url: {blog.url}</p>
        {blog.user.id === userId && (
          <button onClick={() => handleClick(blog)} className='deleteButton'>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
