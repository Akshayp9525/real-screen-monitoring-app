import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Divider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmitLogin = (e,values) => {
    // dispatch(loginAction(values));
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      // onLogin(true); // Pass the authentication status to the parent component
      navigate('/dashboard')
    } else {
      setError('Invalid username or password');
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className="container">
        <div id="title-bar">Real monitoring app</div>
      </div>
    <Divider sx={{marginTop:'10px'}}/>
      <Box
        sx={{
            marginTop:3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: 'large' }} />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmitLogin}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          )}
          <Button type="submit" className='signin' fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
