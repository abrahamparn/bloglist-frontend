import React from "react";
import { useState } from "react";
import blogsService from "../services/blogs";

export default function AddBlog({ showNotification, user, updateBlogsUseState }) {
  //For Blog
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleUrl = (event) => {
    setUrl(event.target.value);
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    console.log({ title, author, url });
    let newObject = {
      author,
      title,
      url,
      userId: user.userId,
    };
    try {
      let response = await blogsService.create(newObject);
      console.log("response", response);
      updateBlogsUseState(response);
      showNotification(`A new blog "${title}" by ${author} added!`, "200");
    } catch (exception) {
      showNotification(exception.message, "401");
    }

    setAuthor("");
    setTitle("");
    setUrl("");
  };
  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Add New Blog</h1>
      <form onSubmit={handleSubmitForm}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            onChange={handleTitle}
            value={title}
            placeholder="Enter blog title"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Author</label>
          <input
            type="text"
            onChange={handleAuthor}
            value={author}
            placeholder="Enter author's name"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">URL</label>
          <input
            type="text"
            onChange={handleUrl}
            value={url}
            placeholder="Enter blog URL"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
