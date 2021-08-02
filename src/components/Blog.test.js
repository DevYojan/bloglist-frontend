import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blog from './Blog';

let component;

beforeEach(() => {
  const blog = {
    title: 'This is a test blog',
    author: 'jest-dom',
    url: 'yojanregmi.com.np',
    user: 'adfdf',
  };

  component = render(<Blog blog={blog} />);
});

test('Blogs title and author is rendered by default', () => {
  expect(component.container.querySelector('.title')).toHaveTextContent('This is a test blog');
  expect(component.container.querySelector('.author')).toHaveTextContent('jest-dom');
});

test('Likes and url are not rendered by default', () => {
  expect(component.container.querySelector('.details')).toHaveStyle('display: none');
});

test('url and likes are shown after click', () => {
  const button = component.container.querySelector('.showButton');
  fireEvent.click(button);

  expect(component.container.querySelector('.details')).not.toHaveStyle('display: none');
});

test('2 mock calls if like is pressed twice', () => {
  const blog = {
    title: 'This is a test blog',
    author: 'jest-dom',
    url: 'yojanregmi.com.np',
    user: 'adfdf',
  };

  const handleLike = jest.fn();

  component = render(<Blog blog={blog} handleLike={handleLike} />);

  const button = component.container.querySelector('.showButton');
  fireEvent.click(button);

  const likeButton = component.container.querySelector('.likeButton');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(handleLike.mock.calls).toHaveLength(2);
});
