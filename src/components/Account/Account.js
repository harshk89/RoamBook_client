import React, { useEffect, useState } from 'react';
import { Container, Typography, Divider, Button, TextField, Alert } from '@mui/material';
// import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { editDetails, updatePassword } from '../../actions/auth';
import { resetChangeStatus } from '../../actions/auth';
import LoadingButton from '@mui/lab/LoadingButton';

import useStyles from './styles';
import { useNavigate } from 'react-router-dom';

const Account = ({ user, setUser }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { changeStatus } = useSelector((state) => state.authReducer);
    // const { authData } = useSelector((state) => state.authReducer);
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { theme } = useSelector((state) => state.posts);
    const [userDetails, setUserDetails] = useState({
        firstName: user?.result?.name.split(' ')[0],
        lastName: user?.result?.name.split(' ')[1],
        email: user?.result?.email
    });
    const [loading, setLoading] = useState(false);
    const [editEnabled, setEditEnabled] = useState(false);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    // useEffect(() => {
    //     dispatch(getUserDetails());
    
    // }, [third])
    
    const clear = () => {
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(editDetails(userDetails, setUser, setEditEnabled, setLoading ));
    }

    const handleUpdatePass = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {password,newPassword};
        dispatch(updatePassword(data, setUser, clear, setLoading));
    }

    const mainContainerStyles = {
        background: '#e5e5e5',
        minHeight: '100vh',
        padding: '40px',
        width: '50vw',
        '@media (max-width: 960px)': {width: '90vw'}
    }
    
    return(
        <Container className={classes.mainContainer} sx={mainContainerStyles}>
            <div className={classes.header} style={{marginBottom: '20px'}} >
                <Typography variant='h4' gutterBottom>Account</Typography>
                <Divider />
            </div>
            {editEnabled ? (
            <form className={classes.details} style={{margin: '8px'}} onSubmit={handleEdit}>
                <div className={classes.userDetail} style={{display: 'flex', alignItems: 'center'}} >
                    <Typography variant="body1" gutterBottom sx={{width: "100px"}}>First Name:</Typography>
                    <TextField id="filled-basic" variant="filled" size="small" className={classes.textField} style={{color: 'green', marginTop: '10px'}} value={userDetails.firstName} onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value})} />
                </div>
                <div className={classes.userDetail} style={{display: 'flex', alignItems: 'center'}} >
                    <Typography variant="body1" gutterBottom sx={{width: "100px"}}>Last Name:</Typography>
                    <TextField required id="filled-required" variant="filled" size="small" className={classes.textField} style={{color: 'green', marginTop: '10px'}} value={userDetails.lastName} onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value})} />
                </div>
                <div className={classes.userDetail} style={{display: 'flex', alignItems: 'center'}} >
                    <Typography variant="body1" gutterBottom sx={{width: "100px"}}>Email:</Typography>
                    <TextField id="filled-read-only-input" variant="filled" size="small" InputProps={{readOnly: true}} className={classes.textField} style={{color: 'green', marginTop: '10px'}} value={userDetails.email} />
                </div>
                {user?.result?.name===(userDetails.firstName+" "+userDetails.lastName) ? (
                    <LoadingButton disabled size="large" type="submit" loading={loading} variant="contained" style={{marginTop: "20px", marginBottom: "20px"}}>Submit</LoadingButton>) : (
                    <LoadingButton size="large" type="submit" loading={loading} variant="contained" style={{marginTop: "20px", marginBottom: "20px"}}>Submit</LoadingButton>
                )}
            </form>
            ) : (<>
                <Typography variant="body1" gutterBottom>{`First Name: ${user?.result?.name.split(' ')[0]}`}</Typography>
                <Typography variant="body1" gutterBottom>{`Last Name: ${user?.result?.name.split(' ')[1]}`}</Typography>
                <Typography variant="body1" gutterBottom>{`Email: ${user?.result?.email}`}</Typography>
                <Button variant="contained" onClick={()=>setEditEnabled(true)} sx={{marginTop: "20px", marginBottom: "20px"}}>Update Details</Button>
                </>
            )}
            {(changeStatus==="details-change-success") && (<Alert onClose={()=>{dispatch(resetChangeStatus())}} severity="success">Details updated!</Alert>)}
            {(changeStatus==="details-change-failed") && (<Alert onClose={()=>{dispatch(resetChangeStatus())}} severity="error">Details not updated! - Something went wrong</Alert>)}
            <Divider />
            <form className={classes.changePass} style={{margin: '8px'}} onSubmit={handleUpdatePass}>
                <div className={classes.userDetail} style={{display: 'flex', alignItems: 'center'}} >
                    <Typography variant="body1" gutterBottom sx={{width: "180px"}}>Current Password:</Typography>
                    <TextField variant="filled" size="small" type='password' className={classes.textField} style={{color: 'green', marginTop: '10px'}} value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <div className={classes.userDetail} style={{display: 'flex', alignItems: 'center'}} >
                    <Typography variant="body1" gutterBottom sx={{width: "180px"}}>New Password:</Typography>
                    <TextField variant="filled" size="small" type='password' className={classes.textField} style={{color: 'green', marginTop: '10px'}} value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
                </div>
                <div className={classes.userDetail} style={{display: 'flex', alignItems: 'center'}} >
                    <Typography variant="body1" gutterBottom sx={{width: "180px"}}>Confirm New Password:</Typography>
                    {newPassword===confirmPassword ? (<TextField variant="filled" size="small" type='password' className={classes.textField} style={{color: 'green', marginTop: '10px'}} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />) : 
                    (<TextField error variant="filled" size="small" type='password' className={classes.textField} style={{color: 'green', marginTop: '10px'}} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />)}
                </div>
                {(password && newPassword.length>=5 && newPassword===confirmPassword) ? (
                    <LoadingButton size="large" type="submit" loading={loading} variant="contained" style={{marginTop: "20px", marginBottom: "20px"}}>Update Password</LoadingButton>) : (
                    <LoadingButton disabled size="large" type="submit" loading={loading} variant="contained" style={{marginTop: "20px", marginBottom: "20px"}}>Update Password</LoadingButton>
                )}
            </form>
            {(changeStatus==="pass-change-success") && (<Alert onClose={()=>{dispatch(resetChangeStatus())}} severity="success">Password successfully change!</Alert>)}
            {(changeStatus==="pass-change-failed") && (<Alert onClose={()=>{dispatch(resetChangeStatus())}} severity="error">Password not changed - incorrect password!</Alert>)}

        </Container>
    )
}

export default Account;