import React from 'react'
import Stack from "@mui/material/Stack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Person2Icon from "@mui/icons-material/Person2";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { yellow } from '@mui/material/colors';
import { Box, IconButton, styled } from '@mui/material';

function RightSideIcon() {
  return (
    <>
    <RightSideContainer>
        <RightSideIcons>
   <CalenderIcon>
    <img src='https://www.gstatic.com/companion/icon_assets/calendar_2020q4_2x.png'/>
   </CalenderIcon>
<KeepIcon>
 <img src='https://www.gstatic.com/companion/icon_assets/keep_2020q4v3_2x.png'/>
 </KeepIcon>
 <TaskIcon>
<CheckCircleOutlineIcon color="primary" />
</TaskIcon>
<UserIcon>
<Person2Icon color="primary" />
</UserIcon>
<IconButton>
<AddIcon />
</IconButton>
</RightSideIcons>

   
    
</RightSideContainer>
    </>
  )
}

export default RightSideIcon


const RightSideContainer=styled(Box)({
   display:'flex',
   flexDirection:'column',
   alignItems:'center',
   justifyContent:'center',
   

});

const RightSideIcons=styled(Box)({
    marginBottom:50,  
   marginTop:20,
   display:'flex',
   flexDirection:'column',
   rowGap:'30px',
   justifyContent:'center',
   
   
    "& > *:hover":{
       border:"none",
    backgroundColor:"rgba(0, 0, 0, 0.14)"
       
       
    }
})

const KeepIcon=styled(IconButton)({
    width:40,
    height:40,
   
    "& > img":{
        width:24,
        height:24,
        objectFit:"contain",
        
    }

});

const CalenderIcon=styled(IconButton)({
  width:40,
  heigth:40,

  "& > img":{
     width:24,
     height:24,
     objectFit:'contain'

  }  
});

const TaskIcon=styled(IconButton)({
    width:40,
    heigth:40,    
});

const UserIcon=styled(IconButton)({
    width:40,
    heigth:40, 
})