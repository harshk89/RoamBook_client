import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import { signin, signup } from '../../actions/auth';
import LoadingButton from '@mui/lab/LoadingButton';
import useStyles from './styles';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [wrongPassErr, setWrongPassErr] = useState('none');
  const [wrongConfirmPassErr, setWrongConfirmPassErr] = useState('none');

  const [loading, setLoading] = useState(false);

  const { theme, isLoading } = useSelector((state) => state.posts);
  
  useEffect(() => {
    dispatch({ type: "END_LOADING" })
    return () => {
    }
  }, [])
  

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    
    if(isSignup) {
        if(formData.password===formData.confirmPassword) {
            setLoading(true);
            dispatch(signup(formData, setLoading, navigate, setUser));
        }
        else {
            setWrongConfirmPassErr('Confirm pass does not match!');
        }
    } else {
        setLoading(true);
        dispatch(signin(formData, setWrongPassErr, setLoading, navigate, setUser));
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  }
  
  const switchMode = () => {
    setWrongConfirmPassErr('none');
    setWrongPassErr('none');
    setShowPassword(false);
    setIsSignup((prevIsSignup) => !prevIsSignup);
  }

  const containerStyles = {
    minHeight: '80vh',
    marginBottom: '30px'
  }
  const paperStyles = {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#f9f9f9'
  }

  return (
    <Container component="main" maxWidth="xs" style={containerStyles}>
        <Paper className={classes.paper} style={paperStyles} elevation={3}>
            <Avatar style={{ backgroundColor: '#f40157', margin: '8px' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} style={{width: '100%', marginTop: '24px'}} onSubmit={handleSubmit}>
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
                    
                    <Input error={wrongPassErr} name="password" label="Password" handleChange={handleChange} type={showPassword ? "text": "password"} handleShowPassword={handleShowPassword} />
                    { isSignup && <Input error={wrongConfirmPassErr} name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                </Grid>

                <LoadingButton size="large" type="submit" fullWidth loading={loading} variant="contained" style={{marginTop: "15px"}}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </LoadingButton>

                <Button onClick={switchMode} variant="outlined" fullWidth color="primary" size='large' style={{marginTop: "15px"}}>
                    {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </Button>

                <Button component={Link} to="/posts" variant="outlined" fullWidth color="primary" size="large" style={{marginTop: "15px"}}>Continue without signing in</Button>

                {/* <Grid container justifyContent='center'>
                    <Grid item>
                        <Button onClick={switchMode} variant="outlined" fullWidth color="primary" size='large' style={{marginTop: "15px"}}>
                            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid> */}
            </form>
        </Paper>
    </Container>
  )
}

export default Auth;