import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';

import { useNavigate, useLocation } from 'react-router-dom';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsBySearch } from '../../actions/posts';
import useStyles from './styles.js'
import Pagination from "../Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({ user, setUser }) => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState('');
  const { isLoading, theme } = useSelector((state) => state.posts);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const flexDirection = isSmallScreen ? 'column-reverse' : 'row';
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleKeyPress = (e) => {
    // e.preventDefault();
    if(e.keyCode===13) {
      // key code 13 is for enter key
      searchPost();
    }
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // regular expression to match only alphabets, digits and commas
    const validInput = /^[0-9a-zA-Z,]*$/.test(inputValue);

    if (validInput || inputValue === '') {
      setTags(inputValue);
    }
  };

  const searchPost = () => {
    if(search.trim() || tags) {
      // console.log(tags);
      dispatch(getPostsBySearch({search, tags}));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags || 'none'}`);
    }
    else {
      navigate('/posts');
    }
  }

  const inputFieldStyles = () => {
    return(
      theme==="light"?{
        background: '#fcfcfc',
        borderRadius: '4px',
        marginBottom: "10px"
      }:{
        background: '#c6c6c6',
        borderRadius: '4px',
        marginBottom: "10px"
      }
    )
  }
  const appBarSearchStyles = () => {
    return(
      theme==="light"?{
      borderRadius: 4,
      marginBottom: '1rem',
      display: 'flex',
      padding: '16px',
      backgroundColor: "white"
    }:{
      borderRadius: 4,
      marginBottom: '1rem',
      display: 'flex',
      padding: '16px',
      backgroundColor: "black"
    })
  }
  const searchButtonStyles = () => {
    return(
      theme==="light"?
        {backgroundColor: "#0088b7", color: "white"}:
        {backgroundColor: "#0088b7", color: "white"}
    )
  }

  return (
    <Grow in>
        <Container maxWidth="xl" style={{paddingBottom: "20px", marginTop: '25px', minHeight: '100vh', paddingLeft: isSmallScreen?'12px':'24px', paddingRight: isSmallScreen?'12px':'24px' }}>
          <Grid container style={{flexDirection: flexDirection}} className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} user={user} setUser={setUser} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} style={appBarSearchStyles()} position="static" color="inherit" >
                <TextField className={classes.inputField}
                  style={inputFieldStyles()}
                  name="search" 
                  variant="outlined" 
                  label="Search Memories"
                  onKeyPress={handleKeyPress}
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <TextField className={classes.inputField}
                  style={inputFieldStyles()}
                  name="tags" 
                  variant="outlined" 
                  label="Enter comma separated tags"
                  onKeyPress={handleKeyPress}
                  fullWidth
                  value={tags}
                  onChange={handleInputChange}
                />
                <Button onClick={searchPost} className={classes.searchButton} variant="contained" style={searchButtonStyles()}>Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
          {(!searchQuery && !tags.length) && (
            <Paper classes={classes.pagination} elevation={6} style={{ maxWidth: "500px", margin: "30px auto 10px auto", borderRadius: '6px' }}>
              <Pagination page={page} />
            </Paper>
          )}
        </Container>
      </Grow>
  )
}

export default Home