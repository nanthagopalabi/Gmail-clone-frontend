import React from 'react'
import Stack from "@mui/material/Stack";
import CreateIcon from "@mui/icons-material/Create";
import InboxIcon from "@mui/icons-material/Inbox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SendIcon from "@mui/icons-material/Send";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Button,  styled } from '@mui/material';

function LeftIconBar() {
  return (
    <div>
        <Wrapper>
          <Compose>
            <Box variant='black'>
      <CreateIcon />
      </Box>
      </Compose>
      <Button variant='black'> 
      <InboxIcon />
      </Button>
      <Button variant='black'>
      <StarBorderIcon />
      </Button>
      <Button variant='black'>
      <SendIcon />
      </Button>
      <Button variant='black'>
      <InsertDriveFileIcon />
      </Button>
      <Button variant='black'>
      <LabelImportantIcon />
      </Button>
      <Button variant='black'>
      <DeleteOutlineIcon />
      </Button>
      <Button variant='black'>
      <AccessTimeIcon />
      </Button>
      <Button variant='black'>
      <ChatBubbleOutlineIcon />
      </Button>
      <Button variant='black'>
      <ScheduleSendIcon />
      </Button>
      <Button variant='black'>
      <MailOutlineIcon />
      </Button>
      <Button variant='black'>
      <ReportGmailerrorredIcon />
      </Button>
      <Button variant='black'>
      <SettingsIcon />
      </Button>
      </Wrapper>
        
    </div>
  )
}

export default LeftIconBar

const Wrapper=styled(Box)({
     display:'flex',
     flexDirection:'column',
     padding:"0px",
     paddingTop:"5px",
     marginLeft:'2px',
     alignItems:'flex-start',
     rowGap:5,
      
    //  "& > *":{
    //   border: 'none',
    //   outline: 'none',
      
    //  },
     "& > *:focus":{
      border: 'none',
      outline: 'none',
      background:'#c2e7ff',
     },
     "& > *:hover":{
      border: 'none',
      outline: 'none',
      background:'#c2e7ff',
      borderRadius:40
     }   
});

const Compose=styled(Box)({
  display:'flex',
  justifyContent:'center',
  width:56,
  height:56,
  borderRadius:15,
  background:'#c2e7ff',
  border:'none',

  "& >button:focus":{
    border: 'none',
         outline: 'none'
  }
})