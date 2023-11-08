import React from 'react'
import { useState } from 'react';
// import './App.css'
import Header from '../MainPageHeader';
import Sidebar from '../Drawer/DrawerFeature';
import { Box, List } from '@mui/material';
import styled from '@emotion/styled';
import {Container} from '@mui/material';
import { ListItemButton } from '@mui/material';
import LeftIconBar from '../IconBars/LeftIconBar';
import Inbox from '../Inbox';
import InboxIcon from '@mui/icons-material/Inbox';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MailHeader from './MsgTopHeader';
import RightSideIcon from '../IconBars/RightIconBar';

function Layout({children}) {
  const [openDrawer, setOpenDrawer] = useState(true);
  const toggleDrawer = () => {
  setOpenDrawer((prevState) => !prevState);
   };
  
  return (
    <>
     <LayoutWrapper style={{position:'fixed', width:'100%'}}>
      <Header toggleDrawer={toggleDrawer} />   
      <Main>
      <LeftIconBarWrapper>
        {/* <LeftIconBar/> */}
        <Sidebar openDrawer={openDrawer}/>
      </LeftIconBarWrapper>
      <MainBodyWrapper style={openDrawer?{marginLeft:250,paddingLeft:0}:{width:"100%"}} >
        <EmailTopBar>
         <MailHeader/>
         
         </EmailTopBar>
        <TabBar>
          <TabBarItems>
            <div>
              <div><InboxIcon/></div>Primary
            </div>  
              <div>
                <div><LocalOfferOutlinedIcon/></div>
                  Promotion
                </div>
                  <div>
                   <div><GroupOutlinedIcon/></div>
                      Social</div>
                        <div>
                         <div><InfoOutlinedIcon/></div>
                          Updates</div>
                         </TabBarItems>
                         </TabBar>
                      <MailContainer >
                    {children}
                  </MailContainer>
                </MainBodyWrapper>
            <RigthSideIconBar>
         <RightSideIcon/>
      </RigthSideIconBar>
    </Main>
  </LayoutWrapper>  
</>
  )
}
export default Layout

const LayoutWrapper=styled(Box)({
  display:"grid",
  gridTemplateRows:'auto auto',  
  });
   
  const Main=styled(Box)({
    display:"grid",
    // flexDirection:'row',
    gridTemplateColumns:"0% auto 5%",
    border:'2px solid red',
    height:'100vh',
    // width:'100%',
  });
  const RigthSideIconBar=styled(Box)({
    display:'flex',
    flexDirection:'column',
    height:'100vh',
    backgroundColor:"#f2f5fa"
  });
  const LeftIconBarWrapper=styled(Box)({
    display:'flex',
    flexDirection:'column',
    height:'100vh',
    width:'min-content'
    // background:'yellow'
   });
  const EmailTopBar=styled(Box)({
    display:'flex',
    flexDirection:'row',
    height:'50px',
    //  backgroundColor:'none',
    paddingLeft:10,
    borderRadius:'20px 20px 0 0'
   });
  const TabBar=styled(Box)({
    display:'flex',
    width:'100%',
    height:50,
    // background:'grey'
   });
  const TabBarItems=styled('div')({
    display:'grid',
    gridTemplateColumns:'25% 25% 25% 25%',
    width:'100%',
    justifyContent:'space-between',
    alignItems:'center',  
   
  "& >*":{
    display:'flex',
    padding:" 10px 0 10px 0",
    gap:'10px',
   },
  
   "&>*:hover":{
    backgroundColor:'#f5f5f5',
    borderBottom:'3px solid blue'
   }
 });

  const MailContainer=styled(Box)({
    display: 'flex', 
    flexDirection:'column', 
    background:'#f5f5f5',
    height:'70%',
    borderRadius:'20px',
    borderTopLeftRadius:0,
    borderTopRightRadius:0, 
   });
  const MainBodyWrapper=styled('div')({
    height:'100%',
    display:'flex',
    flexDirection:'column',
    width:'auto',
    flexShrink:1,
   });