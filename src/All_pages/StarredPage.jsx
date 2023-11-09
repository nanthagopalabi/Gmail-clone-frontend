import React, { useEffect } from 'react'
import Layout from '../components/MsgBodyPage/Layout';
import { Star, StarBorder } from '@mui/icons-material';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import { Box, Checkbox, IconButton, styled } from '@mui/material';
import useApi from '../hook/useApi';
import { API_URLS } from '../service/centralUrl';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setStarred,setDelete,setImportanttoggler,setStartoggler} from '../components/redux-container/slices/emailSlice';

function StarredPage() {

const state=useSelector((state)=>state.email);
const {starred}=state;
const token=useSelector((state)=>state.email.user.token);
const dispatch=useDispatch();
const navigate=useNavigate();

const getStarredMail=useApi(API_URLS.getStarredMsg);
const toggler=useApi(API_URLS.markStarredMsg);
const mailDelete=useApi(API_URLS.deleteMsg);
const ImportantLabel=useApi(API_URLS.markImportantMsg);


const handleClick=(e)=>{
let msgId=e.target.id;

if(msgId){
   navigate(`/starred/${msgId}`)
}else{
    msgId=e.target.parentElement.id
 navigate(`/starred/${msgId}`);
}
}

//functionality for delete
const handleDelete=async(event)=>{
  event.stopPropagation();
try {
  let msgId=event.target.closest('.row').children[1].id;
  const params=msgId;
  console.log(params);

 const res= await mailDelete.call({},token,params);
 dispatch(setDelete(msgId));
 console.log(res);
if(res.status){
   const update=await getStarredMail.call({},token);
   if(update.status){
    const data = update.data.filteredStarredMsg[0]?.checkMsg;
    dispatch(setStarred(data))
   }
}
} catch (error) { 
  console.log(error);
}
}
const fetchdata=async()=>{  
  try {
    const res=await getStarredMail.call({},token);
  if(res.status){
    const data=res.data.filteredStarredMsg[0]?.checkMsg
    console.log(data);
    dispatch(setStarred(data));
  }
  } catch (error) {
    console.log(error);
  }
  }

useEffect(()=>{
fetchdata();
},[]);

//functionality for Mark important
const toggleImportantMail=async(e)=>{
  try {
    const msgId=e.target.closest('.row').children[1].id;
  console.log(msgId);
  const params=msgId  
   
    dispatch(setImportanttoggler(params));
    
    let res=await ImportantLabel.call({},token,params);
    fetchdata();
    console.log(res);
    
  } catch (error) {
   console.log(error);     
  }
}

//functionality for mark starred
const toggleStarredMail=async(e)=>{
  try {
    const msgId=e.target.closest('.row').children[1].id;
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
return (
    <Layout>
      <MailContainer>
        {starred?.map((message)=>(   
         <Row key={message._id} className='row' onClick={handleClick} > 
         <Icons>
          <IconButton>
         <Checkbox size='small'/>
         </IconButton>
          {message.starred?(
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
   {message.important?(
    <IconButton >
    <LabelImportantIcon
    style={{  color: "#FADA5E" }}/>
   </IconButton>
   ):(
    <IconButton onClick={toggleImportantMail}>
    <LabelImportantOutlinedIcon/>
    </IconButton>
   )
   }
      </Icons>
          <Message  id={message._id}  >
          <div >{message.sender_name||message.reciver_name}</div>
         <div>{message.subject}</div>
         <div>{message.date?.slice(0,10)}</div>
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
export default StarredPage

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
  justifyContent:'space-evenly',
  alignItems:'center',
   "& > *":{
   display:'flex', 
   } 
 });

 const Icons=styled('div')({
  display:'flex',
  alignItems:'center'
});