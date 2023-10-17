import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    Chats: []
};
export const ChatSlice = createSlice({
    name: 'Chats',
    initialState,
    reducers: {
        setChat: (state, { payload }) => {
            state.Chats = payload;
        },
        addNewChat: (state, { payload }) => {
            state.Chats = [...(state.Chats), payload]
        }
    },
});
export const { setChat, addNewChat } = ChatSlice.actions;
export default ChatSlice.reducer;
