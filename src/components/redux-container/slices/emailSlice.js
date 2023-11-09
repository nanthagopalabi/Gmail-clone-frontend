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
   }else if(state.starred.some((message)=>message._id==action.payload)){
    const updatedStarred = state.starred.filter((message) => message._id !== action.payload);
    return {
      ...state,
      draft: updatedStarred,
    };
  }else if(state.important.some((message)=>message._id==action.payload)){
    const updatedImportant = state.important.filter((message) => message._id !== action.payload);
    return {
      ...state,
      draft: updatedImportant,
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

     setStarred:(state,action)=>{
        action.payload?.forEach(element => {
        state.starred?.every((msg)=>element._id!==msg?._id) ? state.starred.push(element):null 
       });
           console.log(action);
     },

     setImportant:(state,action)=>{
         action.payload.forEach(element => {
         state.important.every((msg)=>element._id!==msg._id) ? state.important.push(element):null     
        });
     },
     
     setStartoggler:(state,action)=>{
        
        if (state.send.some((message)=>message._id==action.payload)) {
          const updatedSend = state.send.map(message => {
          if (message._id === action.payload) {
            // Toggle the starred property for the matching message
            return { ...message, starred: !message.starred };
          }
          return message; // Return unchanged messages
        });
      
        // Return a new state object with the updated 'send' array
        return { ...state, send: updatedSend };
      }else if(state.inbox.some((message)=>message._id==action.payload)){
        const updatedInbox = state.inbox.map(message => {
          if (message._id === action.payload) {
            // Toggle the starred property for the matching message
            return { ...message, starred: !message.starred };
          }
          return message; // Return unchanged messages
        });
        return { ...state, inbox: updatedInbox };
    
      }else if(state.draft.some((message)=>message._id==action.payload)){
        const updatedDraft = state.draft.map(message => {
          if (message._id === action.payload) {
            // Toggle the starred property for the matching message
            return { ...message, starred: !message.starred };
          }
          return message; // Return unchanged messages
        });
        return { ...state, draft: updatedDraft };
    
    
      }
    
    //   If the message is not found, return the unchanged state
      return state;
    
           },
    
           setImportanttoggler:(state,action)=>{
    
            if (state.send.some((message)=>message._id==action.payload)) {
              const updatedSend = state.send.map(message => {
                if (message._id === action.payload) {
                  // Toggle the starred property for the matching message
                  return { ...message, important: !message.important };
                }
                return message; // Return unchanged messages
              });
            
            // Return a new state object with the updated 'send' array
              return { ...state, send: updatedSend };
            }else if(state.inbox.some((message)=>message._id==action.payload)){
              const updatedInbox = state.inbox.map(message => {
                if (message._id === action.payload) {
                  // Toggle the starred property for the matching message
                  return { ...message, important: !message.important };
                }
                return message; // Return unchanged messages
              });
              return { ...state, inbox: updatedInbox };
          
            }else if(state.draft.some((message)=>message._id==action.payload)){
              const updatedDraft = state.draft.map(message => {
                if (message._id === action.payload) {
                  // Toggle the starred property for the matching message
                  return { ...message, important: !message.important };
                }
                return message; // Return unchanged messages
              });
              return { ...state, draft:updatedDraft };
            }
          //   If the message is not found, return the unchanged state
            return state;
           }
        },    
    });
    
export default emailSlice.reducer;
export const {setToken,getToken,setInbox,setSend,setDelete,setDraft,setImportant,
setStarred,setStartoggler,setImportanttoggler} = emailSlice.actions