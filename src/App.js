import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import Navbar1 from './components/Navbar/Navbar1';
import Profile from './components/Profile/Profile';
import Account from './components/Account/Account';
import { useSelector } from 'react-redux';

// import { GoogleOAuthProvider } from '@react-oauth/google';
//client secret = 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
//client id = 655981911995-pak5jgr4sdoqmem044hhqllsh1cobjkr.apps.googleusercontent.com

const App = () => {
  const user = useSelector((state) => state.authReducer.authData);

  return (
      <BrowserRouter>
        {/* <Container maxWidth="xl"> */}
          <Navbar1 />
          <Routes>
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />}/>
            <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/posts" />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        
        {/* </Container> */}
      </BrowserRouter>
    
  );
}

export default App;
