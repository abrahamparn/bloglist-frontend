import axios from "axios";
const baseUrl = "/api/login";

const login = (username, password) => {
  try {
    let bodyPost = { username, password };
    const response = axios.post(baseUrl, bodyPost);
    return response;
  } catch (exception) {
    throw exception;
  }
};

export default { login };
