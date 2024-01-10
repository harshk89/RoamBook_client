import React, { useEffect, useState } from 'react';
import { Container, Typography, Divider, Avatar } from '@mui/material';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'

import no_profile from "../../images/no_profile.png";
import Post1 from '../Posts/Post/Post1';
import { getPostsByUserId } from '../../actions/posts';
import useStyles from './style';
import Form from '../Form/Form';

const Profile = ({ user, setUser }) => {
    const classes = useStyles();
    const { posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.authReducer.authData);
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
      if(user) {
        dispatch(getPostsByUserId(user?.result._id));
      }
    }, [])

    const mainContainerStyles = {
      background: "#ffcbcb",
      borderRadius: '8px',
      padding: '20px',
    }
    const headerStyles = {
      display: 'flex',
      marginBottom: "30px",
      marginTop: '30px'
    }
    
    return(
        <Container className={classes.mainContainer} style={mainContainerStyles}>
            <Container className={classes.header} style={headerStyles}>
                <Avatar alt="profile_pic" src={no_profile} sx={{ width: 100, height: 100 }}/>
                <Container>
                    <Typography variant="h5">{user?.result?.name}</Typography>
                    {/* <Typography gutterBottom>Bio</Typography> */}
                    <Typography><strong>Posts: </strong>{isLoading ? "-":posts.length}</Typography>
                </Container>
            </Container>
            <Divider />

            <div style={{margin: "20px auto", maxWidth: "500px"}}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </div>

            <div style={{marginTop: "40px" }} >
                {(!posts.length && !isLoading) ? 'No Posts': (
                    isLoading ? <CircularProgress /> : (
                        <Grid container alignItems='stretch' spacing={3}>
                          {posts.map((post) => (
                            <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                              <Post1 post={post}/>
                            </Grid>
                          ))}
                        </Grid>
                      )
                )}
            </div>
            
        </Container>
    )
}

export default Profile;