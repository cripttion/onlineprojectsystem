import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_ENDPOINTS from '../../Helper/ApiConfig';
import{jwtDecode} from 'jwt-decode'
const initialState = {
  token: null,
  isLoading: false,
  error: false,
  userData: null,
  loginData:null
};

export const login = createAsyncThunk(
  'user/login',
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, requestData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const userData = (AdmissionNumber) =>async dispatch=>{
    try{
       const response = await axios.get(API_ENDPOINTS.GETUSERBYID.replace("{userID}",AdmissionNumber));
       const result = response.data;
       console.log(result)
       if(response.status===200)
        {
          dispatch(setUserData(result));
        }
        else{
          console.log("Unable to get UserData");
        }
    }catch(error){
      dispatch(setError(error))
    }
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = null;
      state.error = false;
      state.isLoading = false;
    },
    setError(state,action){
      state.error = action.payload
    },
    setUserData(state,action){
      state.userData = action.payload
    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.result;
        localStorage.setItem('token', action.payload.result);
        state.loginData = jwtDecode(action.payload.result);
        
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setToken, logout,setError,setUserData } = userSlice.actions;

export default userSlice.reducer;
