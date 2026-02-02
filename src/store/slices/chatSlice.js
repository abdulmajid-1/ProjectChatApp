import { createSlice } from '@reduxjs/toolkit';
import { userDummyData, messagesDummyData } from '../../data/dummyData';

const initialState = {
  users: userDummyData,
  messages: messagesDummyData,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;

export const selectUsersWithLastMessage = state => {
  return state.chat.users.map(user => {
    // Find last message related to this user

    const userMessages = state.chat.messages.filter(
      msg => msg.senderId === user._id || msg.receiverId === user._id,
    );

    // Sort by createdAt desc
    const sortedMessages = [...userMessages].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );

    const lastMsg = sortedMessages.length > 0 ? sortedMessages[0] : null;

    return {
      ...user,
      lastMessage: lastMsg ? lastMsg.text || 'Image' : 'No messages yet',
      lastMessageTime: lastMsg ? lastMsg.createdAt : null,
    };
  });
};

export default chatSlice.reducer;
