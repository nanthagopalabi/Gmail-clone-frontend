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
      <MainBodyWrapper style={openDrawer?{marginLeft:250,paddingLeft:0}:{width:"100%"}}  >
        <EmailTopBar>
         <MailHeader/>
         
        </EmailTopBar>
        <TabBar>
          <TabBarItems>
          <p>primary</p>
          <p>promotion </p>
          <p>social</p>
          <p>updates</p>
          </TabBarItems>
        </TabBar>
      <MailContainer>
      {/* <Box sx={{display:'flex', width:'98%'}}> */}
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
    background:'grey'
   });
  const TabBarItems=styled('div')({
    display:'flex',
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between'
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