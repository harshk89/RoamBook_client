import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz.js';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts.js';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import no_image from '../../../images/no_image.jpg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink, red } from '@mui/material/colors';

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
      return likes.find((like) => like === (userId))
        ? (
          <><FavoriteIcon sx={{color: pink[400]}} />&nbsp;<span style={{color: '#db1f64', fontSize: '1rem'}}>{likes.length}</span></>
        ) : (
          <><FavoriteBorderIcon sx={{color: pink[500]}} />&nbsp;<span style={{color: '#db1f64', fontSize: '1rem'}}>{likes.length}</span></>
        )
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  }

  return (
    <Card className={classes.card} raised elevation={6}>
        <CardMedia className={classes.media} image={post.selectedFile || no_image} title={post.title} onClick={openPost}/>
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          {/* <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography> */}
        </div>
        <div className={classes.overlay2}>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <Tooltip title="edit">
              <Button style={{color: 'white'}} size="small" onClick={() => {setCurrentId(post._id)}} >
                <MoreHorizIcon fontSize = "default" />
              </Button>
            </Tooltip>
          )}
        </div>
        
        <CardContent className={classes.cardContent} id="cardContent" onClick={openPost}>
          <Typography variant="h6" gutterBottom>{post.title}</Typography>
          <Typography variant="body2" color="textPrimary" >{post.message}</Typography>
          {/* <div className={classes.details}> */}
          <Typography variant="caption" color="textSecondary" >{post.tags.map((tag) => `#${tag} `)}</Typography><br/>
          <Typography variant="caption" color="textSecondary">{moment(post.createdAt).fromNow()}</Typography>
          {/* </div> */}
        </CardContent>
        <CardActions className={classes.cardActions} >
          <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
            <Likes />
          </Button>
          
          {(user?.result?._id === post?.creator || user?.result?.googleId === post?.creator) && (
            <div>
              <Button onClick={() => dispatch(deletePost(post._id))}>
                <DeleteIcon sx={{ color: red[400]}}/>
              </Button>
              {/* <Button size="small" color="primary" onClick={() => {setCurrentId(post._id)}} >
                <EditIcon3 fontSize = "small" />
              </Button> */}
            </div>
          )}
        </CardActions>
    </Card>
  )
}

export default Post