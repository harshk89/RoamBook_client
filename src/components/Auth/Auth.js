import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import { signin, signup } from '../../actions/auth';
import LoadingButton from '@mui/lab/LoadingButton';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isWrongPass, setIsWrongPass] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    setLoading(true);
    if(isSignup) {
        dispatch(signup(formData, setLoading, navigate, setUser));
    } else {
        dispatch(signin(formData, setIsWrongPass, setLoading, navigate, setUser));
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  }
  
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  }

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                        <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />  
                        </>
                        )
                    }
                    {   !isSignup && (
                        <>
                            <Input name="email" label="Email Address" handleChange={handleChange} autoFocus type="email" />
                        </>)
                    }
                    
                    <Input error={isWrongPass} name="password" label="Password" handleChange={handleChange} type={showPassword ? "text": "password"} handleShowPassword={handleShowPassword} />
                    { isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                </Grid>

                <LoadingButton size="large" type="submit" fullWidth loading={loading} variant="contained" style={{marginTop: "15px"}}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </LoadingButton>

                <Button component={Link} to="/posts" variant="outlined" fullWidth color="primary" size="large" style={{marginTop: "15px"}}>Continue without signing in</Button>
                
                {/* <Button type="submit" fullWidth variant='contained' color="primary" className={classes.submit}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button> */}

                <Grid container justifyContent='center'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth;