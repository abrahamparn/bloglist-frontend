const Blog = ({ blog }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white">
      <h3 className="text-xl font-semibold text-gray-900">{blog.title}</h3>
      <p className="text-gray-700">{blog.content}</p>
    </div>
  );
};

export default Blog;
