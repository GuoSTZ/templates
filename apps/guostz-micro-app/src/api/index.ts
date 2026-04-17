import axios from "axios";

export const http = axios.create({
  timeout: 10000,
});

http.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
