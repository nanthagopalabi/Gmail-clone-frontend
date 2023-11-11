import React, { useEffect } from 'react'
import Layout from '../components/MsgBodyPage/Layout';
import { Box, Checkbox, IconButton, styled } from '@mui/material';
import useApi from '../hook/useApi';
import { API_URLS } from '../service/centralUrl';
import { useDispatch, useSelector } from 'react-redux';
import { Star, StarBorder } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import { useNavigate } from 'react-router-dom';
import { setSend,setDelete, setStartoggler, setImportanttoggler } from '../components/redux-container/slices/emailSlice';

function SendPage() {
   
const state=useSelector((state)=>state.email);
const {send}=state;
const token=localStorage.getItem('token');
const dispatch=useDispatch();
const navigate=useNavigate();

const getSendMail=useApi(API_URLS.getOutboxMsg);
const toggler=useApi(API_URLS.markStarredMsg);
const mailDelete=useApi(API_URLS.deleteMsg);
const ImportantLabel=useApi(API_URLS.markImportantMsg);

  const fetchdata=async()=>{  
    try{
    const res=await getSendMail.call({},token);
      if(res.status){
        console.log(res)
      const data=res.data.message;
      dispatch(setSend(data));
     }
   }catch (error){
    console.log(error);
   }
 }
 useEffect(()=>{
  fetchdata();
  },[]);

const handleClick=(event)=>{
let msgId=event.target.id;
    if(msgId){
       navigate(`/outbox/${msgId}`)
    }else{
    msgId=event.target.parentElement.id
    navigate(`/outbox/${msgId}`);
  }
}

const toggleStarredMail=async(e)=>{
  try {
    const msgId=e.target.closest('.row').children[1].id;
    console.log(msgId);
    const params=msgId
    console.log(token,"jwt");
    dispatch(setStartoggler(params));
    console.log(...send);
    let res=await toggler.call({},token,params);
    console.log(res);  
    } catch (error) {
    console.log(error); 
  }
}

const handleDelete=async(event)=>{
  try {
  
    let msgId=event.target.closest('.row').children[1].id;
    const params=msgId;

    dispatch(setDelete(msgId));
    console.log(params)
    const res= await mailDelete.call({},token,params);
    console.log(res);
      if(res.status){
       const update=await getSendMail.call({},token);
      if(update.status){
       const data = update.data.message;
       console.log(data);

        dispatch(setSend(data));
        console.log(data)
       }
     } 
   } catch (error) {
     console.log(error);
    } 
  }

  const toggleImportantMail=async(e)=>{
    try {
      const msgId=e.target.closest('.row').children[1].id;
    console.log(msgId);
    const params=msgId  
      console.log(token,"jwt");
      dispatch(setImportanttoggler(params));
      console.log(...send);
      let res=await ImportantLabel.call({},token,params);
      console.log(res);
      } catch (error) {
        console.log(error);     
    }  
  }
  
return (
  <Layout>
     <MailContainer>
       {send?.map((msg)=>(
        <Row key={msg._id} className='row' onClick={handleClick}>
         <Icons>
         <IconButton>
            <Checkbox size='small'/>
         </IconButton>
          {msg.starred?(
          <IconButton
          onClick={ toggleStarredMail}
          ><Star
          fontSize="small"
          style={{  color: "#FADA5E" }} />

         </IconButton>
         ) : (
        <IconButton  onClick={toggleStarredMail}>
        <StarBorder fontSize="small"/>
        </IconButton>
     )}  
      {msg.important?(
     <IconButton onClick={toggleImportantMail}>
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
      <Message id={msg._id} >
        <div >{msg.sender_name||msg.receiver_name}</div>
        <div>{msg.subject}</div>
        <div>{msg.date.slice(0,10)}</div>
        <div>
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
export default SendPage

export const MailContainer=styled(Box)({
   height:'100%',
   display:'flex',
   flexDirection:'column',
   justifyContent:'flex-start',
 });

export const Row=styled(Box)({
   display:'grid',
   gridTemplateColumns:'15%  auto',
   width:'100%',
   placeItems:'center',
   borderBottom:'1px solid gray',
   fontSizeAdjust:'from-font',  
   "&:hover":{
   backgroundColor:'lightblue'
  } 
});

export const Message=styled('div')({
   display:'grid',
   gridTemplateColumns:'10% 30% 10% 5%',
   width:'100%',
   justifyContent:'space-evenly',
   alignItems:'center',
 });

export const Icons=styled('div')({
   display:'flex',
   flexShrink:'1',
   alignItems:'center'
});