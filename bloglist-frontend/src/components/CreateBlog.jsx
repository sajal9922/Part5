import React, { useState } from 'react';

const CreateBlog = ({ handleBlogSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [showForm, setShowForm] = useState(false); // Add state variable for form visibility

  const handleNewBlogClick = () => {
    setShowForm(true); // Show the form when "New Blog" button is clicked
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    handleBlogSubmit(e, { title, author, url });
    // Reset form fields
    setTitle('');
    setAuthor('');
    setUrl('');
    setShowForm(false); // Hide the form after submission
  };

  return (
    <div>
      <h2>Create a New Blog</h2>
      {!showForm ? (
        <button onClick={handleNewBlogClick}>New Blog</button>
      ) : (
        <div>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="author">Author:</label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="url">URL:</label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button type="submit">Create Blog</button>
          </form>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default CreateBlog;
