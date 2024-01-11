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
  const { theme } = useSelector((state) => state.posts);
  // const user = useSelector((state) => state.authReducer.authData);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const navigate = useNavigate();
  const [expandForm, setExpandForm] = useState(false);

  useEffect(() => {
    if(post)
      setPostData(post);
  }, [post]);

  const [displayErr, setDisplayErr] = useState('none');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(postData.selectedFile) {
      if(currentId) {
        dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      }
      else {
        dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      }
      clear();
    }
    else {
      setDisplayErr('block');
    }
  }

  const clear = () => {
    setCurrentId(null);
    setDisplayErr('none');
    setPostData({ title: '', message:'', tags:'', selectedFile:'' });
  }

  const toggleForm = () => {
    setExpandForm(!expandForm);
  }

  const handleTagsInput = (e) => {
    const inputValue = e.target.value;

    // regular expression to match only lowercase alphabets, digits, commas and underscore
    const validInput = /^[0-9a-z_,]*$/.test(inputValue);

    if (validInput || inputValue === '') {
      // setTags(inputValue);
      setPostData({ ...postData, tags: inputValue })
    }
  };

  const paperStyles = () => {
    return(
      theme==="light"?
      { padding: '16px',
        marginBottom: '1rem',
        backgroundColor: 'white',
        color: "black"
      }:{
        padding: '16px',
        marginBottom: '1rem',
        backgroundColor: 'black',
        color: 'white'
      })
  }
  const formStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
  const toggleButtonStyles = () => {
    return(
      theme==="light"?{
        margin:"auto",
        width: "100%",
        fontSize: "1rem",
        color: 'black'
      }:{
        margin:"auto",
        width: "100%",
        fontSize: "1rem",
        color: 'white'
      })
  }
  const textFieldStyles = () => {
    return(
      theme==="light"?{
        backgroundColor: '#fcfcfc',
        borderRadius: '5px',
        marginBottom: '8px'
      }:{
        backgroundColor: '#c6c6c6',
        borderRadius: '5px',
        marginBottom: '8px'
      })
  }
  const fileInputStyles = {
    width: '97%',
    margin: '10px 0',
  }

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper} style={paperStyles()}>
        <Typography variant="h6" align="center">
          Sign in to share your memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} style={paperStyles()} elevation={6}>
      <Button onClick={toggleForm} className={classes.toggleButton} style={toggleButtonStyles()}>{`${currentId ? 'Editing Memory' : 'Create new Memory'}`} {expandForm ? <ExpandLessIcon/>:<ExpandMoreIcon/>}</Button>
      {expandForm && 
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} style={formStyles} onSubmit={handleSubmit}>
        {/* <Typography variant="h6">{`${currentId ? 'Editing Memory' : 'Create new Memory'}`}</Typography> */}
        <TextField name="title" variant="outlined" className={classes.textField} style={textFieldStyles()} placeholder='title' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})} />
        <TextField name="message" variant="outlined" className={classes.textField} style={textFieldStyles()} placeholder="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})} />
        <TextField name="tags" variant="outlined" className={classes.textField} style={textFieldStyles()} label="Comma separated tags" fullWidth value={postData.tags} onChange={handleTagsInput} />
        <div className={classes.fileInput} style={fileInputStyles}>
          <FileBase type="file" multiple={false} onDone={({base64}) => {setPostData({ ...postData, selectedFile: base64})}} />
        </div>
        <Typography variant='caption' style={{color: 'red', display: displayErr}}>Choose an image first!</Typography>
        <Button className={classes.buttonSubmit} style={{color: 'white', marginBottom: '10px', backgroundColor: "#0088b7"}} variant="contained" size="medium" type="submit" fullWidth >Submit</Button>
        
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
      </form>
      }
    </Paper>
  )
}

export default Form;