import { Box, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Layout from '../components/MsgBodyPage/Layout';
import {  useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { API_URLS } from '../service/centralUrl';

function IndividualMail() {
    const {msgId,type}=useParams();
    const dispatch=useDispatch();
    const {inbox,draft,send,trash,}=useSelector((state)=>state.email);
 
    const [message,setMessage]=useState(null);
    
useEffect(()=>{
  const openMessage=async()=>{
    let opened;
     
    if(type=='inbox'){
       opened =await inbox.find((element)=>element._id ==msgId)
       setMessage(opened);
  
    }else if(type=='outbox'){
      opened= await send.find((element)=>element._id ==msgId);
      setMessage(opened);
    }else if(type=='draftMsg'){

    }else if(type=='trashMsg'){

    }
  }
  openMessage();
},[message])

return (
  <Layout>
    <MailContainer>
      {message?(
      <div>   
      <Mailheading>{message?.subject?.toString()}</Mailheading>
        <MailDetail><div>{message?.sender_name || message.receiver_name}</div>
          <div>{message?.from?.toString()}</div>
          <div>{message.date}</div>
        </MailDetail>
      <p>{message?.content}</p>
      {message.attachment?<a href={message.attachment} target='_new'>Attachment</a> : "" }
        <div>

        </div>
      </div>  
      ):(<p>no messsage</p>)}
    </MailContainer>
  </Layout>  
  )
}
export default IndividualMail

const MailContainer=styled(Box)({
    width:'100%',
    height:'100%',
    backgroundColor:'',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start'  
  });
const MailWrapper=styled('div')({
  });

const Mailheading=styled('div')({
    fontWeight:400,
    fontSize: '1.375rem',
    WebkitFontSmoothing:'antialiased',
    fontFamily:'"Google Sans",Roboto,RobotoDraft,Helvetica,Arial,sans-serif',
    color:'#1f1f1f',
  });

const MailDetail=styled('div')({
    display:'flex',
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between'
  });