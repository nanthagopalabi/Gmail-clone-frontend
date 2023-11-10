import React from 'react'
import Layout from '../components/MsgBodyPage/Layout';
import { Star, StarBorder } from '@mui/icons-material';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import { Box, Checkbox, IconButton, styled } from '@mui/material';
import useApi from '../hook/useApi';
import { API_URLS } from '../service/centralUrl';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setImportant,setDelete,setImportanttoggler,setStartoggler } from '../components/redux-container/slices/emailSlice';
import { useEffect } from 'react';

function Important() {
  const state=useSelector((state)=>state.email);
  const {important}=state;
  
  const token=useSelector((state)=>state.email.user.token);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const getImportantMail=useApi(API_URLS.getImportantMsg);
  const toggler=useApi(API_URLS.markStarredMsg);
  const mailDelete=useApi(API_URLS.deleteMsg);
  const ImportantLabel=useApi(API_URLS.markImportantMsg);
  
  const fetchdata=async()=>{  
    try {
      const res=await getImportantMail.call({},token);
    if(res.status){
        console.log(res);
      const data=res.data.filteredImpMsg[0]?.checkMsg
      console.log(data);
        dispatch(setImportant(data));
     } 
    } catch (error) {
      console.log(error);
     }
  }
  
  useEffect(()=>{
      fetchdata();
  },[]);
  
  const handleClick=(event)=>{
  let msgId=event.target.id;
  
  if(msgId){
     navigate(`/imp/${msgId}`)
  }else{
    msgId=event.target.parentElement.id
   navigate(`/imp/${msgId}`);
  }
  }
  
const toggleStarredMail=async(event)=>{
  try {
    const msgId=event.target.closest('.row').children[1].id;
    console.log(msgId);
    const params=msgId  
    console.log(token,"jwt");
    dispatch(setStartoggler(params));
    let res=await toggler.call({},token,params);
    fetchdata();
    console.log(res);  
    } catch (error) {
     console.log(error);     
    }
}

const handleDelete=async(event)=>{
  try {    
    let msgId=event.target.closest('.row').children[1].id;
    const params=msgId;
    console.log(params);
    dispatch(setDelete(msgId));
    const res= await mailDelete.call({},token,params);
    console.log(res);
    if(res.status){
     const update=await getImportantMail.call({},token);
     if(update.status){
      const data = update.data.filteredImpMsg[0]?.checkMsg
      dispatch(setImportant(data));
     }
  }
  } catch (error) { 
    console.log(error);
  }    
}

const toggleImportantMail=async(event)=>{
    try {
      const msgId=event.target.closest('.row').children[1].id;
      console.log(msgId);
      const params=msgId  
      dispatch(setImportanttoggler(params));
      let res=await ImportantLabel.call({},token,params);
      console.log(res); 
      fetchdata();
      } catch (error) {
      console.log(error);     
    }
}
return (
  <Layout>
      <MailContainer>
       {important?.map((msg)=>(
         <Row key={msg._id} className='row' onClick={handleClick} > 
         <Icons>
          <IconButton>
         <Checkbox size='small'/>
         </IconButton>
          {msg.starred?(
          <IconButton
          onClick={ toggleStarredMail}
          ><Star
          fontSize="small"
          style={{  color: "#FADA5E" }}/>
         </IconButton>
      ) : (
        <IconButton
        onClick={toggleStarredMail}>
        <StarBorder
          fontSize="small"/>
        </IconButton>
   )}  
   {msg.important?(
    <IconButton onClick={toggleImportantMail}>
    <LabelImportantIcon
    style={{  color: "#FADA5E" }}/>
   </IconButton>
   ):(
    <IconButton onClick={toggleImportantMail}>
    <LabelImportantOutlinedIcon />
    </IconButton>
   )
   }
    </Icons>
          <Message  id={msg._id}  >
          <div >{msg.sender_name||msg.receiver_name}</div>
          <div>{msg.subject}</div>
          <div>{msg.date}</div>
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
export default Important

const MailContainer=styled(Box)({
  height:'100%',
  display:'flex',
  flexDirection:'column',
  justifyContent:'flex-start',
  

});

const Row=styled(Box)({
   display:'grid',
   gridTemplateColumns:'15%  auto',
   width:'100%',
   placeItems:'center',
   borderBottom:'1px solid gray',
   fontSizeAdjust:'from-font',  
   "&:hover":{
    backgroundColor:'lightyellow'
   }
});

const Message=styled('div')({
  display:'grid',
  gridTemplateColumns:'10% 30%  10% 5%',
  width:'100%',
  justifyContent:'space-between',
  alignItems:'center',
  "& > *":{
    display:'flex',
  }
 });

 const Icons=styled('div')({
  display:'flex',
  alignItems:'center'
});