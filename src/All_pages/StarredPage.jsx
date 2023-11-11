import React, { useEffect } from 'react'
import Layout from '../components/MsgBodyPage/Layout';
import { Star, StarBorder } from '@mui/icons-material';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import { Checkbox, IconButton} from '@mui/material';
import useApi from '../hook/useApi';
import { API_URLS } from '../service/centralUrl';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setStarred,setDelete,setImportanttoggler,setStartoggler} from '../components/redux-container/slices/emailSlice';
import { Row,Message,Icons,MailContainer} from './SendPage';

function StarredPage() {

  const state=useSelector((state)=>state.email);
  const {starred}=state;
  const token=useSelector((state)=>state.email.user.token);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  //calling end point from central url
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
    const res= await mailDelete.call({},token,params);
    dispatch(setDelete(msgId));

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
        dispatch(setStarred(data));
      }
    } catch (error) {
      console.log(error);
     }
    }

  useEffect(()=>{
  fetchdata();
  },[]);

  //function for Marking as important
  const toggleImportantMail=async(e)=>{
  try {
    const msgId=e.target.closest('.row').children[1].id;
    const params=msgId   
    dispatch(setImportanttoggler(params));    
    let res=await ImportantLabel.call({},token,params);
    fetchdata();    

  } catch (error) {
     console.log(error);     
    }
  }

  //function for marking as starred
  const toggleStarredMail=async(e)=>{
    try {
      const msgId=e.target.closest('.row').children[1].id;
      const params=msgId;
      dispatch(setStartoggler(params));
      let res=await toggler.call({},token,params);
      fetchdata();
    
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
                 <IconButton onClick={ toggleStarredMail}>
                   <Star className='Star'/>
                     </IconButton>
                      ) : (
                       <IconButton onClick={toggleStarredMail}>
                        <StarBorder fontSize="small"/>
                         </IconButton>
                          )}  
                           {message.important?(
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
                         <Message  id={message._id}  >
                       <div >{message.sender_name||message.receiver_name}</div>
                      <div>{message.subject}</div>
                    <div>{message.date?.slice(0,10)}</div>
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
export default StarredPage