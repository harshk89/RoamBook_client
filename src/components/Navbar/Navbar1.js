import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import { AppBar, Box, IconButton, Typography , Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import roambook_logo from "../../images/roambook_logo.png";
import useStyles from "./styles1";

const Navbar1 = () => {

    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate("/auth", {return: true});
        setUser(null);
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
    }, [location]);

    return (
        <AppBar position="sticky" className={classes.appbar} >
            <Container maxWidth="false" className={classes.containerr} sx={{display: "flex"}}>
                <Link to='/'><img src={roambook_logo} alt="roambook" height="60" /></Link>
                {user ? (
                    <Box sx={{ flexGrow: 0, margin: 'auto 0' }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={user?.result?.name} src={user?.result?.imageUrl}>{user?.result?.name.charAt(0)}</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '5px' }}
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
                            <MenuItem component={Link} to='/profile' onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem component={Link} to='/account' onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">Account</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
                            </MenuItem>
                        </Menu>
                    </Box>
                ) : (
                    <Button sx={{ flexGrow: 0, margin: 'auto 0' }} component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Container>
        </AppBar>
    )
}

export default Navbar1;