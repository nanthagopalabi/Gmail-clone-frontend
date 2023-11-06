import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import MailForm from '../MsgBodyPage/MailForm';
import { Box, ButtonGroup, NativeSelect, Select } from '@mui/material';

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

const handlex=()=>{
props.handleClose();
}  
  return (
    <div >
      <BootstrapDialog
        onClose={handlex}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        onClick={(e)=>e.stopPropagation()}
      >
        <DialogTitle sx={{ m: 0, p: 2,background:'#d4e0f1' }} id="customized-dialog-title">
          New Message
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handlex}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <MailForm handlex={handlex} /> 
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
