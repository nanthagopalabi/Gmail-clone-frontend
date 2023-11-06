import { Box, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import {  useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

function SingleMail() {
    const {messageid,type}=useParams();
    const dispatch=useDispatch();
    const {inbox,draft,send,trash}=useSelector((state)=>state.email);
    // const send=useSelector((state)=>state.email.send);
    // const draft=useSelector((state)=>state.email.draft);
    // const trash=useSelector((state)=>state.email.inbox);
   
    const [message,setMessage]=useState(null);
    
    
useEffect(()=>{
  
  const openMessage=async()=>{
     
    if(type=='inbox'){
       let opened =await inbox.find((element)=>element._id ==messageid)
       setMessage(opened);
  
    }else if(type=='send'){

    }else if(type=='draft'){

    }else if(type=='trash'){

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
      <MailDetail><span>{message?.sender_name?.toString()}</span><span>{message?.from?.toString()}</span>
     <span>{message.date}</span>
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

export default SingleMail


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
})