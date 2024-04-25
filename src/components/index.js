import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import './index.css';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import Textarea from '@mui/joy/Textarea';

const MainLayout = () => {
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [timer, setTimer] = useState(0);

  // Function to calculate the time difference in hours and minutes
  const calculateTimeDifference = (startTime, endTime) => {
    const diff = Math.abs(endTime - startTime);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  // Function to start the timer
  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1000);
    }, 1000);
    return interval;
  };

  // Function to handle check-in action
  const handleCheckIn = () => {
    // Call your check-in API
    const currentTime = new Date();
    setCheckInTime(currentTime);
    setCurrentTime(currentTime);
    startTimer();
  };

  // Function to handle check-out action
  const handleCheckOut = () => {
    // Call your check-out API
    const currentTime = new Date();
    setCheckOutTime(currentTime);
    clearInterval(startTimer());
  };

  useEffect(() => {
    // Update the timer based on check-in and check-out times
    if (checkInTime && !checkOutTime) {
      setTimer(Date.now() - checkInTime.getTime());
    } else if (checkInTime && checkOutTime) {
      setTimer(checkOutTime.getTime() - checkInTime.getTime());
    }
  }, [checkInTime, checkOutTime]);
  return (
    <Container component='main' maxWidth='xs'>
      <div className='container'>
        <div id='title-bar'>Real monitoring app</div>
      </div>
      <Divider sx={{ marginTop: '10px' }} />
      <Card className='main-card'>
        <Box className='user'>
          <Avatar />
          <Typography>Akshay P.</Typography>
        </Box>
        <Box className='weekly-hours'>
          <Typography>Weekly:  </Typography>
          <Typography>40</Typography>
        </Box>
        <Box className='timer-box'>
          <Typography>{currentTime ? calculateTimeDifference(currentTime, new Date(timer)) : '00:00'}</Typography>
          <Box>
            <IconButton onClick={handleCheckIn}>
              <PauseCircleFilledIcon sx={{ color: 'lightgreen', height: '40px', width: '40px' }} />
            </IconButton>
          </Box>
        </Box>
      </Card>
      <Card className='meeting-card'>
       <Box className='textarea-box'>
        <Textarea minRows={2}/>
       </Box>
       <Box className='button-box'>
        <Button size='small' sx={{fontSize:'10px'}} variant='contained'>
        start meeting
        </Button>
       </Box>
      </Card>
    </Container>
  );
};

export default MainLayout;