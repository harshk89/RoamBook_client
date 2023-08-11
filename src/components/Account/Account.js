import React, { useEffect, useState } from 'react';
import { Container, Typography, Divider, Button, TextField, Alert } from '@mui/material';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { editDetails, updatePassword } from '../../actions/auth';
import { resetPassStatus } from '../../actions/auth';

import useStyles from './styles';
import { useNavigate } from 'react-router-dom';



const Account = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { passChangeStatus } = useSelector((state) => state.authReducer);
    const { authData } = useSelector((state) => state.authReducer);
    const [userDetails, setUserDetails] = useState({
        firstName: authData?.result.name.split(' ')[0],
        lastName: authData?.result.name.split(' ')[1],
        email: authData?.result.email
    });
    const [editEnabled, setEditEnabled] = useState(false);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    // useEffect(() => {
    //     dispatch(getUserDetails());
    
    // }, [third])
    

    const handleEdit = (e) => {
        e.preventDefault();
        dispatch(editDetails(userDetails, navigate));
        setEditEnabled(false);
    }

    const handleUpdatePass = (e) => {
        e.preventDefault();
        const data = {password,newPassword};
        dispatch(updatePassword(data));
    }
    
    return(
        <Container className={classes.mainContainer} sx={{
            width: '50vw',
            '@media (max-width: 960px)': {width: '90vw'}
        }}>
            <div className={classes.header} >
                <Typography variant='h4' gutterBottom>Account</Typography>
                <Divider />
            </div>
            {editEnabled ? (
            <form className={classes.details} onSubmit={handleEdit}>
                <div className={classes.userDetail} >
                    <Typography variant="body1" gutterBottom sx={{width: "100px"}}>First Name:</Typography>
                    <TextField id="filled-basic" variant="filled" size="small" className={classes.textField} value={userDetails.firstName} onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value})} />
                </div>
                <div className={classes.userDetail} >
                    <Typography variant="body1" gutterBottom sx={{width: "100px"}}>Last Name:</Typography>
                    <TextField required id="filled-required" variant="filled" size="small" className={classes.textField} value={userDetails.lastName} onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value})} />
                </div>
                <div className={classes.userDetail} >
                    <Typography variant="body1" gutterBottom sx={{width: "100px"}}>Email:</Typography>
                    <TextField id="filled-read-only-input" variant="filled" size="small" InputProps={{readOnly: true}} className={classes.textField} value={userDetails.email} />
                </div>
                {authData?.result.name===(userDetails.firstName+" "+userDetails.lastName) ? (
                <Button disabled variant="contained" sx={{marginTop: "20px", marginBottom: "20px"}}>Submit</Button>) : (
                <Button variant="contained" type="submit" sx={{marginTop: "20px", marginBottom: "20px"}}>Submit</Button>
                )}
            </form>
            ) : (<>
                <Typography variant="body1" gutterBottom>{`First Name: ${authData?.result.name.split(' ')[0]}`}</Typography>
                <Typography variant="body1" gutterBottom>{`Last Name: ${authData?.result.name.split(' ')[1]}`}</Typography>
                <Typography variant="body1" gutterBottom>{`Email: ${authData?.result.email}`}</Typography>
                <Button variant="contained" onClick={()=>setEditEnabled(true)} sx={{marginTop: "20px", marginBottom: "20px"}}>Update Details</Button>
                </>
            )}
            <Divider />
            <form className={classes.changePass} onSubmit={handleUpdatePass}>
                <div className={classes.userDetail} >
                    <Typography variant="body1" gutterBottom sx={{width: "180px"}}>Current Password:</Typography>
                    <TextField id="filled-basic" variant="filled" size="small" type='password' className={classes.textField} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <div className={classes.userDetail} >
                    <Typography variant="body1" gutterBottom sx={{width: "180px"}}>New Password:</Typography>
                    <TextField id="filled-basic" variant="filled" size="small" type='password' className={classes.textField} onChange={(e)=>setNewPassword(e.target.value)} />
                </div>
                <div className={classes.userDetail} >
                    <Typography variant="body1" gutterBottom sx={{width: "180px"}}>Confirm New Password:</Typography>
                    {newPassword===confirmPassword ? (<TextField id="filled-basic" variant="filled" size="small" type='password' className={classes.textField} onChange={(e)=>setConfirmPassword(e.target.value)} />) : 
                    (<TextField error id="filled-basic" variant="filled" size="small" type='password' className={classes.textField} onChange={(e)=>setConfirmPassword(e.target.value)} />)}
                </div>
                {(password && newPassword.length>=5 && newPassword===confirmPassword) ? (
                <Button variant="contained" type="submit" sx={{marginTop: "20px", marginBottom: "20px"}}>Update Password</Button>) : (
                <Button disabled variant="contained" sx={{marginTop: "20px", marginBottom: "20px"}}>Update Password</Button>
                )}
            </form>
            {(passChangeStatus==="successful") && (<Alert onClose={()=>{}} severity="success">Password successfully change!</Alert>)}
            {(passChangeStatus==="failed") && (<Alert onClose={()=>{}} severity="error">Password not changed - incorrect password!</Alert>)}

        </Container>
    )
}

export default Account;