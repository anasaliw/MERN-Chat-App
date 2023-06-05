import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

export const instanceGet = (endpoint) => {
  return axios.get(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        localStorage.getItem("token") || sessionStorage.getItem("authToken")
      }`,
    },
  });
};
export const instancePost = (endpoint, data) => {
  return axios.post(`${BASE_URL}${endpoint}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        localStorage.getItem("token") || sessionStorage.getItem("authToken")
      }`,
    },
  });
};
export const instancePut = (endpoint, data) => {
  return axios.put(`${BASE_URL}${endpoint}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        localStorage.getItem("token") || sessionStorage.getItem("authToken")
      }`,
    },
  });
};
