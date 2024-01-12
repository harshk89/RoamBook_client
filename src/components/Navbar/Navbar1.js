import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import { AppBar, Box, IconButton, Typography , Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import roambook_logo from "../../images/roambook_logo.png";
// import useStyles from "./styles1";

const Navbar1 = ({user, setUser}) => {
   
    // const classes = useStyles();
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const { theme } = useSelector((state) => state.posts);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        setUser(null);
        navigate("/auth", {return: true});
    };

    useEffect(() => {
        const token = user?.token;

        //check if token is expired, validity time = 10 hour
        if(token) {
            let decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime())
                logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));

        //setting theme stored in localStorage
        // if(theme!==localStorage.getItem('theme')) {
        //     dispatch({ type: "CHANGE_THEME" });
        // }

    }, [location]);

    const appBarStyles = () => {
        return(
        theme==="light"?{
            // marginBottom: "25px",
            background: "linear-gradient(90deg, rgba(0,153,193,1) 46%, rgba(4,174,178,1) 100%)",
        }:{
            // marginBottom: "25px",
            background: "black",
        })
    }

    const handleThemeChange = () => {
        dispatch({ type: "CHANGE_THEME" });
        // console.log(theme);
    }

    return (
        <AppBar position="sticky" style={appBarStyles()} >
            <div style={{display: "flex", justifyContent: "space-between", margin: "auto 10px"}} >
                <Link to='/posts'><img src={roambook_logo} alt="roambook" height="60px" /></Link>
                <div style={{display: "flex"}}>
                    {user ? (
                        <Box sx={{ flexGrow: 0, margin: 'auto 0' }}>
                            <Tooltip title="Options">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={user?.result?.name} src={user?.result?.imageUrl}>{user?.result?.name.charAt(0)}</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                            sx={{ mt: '5px', maxWidth: "300px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'bottom',
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
                                <MenuItem sx={{width: "100%" }} component={Link} to='/posts' onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Home</Typography>
                                </MenuItem>
                                <MenuItem sx={{width: "100%" }} component={Link} to='/profile' onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem>
                                <MenuItem sx={{width: "100%" }} component={Link} to='/account' onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Account</Typography>
                                </MenuItem>
                                <MenuItem sx={{width: "100%" }} onClick={handleCloseUserMenu}>
                                    <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <Button style={{ margin: "10px 0px", width: '75px', padding: '0px', borderRadius: '5px' }} component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )}
                    <IconButton aria-label="delete" onClick={handleThemeChange} style={{width: '50px'}}>
                        <Brightness4Icon sx={{color: '#e5e5e5'}} />
                    </IconButton>
                </div>
            </div>
        </AppBar>
    )
}

export default Navbar1;