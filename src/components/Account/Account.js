import React, { useState } from 'react';
import { Container, Typography, Divider, Button, TextField, Alert } from '@mui/material';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { resetPassStatus } from '../../actions/auth';

import useStyles from './styles';



const Account = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { passChangeStatus } = useSelector((state) => state.authReducer);
    const user = useSelector((state) => state.authReducer.authData);
    const [userDetails, setUserDetails] = useState({
        firstName: user?.result.name.split(' ')[0],
        lastName: user?.result.name.split(' ')[1],
        email: user?.result.email
    });
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');



    return(
        <Container className={classes.mainContainer} sx={{
            width: '50vw',
            '@media (max-width: 960px)': {width: '90vw'}
        }}>
            <div className={classes.header} >
                <Typography variant='h4' gutterBottom>Account</Typography>
                <Divider />
            </div>
            <form className={classes.details}>
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
                {user?.result.name===(userDetails.firstName+" "+userDetails.lastName) ? (
                <Button disabled variant="contained" sx={{marginTop: "20px", marginBottom: "20px"}}>Edit details</Button>) : (
                <Button variant="contained" sx={{marginTop: "20px", marginBottom: "20px"}}>Edit details</Button>
                )}
            </form>
            <Divider />
            <form className={classes.changePass}>
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
                <Button variant="contained" sx={{marginTop: "20px", marginBottom: "20px"}}>Update Password</Button>) : (
                <Button disabled variant="contained" sx={{marginTop: "20px", marginBottom: "20px"}}>Update Password</Button>
                )}
            </form>
            {(passChangeStatus==="successful") && (<Alert onClose={()=>{}} severity="success">Password successfully change!</Alert>)}
            {(passChangeStatus==="failed") && (<Alert onClose={()=>{}} severity="error">Password not changed - incorrect password!</Alert>)}

        </Container>
    )
}

export default Account;