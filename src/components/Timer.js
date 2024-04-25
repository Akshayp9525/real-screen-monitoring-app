import React, { useEffect, useState } from 'react';
import { Button, Container, Divider } from '@mui/material';
import { PlayArrow, Stop, Replay } from '@mui/icons-material';
import './Timer.css'
const Timer = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimer(0);
  };

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1000);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours < 10 ? '0' : ''}${hours}:${
      minutes < 10 ? '0' : ''
    }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <div className='container'>
        <div id='title-bar'>Real monitoring app</div>
      </div>
      <Divider sx={{marginTop:'10px'}}/>
      <div>
    <div className='timer-box'>
    <div className='Timer-format'>{formatTime(timer)}</div>
     <div className='Timer-Buttons'>
         <div
                variant="contained"
                className='action-buttons'
                color={isRunning ? 'secondary' : 'primary'}
                onClick={isRunning ? stopTimer : startTimer}
            >
                {isRunning ? <Stop /> : <PlayArrow />}
            </div>
            
            {/* <Button variant="contained" className='action-buttons' onClick={resetTimer}>
                <Replay />
            </Button> */}
        </div>
      </div>

    </div>
    </>
  );
};

export default Timer;
