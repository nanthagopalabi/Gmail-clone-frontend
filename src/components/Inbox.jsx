import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Box, IconButton,  } from '@mui/material';
import Checkbox from "@mui/material/Checkbox";
import { Star, StarBorder } from '@mui/icons-material';
import { API_URLS } from '../service/centralUrl';
import { useDispatch, useSelector } from 'react-redux';
import useApi from '../hook/useApi';
import Layout from './MsgBodyPage/Layout';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import { setDelete, setStartoggler,setImportanttoggler,setInbox } from './redux-container/slices/emailSlice.js';

function Inbox() {
const navigate=useNavigate(); 
const dispatch=useDispatch();

const state=useSelector(state=>state.email);
const {inbox}=state;
const token=localStorage.getItem('token');
const mailDelete=useApi(API_URLS.deleteMsg);
const getInbox=useApi(API_URLS.getInboxMsg);
const toggler=useApi(API_URLS.markStarredMsg);
const ImportantLabel=useApi(API_URLS.markImportantMsg);

//function to open single mail
const handleMailClick=(e)=>{
  let msgId=e.target.id;

  if(msgId){
     navigate(`/inbox/${msgId}`)
  }else{
    msgId=e.target.parentElement.id
   navigate(`/inbox/${msgId}`);
  }
}

//function to handle delete
const handleDelete=async(e)=>{
  try {
    let msgId=e.target.closest('.row').children[1].id;
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

  //function star toggling
const toggleStarredMail=async(e)=>{
  
  try {
    const msgId=e.target.closest('.row').children[1].id;
console.log(msgId);
const params=msgId  
  console.log(token,"jwt");
  dispatch(setStartoggler(params));
 
  let res=await toggler.call({},token,params);
  console.log(res);
  } catch (error) {
   console.log(error);     
  }
  }

  //function for important label
  const toggleImportantMail=async(e)=>{
    try {
      const msgId=e.target.closest('.row').children[1].id;
      console.log(msgId);
      const params=msgId  
      dispatch(setImportanttoggler(params));
      let res=await ImportantLabel.call({},token,params);
      console.log(res);
      
    } catch (error) {
     console.log(error);     
    }
  }

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
           <IconButton onClick={toggleStarredMail}>
            <Star
            fontSize="medium"
            style={{ marginRight: 10, color: "#FADA5E" }} />
           </IconButton>
         ) : (
          <IconButton  onClick={toggleStarredMail}>
            <StarBorder
             fontSize="small"
             style={{  }} />
          </IconButton>
        )}  
          {msg.important?(
        <IconButton onClick={toggleImportantMail} >
          <LabelImportantIcon
            style={{  color: "#FADA5E" }} />
        </IconButton>
       ):(
        <IconButton onClick={toggleImportantMail}>
          <LabelImportantOutlinedIcon/>
        </IconButton>
      )
    }  
  </Icons>
    <Message id={msg._id}>
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
  gridTemplateColumns:'15%  85%',
  width:'100%',
  placeItems:'center',

  "&:hover":{
    // backgroundColor:'lightyellow'
   }
});

const RowContainer=styled('div')({
  width:"100%",
  marginRight:50,
  display:'flex',
  flexDirection:'column',
});

const Icons=styled('div')({
  display:'flex',
  alignItems:'center',
  flexWrap:'nowrap',
});

const Message=styled('div')({
  display:'grid',
  gridTemplateColumns:'10% 30% 10% 5%',
  width:'100%',
  justifyContent:'space-between',
  alignItems:'center'
});