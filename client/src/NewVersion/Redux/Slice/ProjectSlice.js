import { createSlice } from '@reduxjs/toolkit';
import API_ENDPOINTS from '../../Helper/ApiConfig';
import axios from 'axios'
const initialState = {
    projectID:null,
    isLoading: false,
    error: false,
    projectData: null,
  };

export const ProjectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
   setProjectID(state,action){
     state.projectID = action.payload
   },
   setProjectData(state,action){
    state.projectData = action.payload
   }
  },
});

export const { setProjectID } = ProjectSlice.actions;

export const fetchProjectID = (StudentID)=>async dispatch =>{
  console.log(StudentID);
    try{
        const response = await axios.get(API_ENDPOINTS.GET_PROJECTDATA_STUDENTID.replace("{StudentID}",StudentID));
        console.log(response.data)
        if(response.status===200)
        {
            dispatch(setProjectID(response.data));
        }
        return response.data;
    }catch(error)
    {
      console.log(error);
    }
}
export default ProjectSlice.reducer;
