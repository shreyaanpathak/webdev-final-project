import { api } from "../config";

export const signin = async (credentials: { username: string; password: string }) => {
  try {
    const response = await api.post("/auth/signin", credentials);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.detail || "Login failed");
    }
    throw new Error("Network error occurred");
  }
};

export const signup = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

export const signout = async () => {
  const response = await api.get("/auth/signout");
  return response.data;
};

export const profile = async (userId: string) => {
  try {
    const response = await api.get(`/auth/profile/${userId}`); // Removed extra 'api'
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
};
