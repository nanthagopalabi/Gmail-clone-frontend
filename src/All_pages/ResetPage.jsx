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
import { useNavigate, useParams } from 'react-router-dom';


const defaultTheme = createTheme();

export function Reset() {
const naviagte=useNavigate();
const [reset,setReset]=useState({password:''});
const {resetToken}=useParams(); 

const getReset = useApi(API_URLS.resetPass);

  console.log(resetToken);
  const handleSubmit = async(event) => {
    event.preventDefault();
    event.target.reset();
    try {
     const res= await getReset.call(reset,'',resetToken);

     if(res.status){
     naviagte('/');
     }
    } catch (error) {
        console.log(error);
    }
  };

  const handlechange=(e)=>{
    e.preventDefault();
    setReset({...reset,[e.target.name]: e.target.value });
  console.log(reset);
 }

return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Enter new Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlechange} />
                       
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >Save new Password
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  Login
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
    </ThemeProvider>
  );
}