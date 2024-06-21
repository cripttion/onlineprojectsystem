import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../Slice/UserSlice';
import ProjectReducer from '../Slice/ProjectSlice';
const rootReducer = combineReducers({
    user:userReducer,
    project:ProjectReducer,
});
export default rootReducer;