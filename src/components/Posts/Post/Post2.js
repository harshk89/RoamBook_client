import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts.js';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Divider, IconButton, Typography } from '@mui/material';
import moment from 'moment'
import no_image from '../../../images/no_image.jpg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { pink, red } from '@mui/material/colors';
import useStyles from './styles1.js'

const Post2 = ({ post }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.authReducer.authData);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [likes, setLikes] = useState(post?.likes);

    const userId = user?.result?._id;
  
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
        <Card raised elevation={6} className={classes.card}>
            <CardHeader className={classes.cardHeader}
                avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
                    {post.name.charAt(0)}
                </Avatar>
                }
                title={post.name}
                subheader={moment(post.createdAt).fromNow()}
            />
            <CardMedia className={classes.cardMedia}
                component="img"
                image={post.selectedFile || no_image}
                alt={post.title}
                title={post.title}
                onClick={openPost}
            />
            <CardContent onClick={openPost} className={classes.cardContent}>
                <Typography variant="h6" gutterBottom>{post.title}</Typography>
                <Typography variant="body2" color="text.secondary">{post.message}</Typography>
                <Typography variant="caption" color="textSecondary" >{post.tags.map((tag) => `#${tag} `)}</Typography>
            </CardContent>
            <Divider sx={{marginLeft: "10px", marginRight: "10px"}} />
            <CardActions className={classes.cardActions} sx={{padding: "0px"}}>
                <IconButton aria-label="Like" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </IconButton>
                {(user?.result?._id === post?.creator) && (
                    <IconButton aria-label="delete" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon />
                    </IconButton>
                )}
            </CardActions>
        </Card>
    );
}

export default Post2;