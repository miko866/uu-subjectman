import React from "react";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Typography, Box } from '@mui/material';

const NotFound = () => <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
  <WarningAmberIcon sx={{fontSize: '5rem', mb: 3}}/>
  <Typography variant={'h3'}>Page Not Found!</Typography>
</Box>;

export default NotFound;
