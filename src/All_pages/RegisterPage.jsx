import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { API_URLS } from '../service/centralUrl';
import useApi from '../hook/useApi';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href='https://www.linkedin.com/in/nantha-gopal-94026b9b/'>
        Nanthagopal
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

//valiadation schema
const validationSchema = yup.object({
    name: yup
      .string('Enter your name')
      // .name('Enter a valid name')
      .required('Name is required'),
      email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),

    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

export default function SignUp() {
const navigate = useNavigate();

//calling end point from central url
const createRegister=useApi(API_URLS.createUser);
const handleSubmit = async() => {   
   try {
    const res = await createRegister.call(formik.values,'');
    if(res.status){
      navigate('/');
      return 
    }
   } catch (error) {
    console.log(error);
  }
};

const formik = useFormik({
  initialValues: {
    name: '',
    email:'',
    password: '',
  },
  validationSchema: validationSchema,
  onSubmit: (values) => {
     handleSubmit();
     formik.resetForm();
  },
});

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container className='imgRegister'>
       <img src='https://img.freepik.com/free-vector/forms-concept-illustration_114360-8290.jpg?w=740&t=st=1699683644~exp=1699684244~hmac=ba62be3722cf2402d2ab40eb1369ce5e3bc01002e850d7f6e69c3f1a09e85c22'/>
        <Container component="main"maxWidth="xs">
         <CssBaseline />
          <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
           }}>
            <img className='imgGoogle'src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'/>
             <Typography component="h1" variant="h6">
               Create a Google Account
              </Typography>
              <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} >
                    <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="First Name"
                  autoFocus
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                 error={formik.touched.name && Boolean(formik.errors.name)}
                 helperText={formik.touched.name && formik.errors.name}/>
                  </Grid>
                    <Grid item xs={12}>
                      <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}/>
                      </Grid>
                           <Grid item xs={12}>
                             <TextField
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              autoComplete="new-password"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={formik.touched.password && Boolean(formik.errors.password)}
                              helperText={formik.touched.password && formik.errors.password}/>
                             </Grid>
                            <Grid item xs={12}>
                           <FormControlLabel
                           control={<Checkbox value="allowExtraEmails" color="primary" />}
                          label="I Accepts terms and conditions."/>
                          </Grid>
                         </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                       sx={{ mt: 3, mb: 2 }}>Sign Up </Button>
                     <Grid container justifyContent="flex-end">
                    <Grid item>
                  <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        </Container>
      </Container>
    </ThemeProvider>
  );
}