import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import axios from 'axios';
import Login from './components/login';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handlePasswordChange = (event) => setPassword(event.target.value);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Blog app</h1>
      <Notification errorMessage={errorMessage} />
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
          <h2>blogs</h2>
          <p>{user.name} logged-in</p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
