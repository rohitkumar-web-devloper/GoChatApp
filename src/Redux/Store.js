import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themeSlice } from "./Slices/Theme";

const rootReducer = combineReducers({
    theme: themeSlice.reducer
});
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // blacklist: [],
    // whitelist: ['theme'],
}
const persistReducers = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export const persistor = persistStore(store)