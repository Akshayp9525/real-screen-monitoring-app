import React, { useState } from 'react';
import Login from './components/Login';
import { CssBaseline } from '@mui/material';

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
        Welcome to App!
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
