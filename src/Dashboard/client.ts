import { api } from "../config";

export const sendChatMessage = async (message, chatHistory = []) => {
  const response = await api.post("/chat/chat", {
    message,
    chat_history: chatHistory
  });
  return response.data;
};
