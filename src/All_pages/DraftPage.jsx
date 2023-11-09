import React, { useEffect, useState } from 'react'
import Layout from '../components/MsgBodyPage/Layout';
import { Box, Checkbox, IconButton, styled } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useApi from '../hook/useApi';
import { API_URLS } from '../service/centralUrl';
import CustomizedDialogs from '../components/Dialog_Box/CreateDialogBox';
import { setStartoggler,setImportanttoggler,setDraft,setDelete } from '../components/redux-container/slices/emailSlice'; 

function DraftPage() {
    const state=useSelector((state)=>state.email);
    const {draft}=state;
    const token=useSelector((state)=>state.email.user.token);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const getDraftMail=useApi(API_URLS.getDraftMsg);
    const toggler=useApi(API_URLS.markStarredMsg);
    const mailDelete=useApi(API_URLS.deleteMsg);
    const ImportantLable=useApi(API_URLS.markImportantMsg);

    const [open,setOpen]=useState(false);
    const [value,setValue]=useState({
        to:'',
        subject:'',
        content:''
    });
    const [click,setClicked]=useState(false);
    const [msgId,setMsgId]=useState(null);

    const handleClose=()=>{
        setOpen(false);
    }

    const fetchdata=async()=>{  
     try {
        const res=await getDraftMail.call({},token);
      if(res.status){
       console.log(res.data);
       const data=res.data.DraftMsg;
       dispatch(setDraft(data));
      }
     } catch (error) {
       console.log(error);
      }
   } 

  const handleClick=(event)=>{
  let msgId=event.target.id;
    if(msgId){
      setOpen(true);
      setMsgId(msgId);
      const editedmail=draft.find((msg)=>msg._id==msgId);
      setValue({...value,to:editedmail.to,subject:editedmail.subject
        ,content:editedmail.content
    });
    }else{
     msgId=event.target.parentElement.id
     setOpen(true);
     setMsgId(msgId);
    const editedmail=draft.find((msg)=>msg._id==msgId);
    setValue({...value,to:editedmail?.to,subject:editedmail?.subject
          ,content:editedmail?.content});
    }
  }
  const toggleStarredMail=async(e)=>{
    e.stopPropagation()

try {
  const msgId=e.target.closest('.row').children[1].id;
  console.log(msgId);
  const params=msgId  
    dispatch(setStartoggler(params));
    let res=await toggler.call({},token,params);
    console.log(res);
  
} catch (error) {
 console.log(error);     
}
}

//function for important label
const toggleImportantMail=async(event)=>{
  event.stopPropagation();
 
  try {
    const msgId=event.target.closest('.row').children[1].id;
  console.log(msgId);
  const params=msgId  ;
   
    dispatch(setImportanttoggler(params));
    let res=await ImportantLable.call({},token,params);
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
      const update=await getDraftMail.call({},token);
      console.log(update);
      if(update.status){
      const data = update.data.DraftMsg;
      dispatch(setDraft(data));
       }
      }
    } catch (error) {
      console.log(error);
    }
  }
    useEffect(()=>{
      fetchdata();
      if(click){
       const autoDelete=async(id)=>{
       const res=await mailDelete.call({},token,id);
       console.log(res);
       dispatch(setDelete(id));
       }
       autoDelete(msgId);
      }    
    },[click]);

return (
    <Layout>
        <MailContainer>
          {draft?.map((msg)=>(      
         <Row key={msg._id} className='row' onClick={handleClick} > 
         <Icons>
           <IconButton>
            <Checkbox size='small'/>
           </IconButton>
             {msg.starred?(
              <IconButton
                onClick={ toggleStarredMail}><Star
                 fontSize="small"
                 style={{color: "#FADA5E"}}/>
              </IconButton>
                 ) : (
                 <IconButton
                    onClick={toggleStarredMail}>
                    <StarBorder fontSize="small"
                      style={{ }}/>
                 </IconButton>
               )}  
                {msg.important?(
               <IconButton onClick={toggleImportantMail}>
                 <LabelImportantIcon
                 style={{color: "#FADA5E"}}/>
               </IconButton>
                   ):(
                <IconButton onClick={toggleImportantMail}>
                  <LabelImportantOutlinedIcon/>
                  </IconButton>
                )
              }
            </Icons>
        <Message  id={msg._id}  >
          <div >{msg.sender_name||msg.reciver_name}</div>
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
    <CustomizedDialogs open={open} handleClose={handleClose} value={value} setClicked={setClicked}/>
      </MailContainer>
</Layout>
  )
}
export default DraftPage

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
    alignItems:'center' 
   });
  
  const Icons=styled('div')({
    display:'flex',
    alignItems:'center'
  });