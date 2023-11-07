import React, { useEffect } from 'react'
import Layout from '../components/MsgBodyPage/Layout';
import { Box, Checkbox, IconButton, styled } from '@mui/material';
import useApi from '../hook/useApi';
import { API_URLS } from '../service/centralUrl';
import { setSend } from '../components/redux-container/slices/emailSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Star, StarBorder } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import { useNavigate } from 'react-router-dom';
import { setDelete } from '../components/redux-container/slices/emailSlice';

function SendPage() {
   
const state=useSelector((state)=>state.email);
const {send}=state;
const token=useSelector((state)=>state.email.user.token);
const dispatch=useDispatch();
const navigate=useNavigate();

const getSendMail=useApi(API_URLS.getOutboxMsg);
const toggler=useApi(API_URLS.toggleStarredEmail);
const mailDelete=useApi(API_URLS.deleteMsg);

  const fetchdata=async()=>{  
    try{
    const res=await getSendMail.call({},token);
      if(res.status){
      const data=res.data.SendEmail;
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
       navigate(`/send/${msgId}`)
    }else{
    msgId=event.target.parentElement.id
    navigate(`/send/${msgId}`);
  }
}

const toggleStarredMail=async()=>{
  try {
    const params='653e82ba81a6bb3977f4a943'
    console.log(token,"jwt");
    let res=await toggler.call({},token,params);
    console.log(res);  
  } catch (error) {
    console.log(error); 
  }
}

const handleDelete=async(event)=>{
  try {
    let msgId=event.target.closest('.row').children[1].id;
    const params=messageid;
    dispatch(setDelete(msgId));
    const res= await mailDelete.call({},token,params);
      if(res.status){
       const update=await getSendMail.call({},token);
      if(update.status){
       const data = update.data.SendEmail;
        dispatch(setSend(data));
       }
     } 
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
        <IconButton>
        <StarBorder
          fontSize="small"
          style={{ }}
          onClick={toggleStarredMail} />
        </IconButton>
     )}  
      {msg.important?(
    <IconButton >
     <LabelImportantIcon
     style={{  color: "#FADA5E" }} />
   </IconButton>   
    ):(
   <IconButton>
    <LabelImportantOutlinedIcon
    style={{}}/>
   </IconButton>
   )
   }
     </Icons>
      <Message  id={msg._id}  >
        <div >{msg.sender_name||msg.reciver_name}</div>
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
export default SendPage

const MailContainer=styled(Box)({
   // width:'100%',
   height:'100%',
   display:'flex',
   flexDirection:'column',
   justifyContent:'flex-start',
 });

const Row=styled(Box)({
   display:'grid',
   // gridTemplateColumns:'10% 10% auto 5%',
   gridTemplateColumns:'15%  auto',
   width:'100%',
   placeItems:'center',
   border:'1px solid blue',
   fontSizeAdjust:'from-font',  
   "&:hover":{
   backgroundColor:'lightyellow'
  } 
});

const Message=styled('div')({
   display:'flex',
   flexDirection:'row',
   width:'100%',
   justifyContent:'space-between',
 });

const Icons=styled('div')({
   display:'flex',
   alignItems:'center'
});