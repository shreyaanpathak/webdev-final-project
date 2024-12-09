import { dummyUsers } from "./dummyData";

export const signin = async (credentials: { username: string; password: string }) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = dummyUsers.find(
    (u) => u.username === credentials.username && u.password === credentials.password
  );
  
  if (!user) {
    throw new Error("Invalid credentials");
  }
  
  const { password, ...userWithoutPassword } = user;
  localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
  return userWithoutPassword;
};

export const signout = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  localStorage.removeItem("currentUser");
};

export const profile = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    return JSON.parse(currentUser);
  }
  return null;
};

export const updateUser = async (updates: any) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const userIndex = dummyUsers.findIndex(u => u.username === updates.username);
  if (userIndex >= 0) {
    dummyUsers[userIndex] = { ...dummyUsers[userIndex], ...updates };
    const { password, ...userWithoutPassword } = dummyUsers[userIndex];
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  }
  throw new Error("User not found");
};
