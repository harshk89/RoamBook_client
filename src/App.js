import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import PostDetails from './components/PostDetails/PostDetails';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

import { GoogleOAuthProvider } from '@react-oauth/google';
//client secret = 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
//client id = 655981911995-pak5jgr4sdoqmem044hhqllsh1cobjkr.apps.googleusercontent.com

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  console.log("Hey")
  console.log(user)

  return (
    <GoogleOAuthProvider clientId='655981911995-pak5jgr4sdoqmem044hhqllsh1cobjkr.apps.googleusercontent.com'>
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />}/>
            <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/posts" />} />
          </Routes>
        
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
    
  );
}

export default App;
