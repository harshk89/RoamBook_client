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

const Post1 = ({ post, setCurrentId, user, setUser }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.authReducer.authData);
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { theme } = useSelector((state) => state.posts);
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

    const cardStyles = () => {
        return(
            theme==="light"?{
                // background: "linear-gradient(90deg, rgba(255,242,226,1) 23%, rgba(255,232,252,1) 75%)",
                backgroundColor: "white",
                position: "relative",
                transition: "all 0.8s",
                height: '500px',
                padding: "0px",
                color: 'black'
            }:{
                backgroundColor: "black",
                position: "relative",
                transition: "all 0.8s",
                height: '500px',
                padding: "0px",
                color: 'white'
            }
        )
    }
    const cardContentStyles = {
        height: "115px",
        overflowY: "scroll",
    }
    const cardMediaStyles = {
        height: "250px",
    }
    const cardHeaderStyles = () => {
        return(
            theme==='light'?{
                maxHeight: "25px",
                overflowY: "hidden",
                color: 'black'
            }:{
                maxHeight: "25px",
                overflowY: "hidden",
                color: '#e2e2e2'
            }
        )
    }
    const cardActionsStyles = {
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "10px",
        marginRight: "10px",
        overflowY: "hidden",
    }

    return (
        <Card raised elevation={6} className={classes.card} style={cardStyles()}>
            <CardHeader className={classes.cardHeader} style={cardHeaderStyles()}
                avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
                    {post.name.charAt(0)}
                </Avatar>
                }
                // action={
                //     <IconButton 
                //         aria-label="edit" 
                //         onClick={() => {setCurrentId(post._id)}}
                //         sx={{visibility: `${user?.result?._id === post?.creator ? "visible":"hidden"}`}}
                //         >
                //         <EditIcon />
                //     </IconButton>
                // }
                title={post.name}
                subheader={
                    <span style={{ fontSize: '0.8rem', color: theme==="light"?'#5e5e5e':'#c4c4c4' }}>
                        {moment(post.createdAt).fromNow()}
                    </span>
                }
            />
            <CardMedia className={classes.cardMedia} style={cardMediaStyles}
                component="img"
                image={post.selectedFile || no_image}
                alt={post.title}
                title={post.title}
                onClick={openPost}
            />
            <CardContent onClick={openPost} className={classes.cardContent} style={cardContentStyles} >
                <Typography variant="h6" gutterBottom style={{color: theme==='light'?'black':'#e2e2e2'}}>{post.title}</Typography>
                <Typography variant="body2" style={{color: theme==='light'?'black':'#cbcbcb'}}>{post.message}</Typography>
                <Typography variant="caption" sx={{color: '#15afff'}}>{post.tags.map((tag) => `#${tag} `)}</Typography>
            </CardContent>
            <Divider sx={{marginLeft: "10px", marginRight: "10px", marginBottom: '-6px'}} />
            <CardActions className={classes.cardActions} style={cardActionsStyles}>
                <IconButton aria-label="Like" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </IconButton>
                {(user?.result?._id === post?.creator) && (
                    <IconButton aria-label="delete" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon sx={{color: '#757575'}} />
                    </IconButton>
                )}
            </CardActions>
        </Card>
    );
}

export default Post1;