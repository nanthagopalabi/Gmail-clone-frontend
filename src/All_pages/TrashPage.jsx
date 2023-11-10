import React, { useEffect } from 'react'
import Layout from '../components/MsgBodyPage/Layout';
import { MailContainer,Row,Message,Icons } from './SendPage';
import { Box, Checkbox, IconButton, styled } from '@mui/material';
import useApi from '../hook/useApi';
import { API_URLS } from '../service/centralUrl';
import { useDispatch, useSelector } from 'react-redux';
import { Star, StarBorder } from '@mui/icons-material';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { setTrash, setDelete } from '../components/redux-container/slices/emailSlice';

function Trash() {

  const state=useSelector((state)=>state.email);
  const {trash}=state;
  const token=useSelector((state)=>state.email.user.token);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const getTrashEmail=useApi(API_URLS.getTrashMsg);
  const mailDelete=useApi(API_URLS.deleteMsg);
  const ImportantLabel=useApi(API_URLS.markImportantMsg);
  
  const fetchdata=async()=>{  
    try {
      const res=await getTrashEmail.call({},token);
    if(res.status){
      const data=res.data.message;
    console.log(data);
    dispatch(setTrash(data));
    }      
    } catch (error) {
      console.log(error);
    }  
    }
  
  useEffect(()=>{
  fetchdata();
  },[]);
  
  const handleClick=(event)=>{
  let messageid=event.target.id;
  if(messageid){
     navigate(`/trash/${messageid}`)
  }else{
    messageid=event.target.parentElement.id
   navigate(`/trash/${messageid}`);
  }}

  //function to delete message
  const handleDelete=async(event)=>{
  try {  
  let messageid=event.target.closest('.row').children[1].id;
  const params=messageid;
  console.log(params);
  dispatch(setDelete(messageid));
   const res= await mailDelete.call({},token,params);
   console.log(res);
  if(res.status){
     const update=await getTrashEmail.call({},token);
     if(update.status){
      const data = update.data.message;
          dispatch(setTrash(data));
     }
  }
  } catch (error) { 
    console.log(error);
  }}

  const toggleImportantMail=async(event)=>{
    try {
    const messageid=event.target.closest('.row').children[1].id;
    console.log(messageid);
    const params=messageid  
      console.log(token,"jwt");
      dispatch(setImportanttoggler(params));
      let res=await ImportantLabel.call({},token,params);
      console.log(res);      
    } catch (error) {
     console.log(error);     
    }  
  }

return (
   <Layout >
    <MailContainer>
       {trash?.map((message)=>(
         <Row key={message._id} className='row' onClick={handleClick} > 
         <Icons>
          <IconButton>
         <Checkbox size='small'/>
         </IconButton>
   {message.important?(
    <IconButton onClick={toggleImportantMail}>
    <LabelImportantIcon
    style={{  color: "#FADA5E" }}/>
   </IconButton>
   ):(
    <IconButton onClick={toggleImportantMail}>
    <LabelImportantOutlinedIcon/>
    </IconButton>
   )}
      </Icons>
          <Message  id={message._id}  >
          <div >{message.sender_name||message.receiver_name}</div>
         <div>{message.subject}</div>
         <div>{message.date.slice(0,10)}</div>
         <div >
          <IconButton onClick={handleDelete} className='delete'>
           <DeleteIcon/>
          </IconButton>
         </div>
         </Message>
         </Row>
       ))}
       </MailContainer>
   </Layout>
  )
}
export default Trash