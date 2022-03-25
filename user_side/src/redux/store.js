import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducers from "./userReducers";
import postReducers from "./postReducers";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
const persistConfig = {
  version: 1,
  key: "root",
  storage,
};
const rootReducer = combineReducers({ user: userReducers, post: postReducers });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
