import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import useApi from '../hook/useApi';
import { API_URLS } from '../service/centralUrl';
import './AllPages.css';

const defaultTheme = createTheme();

export default function Forget() {

  const [email,setEmail]=useState({email:""});
  const getForget=useApi(API_URLS.forgetPass);
  const handleSubmit = async(event) => {
    event.preventDefault(); 
    try {
      const res=await  getForget.call(email,'')
      event.target.reset();

     } catch (error) {
      console.log(error);
    }
  };

  const handlechange=(e)=>{
    e.preventDefault();
    setEmail({...email,[e.target.name]: e.target.value });
  }
return (
    <ThemeProvider theme={defaultTheme}>
      <Container className="imgRegister">
      <img src='https://img.freepik.com/free-vector/reset-password-concept-illustration_114360-7886.jpg?w=740&t=st=1699686746~exp=1699687346~hmac=942b78b313f9cc790aac1755c788ad1630d52179bb9f9b4b9813479a67880386'/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
             }}>

              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
                  </Avatar>
                   <Typography component="h1" variant="h5">
                       Forget Password
                         </Typography>
                           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="email"
                              label="Email Address"
                              name="email"
                              autoComplete="email"
                              autoFocus
                              onChange={handlechange} />
                
                            <Typography color={'red'}>
                             Enter Registered Email 
                          </Typography>     
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>Send</Button>

                        <Grid container>
                        <Grid item xs>
                       <Link href="/" variant="body2">
                        Go  to Login Page
                      </Link>
                    </Grid>
                    <Grid item>
                   <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </Container>
    </ThemeProvider>
  );
}