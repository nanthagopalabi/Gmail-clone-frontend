import * as React from 'react';
import '../App.css'
import { AppBar, Toolbar, styled, InputBase, Box, IconButton } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { setToken } from './redux-container/slices/emailSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, Tune, HelpOutlineOutlined,
  SettingsOutlined, AppsOutlined, AccountCircleOutlined,
  } from "@mui/icons-material";


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = ({ toggleDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logout = () => {
    localStorage.removeItem('token');
    dispatch(setToken(''));
    navigate('/');
}
return (
  <StyledAppBar>
    <StyledToolbar>
      <LogoWrapper>
        <MenuIcon color="action" onClick={toggleDrawer} cursor="pointer"/>
          <img
            src='https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png'
            alt="logo"
            style={{ width: "70%", marginLeft:10 }}/>
      </LogoWrapper>
        <SearchRapper>
          <SearchRoundedIcon color="action"/>
          <InputBase placeholder="Search mail" />
          <Tune color="action" />
        </SearchRapper>
        <IconsWrapper>
          <Icon>
            <IconButton>
             <HelpOutlineOutlined/>
            </IconButton>
            <IconButton>
              <SettingsOutlined />
            </IconButton>
            <IconButton>
              <AppsOutlined />
            </IconButton>
            <Box sx={{ flexGrow: 0 }}>
            
              <IconButton onClick={handleOpenUserMenu}>
                <AccountCircleOutlined/>
              </IconButton>
            
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={logout}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          </Icon>
        </IconsWrapper>  
      </StyledToolbar>
    </StyledAppBar>
  );
};
export default Header;

const StyledAppBar = styled(AppBar)({
  background: "#f5f5f5",
  boxShadow: "none",
  height:'64px !important',
});

const StyledToolbar=styled(Toolbar)({
  background: "#f5f5f5",
  display:"grid",
  gridTemplateColumns:"15% auto 20%"
});

const SearchRapper = styled(Box)({
  background: "#EAF1FB",
  marginLeft: 20,
  borderRadius: 8,
  marginRight:8,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 10px",
  "& > div": {
    width: "100%",
    padding: "0 10px",
  },
});

const IconsWrapper = styled(Box)({
  display: "grid",
  width:"70%",
  gridTemplateRows:"repeat(4,30)",
  backgroundColor: "#f5f5f5",
  marginLeft:'20%',
  " & > div":{
  }
});

const LogoWrapper=styled(Box)({
  display:'flex',
  alignItems:'center',
  background: "#f5f5f5",
});

const Icon=styled(Box)({
   display:'flex',
   justifyContent:'space-between'
});