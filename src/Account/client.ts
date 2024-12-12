import { api } from "./config";

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

export const signout = async () => {
  try {
    const response = await api.get("/auth/signout");
    return response.data;
  } catch (error) {
    console.error("Signout error:", error);
    throw error;
  }
};

export const checkSession = async () => {
  try {
    const response = await api.get("/auth/check-session");
    return response.data;
  } catch (error) {
    return null;
  }
};

export const profile = async (userId: string) => {
  try {
    const response = await api.get(`/auth/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
};