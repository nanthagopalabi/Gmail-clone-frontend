import axios from 'axios'
import React, { useEffect, useState } from 'react'
import StarBorderIcon from "@mui/icons-material/StarBorder";
import styled from 'styled-components';
import { Box,  } from '@mui/material';
import Checkbox from "@mui/material/Checkbox";
import { Star, StarBorder } from '@mui/icons-material';
import { API_URLS } from '../service/centralUrl';
import { useDispatch, useSelector } from 'react-redux';
import {setInbox} from './redux-container/slices/emailSlice.js'
import useApi from '../hook/useApi';
import Layout from './MsgBodyPage/Layout';
import { useNavigate } from 'react-router-dom';

function Inbox() {
const navigate=useNavigate(); 
const dispatch=useDispatch();

const state=useSelector(state=>state.email);
const {inbox}=state;
const token=localStorage.getItem('token');

const getInbox=useApi(API_URLS.getInboxMsg);
console.log(getInbox,"loop")
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
const handleMailClick=(e)=>{
  console.log(e.target.id);
     const res=inbox.find(message=>message._id==e.target.id);
     console.log(res);
    //  navigate(`/inbox/${msgId}`);
  }

  return (
    <Layout>
    <RowContainer>
       {inbox?.map((message)=>(
         <Row key={message._id}> 
         <Icons>
         <Checkbox />
          {message.starred?(<Star
          fontSize="medium"
          style={{ marginRight: 10, color: "#FADA5E" }}
          // onClick={() => toggleStarredMail()}
        />
      ) : (
        <StarBorder
          fontSize="medium"
          style={{ marginRight: 10 }}
          // onClick={() => toggleStarredMail()}
        />
   )}  
        
         </Icons>
          <Message onClick={handleMailClick} id={message._id}>
          <div>{message.sender_name}</div>
         <div>{message.subject}</div>
         <div>{message.date}</div>
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
  gridTemplateColumns:'10%  90%',
  width:'100%',
  placeItems:'center',
  fontSizeAdjust:'from-font'
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
  display:'flex',
  flexDirection:'row',
  width:'100%',
  justifyContent:'space-between'
});