import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

test('blog form calls the event handler with right data', () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const title = component.container.querySelector('#title');
  const url = component.container.querySelector('#url');
  const author = component.container.querySelector('#author');
  const submitButton = component.container.querySelector('.submitButton');

  fireEvent.change(title, {
    target: { value: 'Testing forms' },
  });
  fireEvent.change(url, {
    target: { value: 'yojanregmi.com' },
  });
  fireEvent.change(author, {
    target: { value: 'Yojan' },
  });

  fireEvent.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('Testing forms');
  expect(createBlog.mock.calls[0][0].url).toBe('yojanregmi.com');
  expect(createBlog.mock.calls[0][0].author).toBe('Yojan');
});
