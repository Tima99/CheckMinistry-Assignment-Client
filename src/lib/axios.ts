import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_V1_BASE_URL,
});

// Response interceptor
api.interceptors.response.use((response) => {
  // If response is status betweeen 200 && 300
  if (response.status >= 200 && response.status < 300) {
    // Only return `data` from response
    return response.data;
  }

  return response;
});

export default api;
