import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

import { GoogleOAuthProvider } from '@react-oauth/google';
//client secret = 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
//client id = 655981911995-pak5jgr4sdoqmem044hhqllsh1cobjkr.apps.googleusercontent.com

function App() {

  return (
    <GoogleOAuthProvider clientId='655981911995-pak5jgr4sdoqmem044hhqllsh1cobjkr.apps.googleusercontent.com'>
      <BrowserRouter>
        <Container maxWidth="md">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
        
      </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
    
  );
}

export default App;
