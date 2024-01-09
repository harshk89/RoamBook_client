import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';  //moment is js library that deals with time
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentsSection';

import useStyles from './styles';

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if(post) {
      dispatch(getPostsBySearch({search: 'none', tags: post?.tags.join(',')}));
    }
  }, [post])

  if(!post) return null;

  if(isLoading) {
    return (<Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size='7em'/>
    </Paper>)
  }

  const goBack = () => {
    navigate(-1);
  }

  const openPost = (_id) => navigate(`/posts/${_id}`);

  const recommendedPosts = posts.filter((thispost) => thispost._id !== post._id);
  if(recommendedPosts.length > 4)
    recommendedPosts.splice(4);

  return (
    <Paper className={classes.paper} elevation={6}>
      <div className={classes.card}>
        <Button variant='outlined' onClick={goBack} style={{marginBottom: "10px"}}>Go back</Button>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
        <Divider />
        <div className={classes.section}>
          <Typography variant="h5">{post.title}</Typography>
          <Typography gutterBottom variant="body1" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1">{post.message}</Typography>
          <Typography variant="body1">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
      </div>
      {/* {posts.length}
      {recommendedPosts.length} */}
      {recommendedPosts.length>0 && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h5'>You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id}) => {
              return(
                <div style={{ margin: '20px', cursor: 'pointer'}} onClick={() => openPost(_id)} key={_id}>
                  <img src={selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} width="200px"/>
                  <Typography gutterBottom variant="h6">{title}</Typography>
                  <Typography gutterBottom variant="subtitle2">{name}</Typography>
                  {/* <Typography gutterBottom variant="subtitle2">{message}</Typography>
                  <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography> */}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails