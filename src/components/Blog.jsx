import Toggleable from "./Toggleable";

const Blog = ({ blog }) => {
  const Detail = ({ blog }) => {
    const handleAddLike = () => {
      alert("hai");
    };
    return (
      <div className="text-xl space-y-3">
        <div>
          <p>{blog.url}</p>
        </div>
        <div className="flex space-x-4">
          <p>{blog.likes}</p>
          <button
            onClick={handleAddLike}
            className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full"
          >
            like me
          </button>
        </div>
        <div>
          <p>{blog.author}</p>
        </div>
      </div>
    );
  };
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white">
      <h3 className="text-xl font-semibold text-gray-900">{blog.title}</h3>
      <p className="text-gray-700">{blog.content}</p>
      <Toggleable buttonLabel={"view"}>
        <Detail blog={blog} />
      </Toggleable>
    </div>
  );
};

export default Blog;
