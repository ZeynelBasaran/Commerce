import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearIndeterminate() {
  return (
    <Box className="flex-grow" sx={{ width: '100%',marginTop:"200px",padding:"100px"}}>
      <LinearProgress />
    </Box>
  );
}