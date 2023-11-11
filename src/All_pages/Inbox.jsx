import React, { useEffect} from 'react'
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import Checkbox from "@mui/material/Checkbox";
import { Star, StarBorder } from '@mui/icons-material';
import { API_URLS } from '../service/centralUrl.js';
import { useDispatch, useSelector } from 'react-redux';
import useApi from '../hook/useApi.jsx';
import Layout from '../components/MsgBodyPage/Layout.jsx';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import { setDelete, setStartoggler,setImportanttoggler,setInbox } from '../components/redux-container/slices/emailSlice.js';
import { Row,Message,Icons } from './SendPage.jsx';

function Inbox() {
const navigate=useNavigate(); 
const dispatch=useDispatch();

const state=useSelector(state=>state.email);
const {inbox}=state;
const token=localStorage.getItem('token');

//calling end point from central url
const mailDelete=useApi(API_URLS.deleteMsg);
const getInbox=useApi(API_URLS.getInboxMsg);
const toggler=useApi(API_URLS.markStarredMsg);
const ImportantLabel=useApi(API_URLS.markImportantMsg);

//function to open single mail
const handleMailClick=(e)=>{
  let msgId=e.target.id;

  if(msgId){
     navigate(`/inbox/${msgId}`)
  }else{
    msgId=e.target.parentElement.id
   navigate(`/inbox/${msgId}`);
  }
}

//function to handle delete
const handleDelete=async(e)=>{
  try {
    let msgId=e.target.closest('.row').children[1].id;
    const params=msgId;
    dispatch(setDelete(msgId));
    const res= await mailDelete.call({},token,params);

    if(res.status){
     const update=await getInbox.call({},token);
      if(update.status){
        const data = update.data.message;
        dispatch(setInbox(data));
     }
    }
  } catch (error) {
   console.log(error);
  }
}

  //function for marking star
const toggleStarredMail=async(e)=>{  
  try {
    const msgId=e.target.closest('.row').children[1].id;
    const params=msgId;
    dispatch(setStartoggler(params));
    let res=await toggler.call({},token,params);
 
  } catch (error) {
     console.log(error);     
  }
}

  //function for marking as important
  const toggleImportantMail=async(e)=>{
    try {
      const msgId=e.target.closest('.row').children[1].id;
      const params=msgId  
      dispatch(setImportanttoggler(params));
      let res=await ImportantLabel.call({},token,params);
      
    } catch (error) {
       console.log(error);     
    }
  }

useEffect(()=>{
  const fetchdata=async()=>{
  const res=await getInbox.call({},token);
  if(res.status){
    const data=res.data.message;
     dispatch(setInbox(data));
  }
}
 fetchdata();
},[]);

return (
  <Layout>
    <RowContainer className='RowContainer'>
       {inbox?.map((msg)=>(
        <Row key={msg._id}  onClick={handleMailClick} className='row'> 
          <Icons>
            <IconButton>
             <Checkbox size='small'/>
              </IconButton>
                {msg.starred?(
                 <IconButton onClick={toggleStarredMail}>
                   <Star className='Star'/>
                    </IconButton>
                      ) : (
                     <IconButton  onClick={toggleStarredMail}>
                       <StarBorder fontSize="small"/>
                     </IconButton>
                        )}  
                        {msg.important?(
                          <IconButton onClick={toggleImportantMail} >
                           <LabelImportantIcon className='Star'/>
                           </IconButton>
                           ):(
                          <IconButton onClick={toggleImportantMail}>
                       <LabelImportantOutlinedIcon/>
                     </IconButton>
                     )
                    }  
                   </Icons>
                 <Message id={msg._id}>
                <div>{msg.sender_name}</div>
              <div>{msg.subject}</div>
            <div>{msg.date.slice(0,10)}</div>
           <IconButton onClick={handleDelete}>
          <DeleteIcon/>
        </IconButton>
      </Message>
     </Row>
    ))}   
  </RowContainer>
</Layout>
  );
}
export default Inbox

const RowContainer=styled('div')({
  width:"100%",
  marginRight:50,
  display:'flex',
  flexDirection:'column',
});