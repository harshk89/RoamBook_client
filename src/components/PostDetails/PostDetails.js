import React, { useState, useEffect } from 'react';
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

  const goBack = () => {
    navigate(-1);
  }

  const openPost = (_id) => navigate(`/posts/${_id}`);

  const recommendedPosts = posts.filter((thispost) => thispost._id !== post._id);
  if(recommendedPosts.length > 4)
    recommendedPosts.splice(4);

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const flexDirection = windowSize < 600 ? 'column' : 'row';
  const margin = windowSize < 960 ? 'auto 10px' : 'auto';
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    // Initial check on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const paperStyles = {
    background: "#f2f2f2",
    margin: "auto",
    padding: '20px',
    borderRadius: '20px',
    // [theme.breakpoints.down('sm')]: {
    //   padding: "2px"
    // },
    maxWidth: "1000px",
  }
  const mediaStyles = {
    margin: "auto",
    borderRadius: '20px',
    objectFit: 'contain',
    maxHeight: '500px',
    width: "100%",
  }
  const cardStyles = {
    flexWrap: 'wrap',
    flexDirection: 'column',
  }
  const sectionStyles = {
    borderRadius: '20px',
    margin: '20px',
    flex: 1,
  }
  const imageSectionStyles = {
    display: "flex",
    margin: "auto",
    maxHeight: "800px",
    marginBottom: "40px",
  }
  const recommendedPostsStyles = {
    display: 'flex',
    flexDirection: flexDirection
  }
  const loadingPaperStyles = {
    background: "#ffcbcb",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: margin,
    borderRadius: '20px',
    height: '50vh',
    maxWidth: "1000px"
  }



  if(isLoading) {
    return (<Paper elevation={6} className={classes.loadingPaper} style={loadingPaperStyles}>
      <CircularProgress size='7em'/>
    </Paper>)
  }

  if(!post) return null;

  return (
    <Paper className={classes.paper} elevation={6} style={paperStyles}>
      <div className={classes.card} style={cardStyles}>
        <Button variant='outlined' onClick={goBack} style={{marginBottom: "10px"}}>Go back</Button>
        <div className={classes.imageSection} style={imageSectionStyles}>
          <img className={classes.media} style={mediaStyles} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
        <Divider />
        <div className={classes.section} style={sectionStyles}>
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
        <div className={classes.section} style={sectionStyles}>
          <Typography gutterBottom variant='h5'>You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts} style={recommendedPostsStyles}>
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