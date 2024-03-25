import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Login from './components/login';
import loginService from './services/login';
import Notification from './components/Notification';
import Logout from './components/Logout';
import CreateBlog from './components/CreateBlog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handlePasswordChange = (event) => setPassword(event.target.value);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const initialBlogs = await blogService.getAll();
        setBlogs(initialBlogs);
      } catch (exception) {
        setErrorMessage('Error fetching notes');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleBlogSubmit = async (e, newBlog) => {
    e.preventDefault();
    try {
      const response = await blogService.create(newBlog);
      if (response) {
        setBlogs(blogs.concat(response));

        setSuccessMessage(
          `A new blog ${response.title} by ${response.author} added`
        );
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      }
    } catch (exception) {
      console.log(exception);
      setErrorMessage('Error creating blog');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      const deletedBlog = blogs.find((blog) => blog.id === id);
      const confirmed = window.confirm(
        `Are you sure you want to delete the blog "${deletedBlog.title} By ${deletedBlog.author}"?`
      );
      if (confirmed) {
        await blogService.deleteBlog(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
        setSuccessMessage(
          `The blog "${deletedBlog.title}" is deleted successfully`
        );
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      }
    } catch (exception) {
      setErrorMessage('Error deleting blog');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong Username or Password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  return (
    <div>
      <h1>Blog app</h1>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      {!user && (
        <Login
          handleLoginSubmit={handleLoginSubmit}
          handlePasswordChange={handlePasswordChange}
          handleUsernameChange={handleUsernameChange}
          username={username}
          password={password}
        />
      )}
      {user && (
        <div>
          <p>{user.name} logged-in</p>
          <Logout handleLogout={handleLogout} />
          <CreateBlog handleBlogSubmit={handleBlogSubmit} />
          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <div key={blog.id}>
              <Blog blog={blog} />
              {user.username === blog.user.username && (
                <button onClick={() => handleDeleteBlog(blog.id)}>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
