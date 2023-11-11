import React, { useEffect, useState } from 'react'
import Layout from '../components/MsgBodyPage/Layout';
import { Checkbox, IconButton } from '@mui/material';
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
import { MailContainer,Row,Message,Icons } from './SendPage';

function DraftPage() {
    const state=useSelector((state)=>state.email);
    const {draft}=state;
    const token=useSelector((state)=>state.email.user.token);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    //calling end point from central url
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
          const data=res.data.message;
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
      setValue({...value,to:editedmail?.to,subject:editedmail?.subject
        ,content:editedmail?.content
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
    e.stopPropagation();

  try {
    const msgId=e.target.closest('.row').children[1].id;
    const params=msgId  
    dispatch(setStartoggler(params));
    let res=await toggler.call({},token,params);
  
    } catch (error) {
    console.log(error);     
   }
  }

//function for important label
const toggleImportantMail=async(event)=>{
  event.stopPropagation();
 
  try {
    const msgId=event.target.closest('.row').children[1].id;
    const params=msgId  ;
  
    dispatch(setImportanttoggler(params));
    let res=await ImportantLable.call({},token,params);
    
    } catch (error) {
      console.log(error);     
   }
  }

// function for delete
  const handleDelete=async(event)=>{
    event.stopPropagation();
    try {
      let msgId=event.target.closest('.row').children[1].id;
      const params=msgId;

      dispatch(setDelete(msgId));
      const res= await mailDelete.call({},token,params);
      if(res.status){
        const update=await getDraftMail.call({},token);
  
        if(update.status){
          const data = update.data.message;
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
                <IconButton onClick={ toggleStarredMail}>
                  <Star className='Star'/>
                   </IconButton>
                     ) : (
                    <IconButton onClick={toggleStarredMail}>
                     <StarBorder fontSize="small"/>
                      </IconButton>
                        )}  
                        {msg.important?(
                         <IconButton onClick={toggleImportantMail}>
                          <LabelImportantIcon className='Star'/>
                          </IconButton>
                            ):(
                          <IconButton onClick={toggleImportantMail}>
                         <LabelImportantOutlinedIcon/>
                        </IconButton>
                         )
                        }
                      </Icons>
                     <Message  id={msg._id}  >
                    <div>{msg.sender_name||msg.receiver_name}</div>
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