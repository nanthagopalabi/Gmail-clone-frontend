import React from 'react'
import Layout from '../components/MsgBodyPage/Layout';
import { Star, StarBorder } from '@mui/icons-material';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import { Checkbox, IconButton } from '@mui/material';
import useApi from '../hook/useApi';
import { API_URLS } from '../service/centralUrl';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setImportant,setDelete,setImportanttoggler,setStartoggler } from '../components/redux-container/slices/emailSlice';
import { useEffect } from 'react';
import { Row,Message,Icons,MailContainer } from './SendPage';

function Important() {
  const state=useSelector((state)=>state.email);
  const {important}=state;
  
  const token=useSelector((state)=>state.email.user.token);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  //calling end point from central url
  const getImportantMail=useApi(API_URLS.getImportantMsg);
  const toggler=useApi(API_URLS.markStarredMsg);
  const mailDelete=useApi(API_URLS.deleteMsg);
  const ImportantLabel=useApi(API_URLS.markImportantMsg);
  
  const fetchdata=async()=>{  
    try {
      const res=await getImportantMail.call({},token);
      if(res.status){
        const data=res.data.filteredImpMsg[0]?.checkMsg
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
     navigate(`/important/${msgId}`)
   }else{
     msgId=event.target.parentElement.id
     navigate(`/important/${msgId}`);
   }
  }
  
  //function for marking as starred 
const toggleStarredMail=async(event)=>{
  try {
    const msgId=event.target.closest('.row').children[1].id;
    const params=msgId  
    dispatch(setStartoggler(params));
    let res=await toggler.call({},token,params);
    fetchdata();  
   
  } catch (error) {
     console.log(error);     
    }
}

//function for delete
const handleDelete=async(event)=>{
  event.stopPropagation();
  try {    
    let msgId=event.target.closest('.row').children[1].id;
    const params=msgId;  
    const res= await mailDelete.call({},token,params);
    dispatch(setDelete(msgId));
    
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

//function for marking as important
const toggleImportantMail=async(event)=>{
    try {
      const msgId=event.target.closest('.row').children[1].id;
      const params=msgId  
      dispatch(setImportanttoggler(params));
      let res=await ImportantLabel.call({},token,params);
      fetchdata();
      console.log(res);
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
                <IconButton onClick={ toggleStarredMail}>
                  <Star className='Star'/>
                    </IconButton>
                      ) : (
                      <IconButton onClick={toggleStarredMail}>
                      <StarBorder
                        fontSize="small"/>
                         </IconButton>
                           )}  
                          {msg.important?(
                          <IconButton onClick={toggleImportantMail}>
                            <LabelImportantIcon className='Star'/>
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
                        <div>{msg.date?.slice(0,10)}</div>
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