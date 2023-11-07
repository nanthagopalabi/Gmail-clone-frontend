import React from 'react'
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';
import {Box} from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';

function MailHeader() {
  return (
    <Wrapper>
      <ButtonGroup variant="outlained" >
        <Button >
            <Checkbox/>
        </Button>
         <Button size="large">
           <ArrowDropDownIcon/>
         </Button>
      </ButtonGroup>
        <RefreshIcon/>
        <MoreVertIcon/>
    </Wrapper>
  )
}
export default MailHeader

const Wrapper=styled(Box)({
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:10,
    marginLeft:"1%",

    "& > div":{

        "& > button":{
            width:25,
            paddingRight:0,
            paddingLeft:0
        }
    }
});