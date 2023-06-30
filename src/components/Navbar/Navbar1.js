import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import roambook_logo from "../../images/roambook_logo.png";

import useStyles from './styles';

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

        //check if token is expired, validity time = 1 hour
        if(token) {
            let decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime())
                logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar position="static" sx={{ borderRadius: '10px', margin: '15px', background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(250,177,75,1) 100%)'}}>
            <Container maxWidth="xl" sx={{display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>
                <Link to='/'><img /* className={classes.image} */ src={roambook_logo} alt="roambook" height="60" /></Link>
                {user ? (
                    <Box sx={{ flexGrow: 0, margin: 'auto 0' }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
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
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">Account</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
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