import React, { useEffect, useState } from 'react';
import { Container, Typography, Divider, Avatar } from '@mui/material';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'

import no_profile from "../../images/no_profile.png";
import Post2 from '../Posts/Post/Post2';
import { getPostsByUserId } from '../../actions/posts';
import useStyles from './style';

const Profile = () => {
    const classes = useStyles();
    const { posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.authReducer.authData);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
      if(user) {
        dispatch(getPostsByUserId(user?.result._id));
      }
    }, [])
    
    return(
        <Container className={classes.mainContainer}>
            <Container className={classes.header} sx={{display: 'flex'}}>
                <Avatar alt="profile_pic" src={no_profile} sx={{ width: 100, height: 100 }}/>
                <Container>
                    <Typography variant="h5">{user?.result?.name}</Typography>
                    {/* <Typography gutterBottom>Bio</Typography> */}
                    <Typography><strong>Posts: </strong>{isLoading ? "-":posts.length}</Typography>
                </Container>
            </Container>
            <Divider />
            <Container sx={{marginTop: "40px"}}>
                {(!posts.length && !isLoading) ? 'No Posts': (
                    isLoading ? <CircularProgress /> : (
                        <Grid container alignItems='stretch' spacing={3}>
                          {posts.map((post) => (
                            <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                              <Post2 post={post}/>
                            </Grid>
                          ))}
                        </Grid>
                      )
                )}
            </Container>
            
        </Container>
    )
}

export default Profile;