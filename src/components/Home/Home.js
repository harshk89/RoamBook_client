import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';

import { useNavigate, useLocation } from 'react-router-dom';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsBySearch } from '../../actions/posts';
import useStyles from './styles.js'
import Pagination from "../Pagination";

import { useTheme } from '@material-ui/core/styles';

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
  const { isLoading} = useSelector((state) => state.posts);

  const theme = useTheme();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const flexDirection = isSmallScreen ? 'column-reverse' : 'row';
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
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

  // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const handleKeyPress = (e) => {
    // e.preventDefault();
    if(e.keyCode===13) {
      // key code 13 is for enter key
      //search post
      searchPost();
    }
  }

  // const handleAdd = (tag) => {
  //   setTags([...tags, tag]);
  // }

  // const handleDelete = (tagToDelete) => {
  //   setTags(tags.filter((tag) => tag!==tagToDelete));
  // }

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
      // navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags || 'none'}`);
    }
    else {
      navigate('/posts');
    }
  }

  const inputFieldStyles = {
    background: 'cornsilk',
    borderRadius: '4px',
    marginBottom: "10px"
  }
  const appBarSearchStyles = {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
    background: 'linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)'
  }

  return (
    <Grow in>
        <Container maxWidth="xl">
          <Grid container style={{flexDirection: flexDirection}} className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} user={user} setUser={setUser} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} style={appBarSearchStyles} position="static" color="inherit" >
                <TextField className={classes.inputField}
                  style={inputFieldStyles}
                  name="search" 
                  variant="outlined" 
                  label="Search Memories"
                  onKeyPress={handleKeyPress}
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <TextField className={classes.inputField}
                  style={inputFieldStyles}
                  name="tags" 
                  variant="outlined" 
                  label="Enter comma separated tags"
                  onKeyPress={handleKeyPress}
                  fullWidth
                  value={tags}
                  onChange={handleInputChange}
                />
                {/* <ChipInput className={classes.inputField}
                  style={{margin: '10px 0'}}
                  value = {tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label="Search Tags"
                  variant="outlined"
                /> */}
                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>

              
            </Grid>
          </Grid>
          {(!searchQuery && !tags.length) && (
            <Paper classes={classes.pagination} elevation={6} style={{ maxWidth: "800px", margin: "30px auto 10px auto", padding: '10px 0' }}>
              <Pagination page={page} />
            </Paper>
          )}
        </Container>
      </Grow>
  )
}

export default Home