import { api } from "./config";

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  availability: string;
  office: string;
}

export interface ContactSectionProps {
  info: ContactInfo;
  onSave: (fieldName: string, value: string) => void;
}

export type FormErrors = {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  ssn?: string;
  password?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCVC?: string;
};

export type FormData = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  dob: string;
  ssn: string;
  password: string;
  membership: "REGULAR" | "GOLD";
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
};

export interface EditableFieldProps {
  value: string;
  onSave: (fieldName: string, value: string) => void;
  fieldName: string;
  className?: string;
}

export interface ProfileHeaderProps {
  profileData: any;
  onSave?: (fieldName: string, value: any) => void;
  isOwnProfile: boolean;
}

export interface UserCardProps {
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    membership: string;
  };
}

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
    throw error;
  }
};

export const updateProfile = async (userId: string, updatedData: any) => {
  try {
    const response = await api.put(`/auth/profile/${userId}`, updatedData);
    return response.data;
  } catch (error: any) {
    console.error("Failed to update profile:", error);
    throw error;
  }
};

export const uploadProfileImage = async (userId: string, file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(`/auth/profile/${userId}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to upload image:", error);
    throw error;
  }
};

export const getUsers = async (page: number = 1, search?: string) => {
  try {
    const skip = (page - 1) * 20;
    const params = new URLSearchParams({
      skip: skip.toString(),
      limit: '20'
    });
    if (search) params.append('search', search);
    
    const response = await api.get(`/auth/users?${params}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};


export const updateProfilePicture = async (userId: string, imageUrl: string) => {
  try {
    const response = await api.put(`/auth/profile/${userId}/update-picture`, {
      profile_picture: imageUrl
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update profile picture:', error);
    throw error;
  }
};
