import axios from 'axios'
import React, { useEffect, useState } from 'react'
import StarBorderIcon from "@mui/icons-material/StarBorder";
import styled from 'styled-components';
import { Box, IconButton,  } from '@mui/material';
import Checkbox from "@mui/material/Checkbox";
import { Star, StarBorder } from '@mui/icons-material';
import { API_URLS } from '../service/centralUrl';
import { useDispatch, useSelector } from 'react-redux';
import {setInbox} from './redux-container/slices/emailSlice.js'
import useApi from '../hook/useApi';
import Layout from './MsgBodyPage/Layout';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import { setDelete } from './redux-container/slices/emailSlice.js';

function Inbox() {
const navigate=useNavigate(); 
const dispatch=useDispatch();

const state=useSelector(state=>state.email);
const {inbox}=state;
const token=localStorage.getItem('token');
const mailDelete=useApi(API_URLS.deleteMsg);
const getInbox=useApi(API_URLS.getInboxMsg);

useEffect(()=>{
  const fetchdata=async()=>{
    const res=await getInbox.call({},token);
    console.log(res);
  if(res.status){
    const data=res.data.message;
   dispatch(setInbox(data));
  }
}
 fetchdata();
},[]);

//function for view individual message
const handleMailClick=(event)=>{
  let msgId=event.target.id
  if(msgId){
    navigate(`/inbox/${msgId}`);
  }else{
     msgId=event.target.parentElement.id
     navigate(`/inbox/${msgId}`);
  }
}

 //function to handle delete
const handleDelete=async(event)=>{
  try {
    let msgId=event.target.closest('.row').children[1].id;
    const params=msgId;
    console.log(params);
    dispatch(setDelete(msgId));
    const res= await mailDelete.call({},token,params);
    console.log(res);
     if(res.status){
       const update=await getInbox.call({},token);
     if(update.status){
       const data = update.data.message;
       dispatch(setInbox(data));
      }
     }
    } catch (error) {
      console.log(error);
    }    
  }
return (
  <Layout>
    <RowContainer>
       {inbox?.map((msg)=>(
        <Row key={msg._id}  onClick={handleMailClick} className='row'> 
        <Icons>
          <IconButton>
           <Checkbox size='small'/>
          </IconButton>
           {msg.starred?(
           <IconButton>
            <Star
            fontSize="medium"
            style={{ marginRight: 10, color: "#FADA5E" }} />
           </IconButton>
         ) : (
          <IconButton>
            <StarBorder
             fontSize="small"
             style={{  }} />
          </IconButton>
        )}  
          {msg.important?(
        <IconButton >
          <LabelImportantIcon
            style={{  color: "#FADA5E" }} />
        </IconButton>
       ):(
        <IconButton>
          <LabelImportantOutlinedIcon/>
        </IconButton>
      )
    }  
  </Icons>
    <Message onClick={handleMailClick} id={msg._id}>
        <div>{msg.sender_name}</div>
        <div>{msg.subject}</div>
        <div>{msg.date.slice(0,10)}</div>
        <IconButton onClick={handleDelete}>
          <DeleteIcon/>
        </IconButton>
      </Message>
     </Row>
    ))}   
  </RowContainer>
</Layout>
  );
}
export default Inbox

const Row=styled(Box)({
  display:'grid',
  // gridTemplateColumns:'10% 10% auto 5%',
  gridTemplateColumns:'15%  auto',
  width:'100%',
  placeItems:'center',
  fontSizeAdjust:'from-font',
  "&:hover":{
    backgroundColor:'lightyellow'
   }
});

const RowContainer=styled('div')({
  width:"100%",
  marginRight:50
});

const Icons=styled('div')({
  display:'flex',
  alignItems:'center'
});

const Message=styled('div')({
  display:'grid',
  gridTemplateColumns:'10% 30% 10% 5%',
  width:'100%',
  justifyContent:'space-between',
  alignItems:'center'
});