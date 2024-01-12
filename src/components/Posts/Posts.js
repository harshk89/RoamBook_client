import React, {useEffect, useState} from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';
import { useSelector } from 'react-redux'
import Post1 from './Post/Post1'
import useStyles from './styles.js'

const Posts = ({ setCurrentId, user, setUser }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  const [signInAlert, setSignInAlert] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
    }
  }, [posts])
  

  if(!posts.length && !isLoading)
    return 'No Posts';

  return (
    isLoading ? (<div style={{marginLeft: '48%', marginBottom: "80vh"}}><CircularProgress /></div>) : (
      <>
      <Grid className={classes.container} container alignItems='stretch' spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
            <Post1 user={user} setUser={setUser} post={post} setCurrentId={setCurrentId} setSignInAlert={setSignInAlert}/>
          </Grid>
        ))}

      </Grid>
      {/* snackbar for signin alert */}
      <Snackbar
        anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
        autoHideDuration={3000}
        open={signInAlert}
        onClose={()=>setSignInAlert(false)}
        message="Please login to like post"
      />
      </>
    )
  )
}

export default Posts