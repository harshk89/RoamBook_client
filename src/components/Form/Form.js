import React, {useState, useEffect} from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts.js';
import { useNavigate } from 'react-router-dom';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import useStyles from './styles.js'

const Form = ({ currentId, setCurrentId}) => {
  const [postData, setPostData] = useState({
    title: '', message:'', tags:'', selectedFile:'' 
  })
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
  const classes = useStyles();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.authReducer.authData);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const navigate = useNavigate();
  const [expandForm, setExpandForm] = useState(false);

  useEffect(() => {
    if(post)
      setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    }
    else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
    }
    clear();
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', message:'', tags:'', selectedFile:'' });
  }

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Sign in to share your memories.
        </Typography>
      </Paper>
    );
  }

  const toggleForm = () => {
    setExpandForm(!expandForm);
  }

  const handleTagsInput = (e) => {
    const inputValue = e.target.value;

    // regular expression to match only alphabets, digits and commas
    const validInput = /^[0-9a-zA-Z,]*$/.test(inputValue);

    if (validInput || inputValue === '') {
      // setTags(inputValue);
      setPostData({ ...postData, tags: inputValue })
    }
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <Button onClick={toggleForm} className={classes.toggleButton}>{`${currentId ? 'Editing Memory' : 'Create new Memory'}`} {expandForm ? <ExpandLessIcon/>:<ExpandMoreIcon/>}</Button>
      {expandForm && 
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        {/* <Typography variant="h6">{`${currentId ? 'Editing Memory' : 'Create new Memory'}`}</Typography> */}
        <TextField name="title" variant="outlined" className={classes.textField} placeholder='title' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})} />
        <TextField name="message" variant="outlined" className={classes.textField} placeholder="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})} />
        <TextField name="tags" variant="outlined" className={classes.textField} label="Comma separated tags" fullWidth value={postData.tags} onChange={handleTagsInput} />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({base64}) => {setPostData({ ...postData, selectedFile: base64})}} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
      </form>
      }
    </Paper>
  )
}

export default Form;