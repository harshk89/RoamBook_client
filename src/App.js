import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// import { Container } from '@material-ui/core';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import Navbar1 from './components/Navbar/Navbar1';
import Profile from './components/Profile/Profile';
import Account from './components/Account/Account';
// import { useSelector } from 'react-redux';
// import LandingPage from './components/LandingPage/LandingPage';

const App = () => {
  // const user = useSelector((state) => state.authReducer.authData);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  return (
      <BrowserRouter>
        {/* <Container maxWidth="xl"> */}
          <Navbar1 user={user} setUser={setUser}/>
          <Routes>
            {/* <Route path="/" element={<LandingPage />} /> */}
            <Route path="/" element={<Navigate to="/auth" />} />
            <Route path="/posts" element={<Home user={user} setUser={setUser}/>} />
            <Route path="/posts/search" element={<Home user={user} setUser={setUser}/>} />
            <Route path="/posts/:id" element={<PostDetails />}/>
            <Route path="/auth" element={!user ? <Auth user={user} setUser={setUser}/> : <Navigate to="/posts" />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser}/>} />
            <Route path="/account" element={<Account user={user} setUser={setUser}/>} />
          </Routes>
        
        {/* </Container> */}
      </BrowserRouter>
    
  );
}

export default App;
