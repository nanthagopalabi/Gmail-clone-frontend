import React, { useEffect } from 'react'
import Layout from '../components/MsgBodyPage/Layout';
import { Box, Checkbox, IconButton, styled } from '@mui/material';
import useApi from '../hook/useApi';
import { API_URLS } from '../service/centralUrl';
import { setSend } from '../components/redux-container/slices/emailSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Star, StarBorder } from '@mui/icons-material';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import { useNavigate } from 'react-router-dom';

function SendPage() {
   
const state=useSelector((state)=>state.email);
const {send}=state;
const token=useSelector((state)=>state.email.user.token);
const dispatch=useDispatch();
const navigate=useNavigate();

const getSendMail=useApi(API_URLS.getOutboxMsg);
const toggler=useApi(API_URLS.toggleStarredEmail);

useEffect(()=>{
  const fetchdata=async()=>{  
    const res=await getSendMail.call({},token);
      if(res.status){
      const data=res.data.SendEmail;
      console.log(data)
      dispatch(setSend(data));
     }
  }
  
fetchdata();
},[send]);

const handleClick=(event)=>{
let messageid=event.target.id;

    if(messageid){
       navigate(`/send/${messageid}`)
    }else{
    messageid=event.target.parentElement.id
    navigate(`/send/${messageid}`);
    }
}

const toggleStarredMail=async()=>{
try {
  const params='653e82ba81a6bb3977f4a943'
  console.log(token,"jwt");
  let res=await toggler.call({},token,params);
  console.log(res);  
} catch (error) {
}
}
return (
    <Layout>
       <MailContainer>
       {send?.map((message)=>(
       
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

   {message.important?(
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
      <Message  id={message._id}  >
        <div >{message.sender_name||message.reciver_name}</div>
        <div>{message.subject}</div>
        <div>{message.date}</div>
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