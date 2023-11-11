import { Box, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Layout from '../components/MsgBodyPage/Layout';
import {  useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

function IndividualMail() {
    const {msgId,type}=useParams();
    const {inbox,send,trash,starred,important}=useSelector((state)=>state.email);
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
    }else if(type=='starred'){
      opened= await starred.find((element)=>element._id ==msgId);
      setMessage(opened);
    }else if(type=='important'){
      opened= await important.find((element)=>element._id ==msgId);
      setMessage(opened);
    }else if(type=='trash'){
      opened= await trash.find((element)=>element._id ==msgId);
      setMessage(opened);
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
        <MailDetail><h4>{message?.sender_name || message.receiver_name}</h4>
          <h5>{message?.from?.toString()}</h5>
          <p>{message.date}</p>
        </MailDetail>
      <p>{message?.content}</p>
      {message.attachments?<a href={message.attachments} target='_new'>Attachment</a> : "" }
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