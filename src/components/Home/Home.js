import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';

import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsBySearch } from '../../actions/posts';
import useStyles from './styles.js'
import Pagination from "../Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const { isLoading} = useSelector((state) => state.posts);

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  const handleKeyPress = (e) => {
    // e.preventDefault();
    if(e.keyCode===13) {
      // key code 13 is for enter key
      //search post
      searchPost();
    }
  }

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  }

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag!==tagToDelete));
  }

  const searchPost = () => {
    if(search.trim() || tags) {
      dispatch(getPostsBySearch({search, tags: tags.join(',')}));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    }
    else {
      navigate('/');
    }
  }

  return (
    <Grow in>
        <Container maxWidth="xl">
          <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position="static" color="inherit" >
                <TextField className={classes.inputField}
                  name="search" 
                  variant="outlined" 
                  label="Search Memories"
                  onKeyPress={handleKeyPress}
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)} 
                />
                <ChipInput className={classes.inputField}
                  style={{margin: '10px 0'}}
                  value = {tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label="Search Tags"
                  variant="outlined"
                />
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