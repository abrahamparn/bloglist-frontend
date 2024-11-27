import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

// Login component and services
import Login from "./components/Login";
import loginService from "./services/login";

//Notification
import Notification from "./components/Notification";
import AddBlog from "./components/AddBlog";

// Toggleable
import Toggleable from "./components/Toggleable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("user");
    if (loggedUserJson) {
      const localUser = JSON.parse(loggedUserJson);
      setUser(localUser);
      blogService.setToken(localUser.token);
    }
  }, []);

  const blogFormRef = useRef();

  const showNotification = (message, status = "200") => {
    setNotification({ message, status });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    console.log({ username, password });
    try {
      let response = await loginService.login(username, password);
      response.message = `Successful loging in. Welcome ${username}`;
      setNotification(response);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      window.localStorage.setItem("user", JSON.stringify(response.data));
      blogService.setToken(response.data.token);
      setUser(response.data);
    } catch (exception) {
      setNotification(exception);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
    setUsername("");
    setPassword("");
  };

  const handleUsername = (event) => {
    let context = event.target.value;
    console.log("context", context);
    setUsername(context);
  };

  const handlePassword = (event) => {
    let context = event.target.value;
    console.log("context", context);
    setPassword(context);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    let response = { message: `Successful loging out. byebye ${username}`, status: 200 };

    setNotification(response);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleGetToken = () => {
    console.log(user);

    console.log(user.token);
  };

  const updateBlogsUseState = (data) => {
    blogFormRef.current.handleVisibility();
    setBlogs(blogs.concat(data));
  };
  return (
    <div className="container mx-auto px-4 py-6">
      <Notification message={notification} />
      {user === null && (
        <Login
          handleSubmitLogin={handleSubmitLogin}
          handlePassword={handlePassword}
          handleUsername={handleUsername}
          username={username}
          password={password}
        />
      )}
      {user !== null && (
        <Dashboard
          blogs={blogs}
          user={user}
          handleLogout={handleLogout}
          handleGetToken={handleGetToken}
          showNotification={showNotification}
          updateBlogsUseState={updateBlogsUseState}
          blogFormRef={blogFormRef}
        />
      )}
    </div>
  );
};

const Dashboard = ({
  blogs,
  user,
  handleLogout,
  handleGetToken,
  showNotification,
  updateBlogsUseState,
  blogFormRef,
}) => {
  return (
    <div>
      <div className="container flex items-center justify-between w-full mt-10">
        <h2 className="text-3xl font-bold text-gray-800">Blogs</h2>
        <div className="flex justify-between space-x-4 items-center">
          <p className="text-gray-600 text-2xl font-bold">{user.username}</p>
          <button
            onClick={handleLogout}
            className="text-2xl bg-red-400 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Logout
          </button>
          <button
            onClick={handleGetToken}
            className="text-2xl bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Get Token
          </button>
        </div>
      </div>
      <Toggleable buttonLabel="Add New Blog" ref={blogFormRef}>
        <AddBlog
          showNotification={showNotification}
          user={user}
          updateBlogsUseState={updateBlogsUseState}
        />
      </Toggleable>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
