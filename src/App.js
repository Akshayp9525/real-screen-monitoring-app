import React, { useState } from 'react';
import Login from './components/Login';
import { CssBaseline } from '@mui/material';
import MainLayout from './components';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = (status) => {
    setAuthenticated(status);
  };

  return (
    <>
      <CssBaseline />
      {authenticated ? (
        <>
       <MainLayout/>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
