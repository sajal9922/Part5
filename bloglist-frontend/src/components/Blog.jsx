import React from 'react';
import propTypes from 'prop-types';
const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);
Blog.propTypes = {
  blog: propTypes.object.isRequired,
};
export default Blog;
