import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import axios from 'axios';
import Login from './components/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    handleLogin({ username, password });
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
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
