const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((a, b) => a + b, 0);
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const final = blogs.filter((blog) => {
    return blog.likes === Math.max(...likes);
  });

  const obj = {
    title: final[0].title,
    author: final[0].author,
    likes: final[0].likes,
  };

  return obj;
};

const mostBlogs = (blogs) => {
  const onlyBlogs = blogs.map((blog) => blog.blogs);
  return Math.max(...blogs);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
