import { createSlice } from "@reduxjs/toolkit";
import UseApi from "../../../hook/useApi";
import { API_URLS } from "../../../service/centralUrl";

//creating cartslice
export const emailSlice=createSlice({
    name:"email",
    initialState:{user:{
        token:localStorage.getItem('token')||null,
        email:null
    },inbox:[],send:[],draft:[],trash:[]},
    reducers:{
        
        setToken:(state,action)=>{
            state.user.token=action.payload;
            console.log(action.payload);
            return
        },
        getToken:(state)=>{
         return state.user.token
        },
    //     setInbox:(state,action)=>{
    //     //   state.inbox.push(...action.payload);
    //     action.payload.forEach(element => {
    //         state.inbox.every((msg)=>element._id!==msg._id) ? state.inbox.push(element):null 
           
    //    });
    // },

    setInbox: (state, action) => {
        const emailElements = action.payload;
      
        if (Array.isArray(emailElements)) {
          emailElements.forEach(element => {
            // Check if the element is already in the inbox by comparing _id
            if (!state.inbox.some(msg => element._id === msg._id)) {
              state.inbox.push(element);
            }
          });
        }
      },
      
  }
});

export const {setToken,getToken,setInbox}=emailSlice.actions
export default emailSlice.reducer;