import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Button, Paper } from '@mui/material';
import { Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from "./styles";

const LandingPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const classes = useStyles();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate("/auth", {return: true});
    };

  return (
    <Container maxWidth="xs">
    <Paper elevation={3} className={classes.paper} >
        <Typography variant='h5' gutterBottom><strong>Welcome to RoamBook</strong></Typography>
        
        {user ? 
            (<><Typography variant='body1' gutterBottom>{`You are logged in as ${user?.result?.name}`}</Typography>
            <Button component={Link} to="/posts" variant="contained" color="primary" size="large" sx={{marginTop: "15px"}}>Continue</Button>
            <Button onClick={logout} variant="contained" color="primary" size="large" sx={{marginTop: "15px"}} >{`Not ${user?.result?.name}? Sign in with different Id`}</Button>
            </>) : 
            (<>
            <Button component={Link} to="/auth" variant="contained" color="primary" size="large" sx={{marginTop: "15px"}}>Sign In</Button>
            <Button component={Link} to="/posts" variant="contained" color="primary" size="large" sx={{marginTop: "15px"}}>Continue without signing in</Button>
            </>)
        }
        

    </Paper>
    </Container>
  )
}

export default LandingPage