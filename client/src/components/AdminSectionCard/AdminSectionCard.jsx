import React from "react";
import { Box, Paper, Typography } from '@mui/material';

const AdminSectionCard = ({ sectionName, sectionDescription, icon, onClick }) => (
  <>
    <Paper
      sx={{
        p: 2,
        height: 185,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'baseline',
      }}
      onClick={onClick}
      elevation={1}>
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
        }}>
        {icon}
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'baseline',
          justifyContent: 'flex-end',
        }}>
        <Typography variant={'h6'}>{sectionName}</Typography>
        <Typography variant={'subtitle1'}>{sectionDescription}</Typography>
      </Box>
    </Paper>
  </>
);

export default AdminSectionCard;
