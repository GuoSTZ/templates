import axios from "axios";

import { getApiBaseUrl } from "@/shared/utils/env";

export const http = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
});

http.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
