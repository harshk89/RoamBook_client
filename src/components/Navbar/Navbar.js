import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { AppBar, Toolbar, Typography, Avatar, Button } from '@material-ui/core';
import useStyles from './styles';
import memories from "../../images/memories.png"

// import { GoogleLogin, googleLogout } from '@react-oauth/google';

const Navbar = () => {
    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate("/auth", {return: true});
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        //check if token is expired, validity time = 1 hour
        if(token) {
            let decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime())
                logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">RoamBook</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar