import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themeSlice } from './Slices/Theme';
import { ChatSlice } from './Slices/TempChat';

const rootReducer = combineReducers({
  theme: themeSlice.reducer,
  Chats: ChatSlice.reducer,
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['Chats'],
  // whitelist: ['theme'],
};
const persistReducers = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
