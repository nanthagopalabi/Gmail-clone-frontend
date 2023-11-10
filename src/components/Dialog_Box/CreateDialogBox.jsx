import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MailForm from '../MsgBodyPage/MailForm';
import { Box, NativeSelect } from '@mui/material';
import { useState,useEffect } from 'react';
import { API_URLS } from '../../service/centralUrl';
import useApi from '../../hook/useApi';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    justifyContent:'space-between'
  },
}));
  export default function CustomizedDialogs(props) {
    const [datafromChild,setdatafromChild]=useState({
      to:'',
      subject:'',
      content:'',
      attachment:'',
  });

  const handlex=()=>{
  props.handleClose();
  }  
  const Save=useApi(API_URLS.saveDraftMsg);
  const saveDraft = async(mail)=>{ 
    try {
      const token=localStorage.getItem('token');
      console.log(token, mail)

      const res = await Save.call({...mail},token);
      console.log(res);
       if(res.status){
        console.log(res)
       }
    } catch (error) {
      console.log(error);
   }
  }
  const check=()=>{
    handlex();
    console.log(datafromChild)
    saveDraft(datafromChild);
  }

return (
    <div >
      <BootstrapDialog
        onClose={handlex}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        onClick={(e)=>e.stopPropagation()}>

        <DialogTitle sx={{ m: 0, p: 2,background:'#d4e0f1' }} id="customized-dialog-title">
          New Message
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={check}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }} >  
          <CloseIcon/>
        </IconButton>
          <DialogContent dividers>

            <MailForm handlex={handlex} 
            open={open}
            setdatafromChild={setdatafromChild} 
            value={props.value} 
            setClicked={props.setClicked}/>

          </DialogContent>
          <DialogActions>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

const ButtonWrap=styled(Box)({
  display:'flex',
  alignItems:'center',
 
  "&>Button:first-child":{
    marginLeft:10,
    borderRadius:18
  }
});

const ScheduleButton=styled(NativeSelect)({
  width:'10',
  height:'min-content',
  "& > *":{
    minWidth:10
  }
});
