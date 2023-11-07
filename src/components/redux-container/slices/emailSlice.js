import { createSlice } from "@reduxjs/toolkit";
import useApi from "../../../hook/useApi";
import { API_URLS } from "../../../service/centralUrl";

//creating cartslice
export const emailSlice=createSlice({
    name:"email",
    initialState:{user:{
        token:localStorage.getItem('token')||null,
        email:null
    },inbox:[],send:[],draft:[],trash:[],starred:[],important:[]},
    reducers:{
        
     setToken:(state,action)=>{
        state.user.token=action.payload;
        console.log(action.payload);
        return
      },
     getToken:(state)=>{
        return state.user.token
      },
     setInbox:(state,action)=>{
        action.payload.forEach(element => {
        state.inbox.every((msg)=>element._id!==msg._id) ? state.inbox.push(element):null
       });
     },
     setSend:(state,action)=>{
        action.payload.forEach(element => {
        state.send.every((msg)=>element._id!==msg._id) ? state.send.push(element):null 
       });
      },

   //Delete functionality
     setDelete:(state,action)=>{
    
   // Check msg with the specified _id is present in the send array
     const messageToDelete = state.send.find((message) => message._id === action.payload);
 
   // If the msg is found, filter it out and return a new state object
   if (messageToDelete) {
     const updatedSend = state.send.filter((message) => message._id !== action.payload);
     return {
       ...state,
       send: updatedSend,
     };
   }else if(state.inbox.some((message)=>message._id==action.payload)){
     const updatedInbox = state.inbox.filter((message) => message._id !== action.payload);
     return {
       ...state,
       inbox: updatedInbox,
     };
 
   }else if(state.draft.some((message)=>message._id==action.payload)){
     const updatedDraft = state.draft.filter((message) => message._id !== action.payload);
     return {
       ...state,
       draft: updatedDraft,
     };
   }
 
   // If the message is not found, return the unchanged state
   return state;
   },
  
     setDraft:(state,action)=>{
        action.payload.forEach(element => {
        state.draft.every((msg)=>element._id!==msg._id) ? state.draft.push(element):null     
      });
    },
   }
});
export default emailSlice.reducer;
export const {setToken,getToken,setInbox,setSend,
   setDelete,setDraft} = emailSlice.actions
