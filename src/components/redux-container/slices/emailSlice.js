import { createSlice } from "@reduxjs/toolkit";

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
      }
   }
});
export const {setToken,getToken,setInbox,setSend}=emailSlice.actions
export default emailSlice.reducer;