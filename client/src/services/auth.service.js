import axios from "axios";
const API_URL = "https://mern-practiceproject.herokuapp.com/api/user";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }
  getCurrrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
