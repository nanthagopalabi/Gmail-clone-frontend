import { createSlice } from "@reduxjs/toolkit";

//creating cartslice
export const emailSlice=createSlice({
    name:'email',
    initialState:{user:{
        token:localStorage.getItem('token')||null,
        email:null
       },inbox:[],send:[],draft:[],trash:[],starred:[],important:[]},
    reducers:{
        
    setToken:(state,action)=>{
        state.user.token=action.payload;
        return
      },
    setInbox:(state,action)=>{
        action.payload?.forEach(element => {
        state.inbox.every((msg)=>element?._id!==msg?._id) ? state.inbox.push(element):null
       });
     },
    setSend:(state,action)=>{
        action.payload.forEach(element => {
        state.send.every((msg)=>element?._id!==msg._id) ? state.send.push(element):null 
       });
      },

  
    setDelete:(state,action)=>{
    
  // If the message is found, filter it out and return a new state object
  if (state.send.some((msg)=>msg._id==action.payload)) {
    const updatedSend = state.send.filter((msg) => msg._id !== action.payload);
    const updatedStarred = (state.starred ?? []).filter((msg) => msg._id !== action.payload);
    const updatedImportant = (state.important ?? []).filter((msg) => msg._id !== action.payload);
    return {
      ...state,
      send: updatedSend,
      starred:updatedStarred,
      important:updatedImportant
    };
  }else if(state.inbox.some((msg)=>msg._id==action.payload)){
    const updatedInbox = state.inbox.filter((msg) => msg._id !== action.payload);
    const updatedStarred =(state.starred ?? []).filter((msg) => msg._id !== action.payload);
    const updatedImportant = (state.important ?? []).filter((msg) => msg._id !== action.payload);
    return {
      ...state,
      inbox: updatedInbox,
      starred:updatedStarred,
      important:updatedImportant
    };

  }else if(state.draft.some((msg)=>msg._id==action.payload)){
    const updatedDraft = state.draft.filter((msg) => msg._id !== action.payload);
    const updatedStarred = (state.starred ?? []).filter((msg) => msg._id !== action.payload);
    const updatedImportant = (state.important ?? []).filter((msg) => msg._id !== action.payload);
    return {
      ...state,
      draft: updatedDraft,
      starred:updatedStarred,
      important:updatedImportant
    };
   }else if(state.trash.some((msg)=>msg._id==action.payload)){
    const updatedTrash = state.trash.filter((msg) => msg._id !== action.payload);
    return {...state,trash:updatedTrash}
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
      const updatedStarred=action.payload
          return {...state,starred:updatedStarred}
     },

     setImportant:(state,action)=>{
      const updatedImportant=action.payload
      return {...state,important:updatedImportant}
     },

     setTrash:(state,action)=>{
        action.payload?.forEach(element => {
        state.trash.every((msg)=>element?._id!==msg?._id) ? state.trash.push(element):null  
      });
    },

     setStartoggler:(state,action)=>{
        
      if (state.send.some((msg)=>msg._id==action.payload)) {
        const updatedSend = state.send.map(msg => {
          if (msg._id === action.payload) {
            // Toggle the starred property for the matching message
            return { ...msg, starred: !msg.starred };
          }
          return msg; 
        });
        const updatedStarred = state.starred?.map(msg => {
          if (msg._id === action.payload) {
            // Toggle the starred property for the matching message
            return { ...msg, starred: !msg.starred };
          }
          return msg; 
        });
       
        // Return a new state object with the updated 'send' array
        return { ...state, send: updatedSend,starred:updatedStarred,};

      }else if(state.inbox.some((msg)=>msg._id==action.payload)){
        const updatedInbox = state.inbox.map(msg => {
          if (msg._id === action.payload) {
            // Toggle the starred property for the matching message
            return { ...msg, starred: !msg.starred };
          }
          return msg; 
        });
        const updatedStarred = state.starred?.map(msg => {
          if (msg._id === action.payload) {
            // Toggle the starred property for the matching message
            return { ...msg, starred: !msg.starred };
          }
          return msg;
        });
       
        return { ...state, inbox: updatedInbox ,starred:updatedStarred};
    
      }else if(state.draft.some((msg)=>msg._id==action.payload)){
        const updatedDraft = state.draft.map(msg => {
          if (msg._id === action.payload) {
            // Toggle the starred property for the matching message
            return { ...msg, starred: !msg.starred };
          }
          return msg; 
        });
        const updatedStarred = state.starred.map(msg => {
          if (msg._id === action.payload) {
            // Toggle the starred property for the matching message
            return { ...msg, starred: !msg.starred };
          }
          return msg; 
        });
        return { ...state, draft: updatedDraft,starred:updatedStarred }    
      }
    
    //   If the message is not found, return the unchanged state
      return state;
           },
    
    setImportanttoggler:(state,action)=>{
    
        if (state.send.some((msg)=>msg._id==action.payload)) {
              const updatedSend = state.send.map(msg => {
                if (msg._id === action.payload) {
                  // Toggle the starred property for the matching message
                  return { ...msg, important: !msg.important };
                }
                return msg;
              }); 
              
            const updatedImportant = state.important?.map(msg => {
                if (msg._id === action.payload) {
                  // Toggle the starred property for the matching message
                  return { ...msg, important: !msg.important };
                }
                return msg;
              });

            // Return a new state object with the updated 
              return { ...state,send:updatedSend,important:updatedImportant };
            
            }else if(state.inbox.some((msg)=>msg._id==action.payload)){
              const updatedInbox = state.inbox.map(msg => {
                if (msg._id === action.payload) {
                  // Toggle the starred property for the matching message
                  return { ...msg, important: !msg.important };
                }
                return msg; 
              });
              
              const updatedImportant = state.important?.map(msg => {
                if (msg._id === action.payload) {
                  // Toggle the starred property for the matching message
                  return { ...msg, important: !msg.important };
                }
                return msg; 
              });
              return { ...state, inbox: updatedInbox,important:updatedImportant};
          
            }else if(state.draft.some((msg)=>msg._id==action.payload)){
              const updatedDraft = state.draft.map(msg => {
                if (msg._id === action.payload) {
                  // Toggle the starred property for the matching message
                  return { ...msg, important: !msg.important };
                }
                return msg; 
              });
             
              const updatedImportant = state.important?.map(msg => {
                if (msg._id === action.payload) {
                  // Toggle the starred property for the matching message
                  return { ...msg, important: !msg.important };
                }
                return msg;
              });

              return { ...state, draft:updatedDraft,important:updatedImportant};
            }
          //   If the message is not found, return the unchanged state
            return state;
           }
        },
    });    
export default emailSlice.reducer;
export const {setToken,setInbox,setSend,setDelete,setDraft,setImportant,setTrash,
setStarred,setStartoggler,setImportanttoggler} = emailSlice.actions