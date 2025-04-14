import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading({display}) {
  return (
    <Box className={`flex justify-center items-center mt-10 ${display}`} >
      <CircularProgress  size="40px" color='dark:white black'/>
    </Box>
  );
}

