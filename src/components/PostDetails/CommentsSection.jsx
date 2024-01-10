import React , { useState, useEffect, useRef } from "react";
import { Typography, TextField, Button, Divider } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { commentPost } from '../../actions/posts';

import useStyles from './styles';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = useSelector((state) => state.authReducer.authData);
    const dispatch = useDispatch();
    const commentsRef = useRef();

    const handleClick = async() => {
        const finalComment = `${user.result.name}: ${comment}`
        const newComments = await dispatch(commentPost(finalComment, post._id));

        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behaviour: 'smooth' });
    };

    const [windowSize, setWindowSize] = useState(window.innerWidth);
        const width = windowSize < 600 ? '70vw' : '40vw';
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

        const commentsContainerStyles = {
            maxHeight: '200px',
            width: width,
            overflowY: 'auto',
            marginRight: '30px',
            marginBottom: '20px'
        }

    return(
        <div>
            <div className={classes.commentsContainer} style={commentsContainerStyles}>
                <Typography gutterBottom variant="h6">Comments</Typography>
                {comments.map((c, i) => (
                    <Typography key={i} gutterBottom variant="subtitle1">
                        <strong>{c.split(': ')[0]}:</strong>
                        {c.split(':')[1]}
                    </Typography>
                ))}
                <div style={{minHeight: '25px'}}></div>
                <div ref={commentsRef} />
            </div>
            
            {user?.result?.name && (
                    <div >
                        <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant='contained' color="primary" onClick={handleClick}>
                            Comment
                        </Button>
                    </div>
                )}
        </div>
    );
};

export default CommentSection;