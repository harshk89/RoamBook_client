import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined.js';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon3 from '@material-ui/icons/EditSharp.js';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts.js';


import useStyles from './styles.js';
import './style1.css';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if(post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?._id || user?.result?.googleId))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length-1} others` : `${post.likes.length} like${post.likes.length>1 ? 's':''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize='small' />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        )
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        {/* <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography> */}
      </div>
      <div className={classes.overlay2}>
        {/* {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button style={{color: 'white'}} size="small" onClick={() => {setCurrentId(post._id)}} >
            <MoreHorizIcon fontSize = "default" />
          </Button>
        )} */}
      </div>
      
      <CardContent className={classes.cardContent} id="cardContent">
        <Typography variant="h6" gutterBottom>{post.title}</Typography>
        <Typography variant="body2" color="textPrimary" >{post.message}</Typography>
        {/* <div className={classes.details}> */}
        <Typography variant="caption" color="textSecondary" >{post.tags.map((tag) => `#${tag} `)}</Typography><br/>
        <Typography variant="caption" color="textSecondary">{moment(post.createdAt).fromNow()}</Typography>
        {/* </div> */}
      </CardContent>
      <CardActions className={classes.cardActions} >
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
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