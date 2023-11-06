import { configureStore } from "@reduxjs/toolkit";
import  emailSlice  from "./emailSlice"; 


export default configureStore({
    reducer:{
     email:emailSlice,
     
    }
})
