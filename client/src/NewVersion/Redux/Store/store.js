// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './../Slice/UserSlice';
import ProjectReducer from './../Slice/ProjectSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    project:ProjectReducer
  },
});

export default store;
