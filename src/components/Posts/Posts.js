import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux'
import Post1 from './Post/Post1'
import useStyles from './styles.js'

const Posts = ({ setCurrentId, user, setUser }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  // console.log(posts);

  if(!posts.length && !isLoading)
    return 'No Posts';

  return (
    isLoading ? (<div style={{marginLeft: '48%', marginBottom: "80vh"}}><CircularProgress /></div>) : (
      <Grid className={classes.container} container alignItems='stretch' spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
            <Post1 user={user} setUser={setUser} post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}

      </Grid>
    )
  )
}

export default Posts