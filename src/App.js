import React, { useState } from 'react';
import Login from './components/Login';
import { CssBaseline } from '@mui/material';
import MainLayout from './components';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from './routes';

function App() {
const [authenticated,setAuthenticated] = useState(false)
  const handleLogin = (status) => {
    setAuthenticated(status);
  };

  return (
    <>
      <CssBaseline />
      <Routes>
      <Route element={<PublicRoute/>}>
        <Route path='/' element={<Navigate replace to='/login' />} />
        <Route path='/login' onLogin={handleLogin} element={<Login />} />
      </Route>
      {/* <Route element={<PrivateRoute/>}> */}
        <Route path='/dashboard' element={<MainLayout />} />

      {/* </Route> */}
    </Routes>
    </>
  );
}

export default App;
