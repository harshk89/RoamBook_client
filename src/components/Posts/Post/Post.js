import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined.js';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon3 from '@material-ui/icons/EditSharp.js';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts.js';
import { useNavigate } from 'react-router-dom';


import useStyles from './styles.js';
import './style1.css';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result?._id || user?.result?.googleId;

  const handleLike = async() => {
    dispatch(likePost(post._id));
    if(post.likes.find((id) => id === (userId))) {
      setLikes(post.likes.filter((id) => id !== (userId)));
    } else {
      setLikes([ ...post.likes, userId]);
    };
  }

  const Likes = () => {
    if(likes.length > 0) {
      return likes.find((like) => like === (userId))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length-1} others` : `${likes.length} like${likes.length>1 ? 's':''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize='small' />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        )
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  }

  return (
    <Card className={classes.card} raised elevation={6}>
      {/* <ButtonBase className={classes.cardActions} onClick={openPost}> */}
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} onClick={openPost}/>
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          {/* <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography> */}
        </div>
        {/* <div className={classes.overlay2}> */}
          {/* {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <Button style={{color: 'white'}} size="small" onClick={() => {setCurrentId(post._id)}} >
              <MoreHorizIcon fontSize = "default" />
            </Button>
          )} */}
        {/* </div> */}
        
        <CardContent className={classes.cardContent} id="cardContent" onClick={openPost}>
          <Typography variant="h6" gutterBottom>{post.title}</Typography>
          <Typography variant="body2" color="textPrimary" >{post.message}</Typography>
          {/* <div className={classes.details}> */}
          <Typography variant="caption" color="textSecondary" >{post.tags.map((tag) => `#${tag} `)}</Typography><br/>
          <Typography variant="caption" color="textSecondary">{moment(post.createdAt).fromNow()}</Typography>
          {/* </div> */}
        </CardContent>
      {/* </ButtonBase>  */}
      <CardActions className={classes.cardActions} >
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>
        
        {(user?.result?._id === post?.creator || user?.result?.googleId === post?.creator) && (
          <div>
            <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
              <DeleteIcon fontSize="small" />
            </Button>
            <Button size="small" color="primary" onClick={() => {setCurrentId(post._id)}} >
              <EditIcon3 fontSize = "small" />
            </Button>
          </div>
        )}
      </CardActions>

    </Card>
  )
}

export default Post