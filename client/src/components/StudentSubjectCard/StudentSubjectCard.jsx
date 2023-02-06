import React from "react";
import { Box, Paper, Typography } from '@mui/material';

const StudentSubjectCard = ({ subjectName, subjectDescription, subjectCredit, onClick }) => (
  <>
    <Paper
      sx={{
        p: 2,
        height: 185,
        display: 'flex',
        flexDirection: 'column',
      }}
      elevation={1}
      onClick={onClick}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant={'body2'} color={'text.secondary'}>
          Credits
        </Typography>
        <Typography variant={'h5'}>{subjectCredit}</Typography>
      </Box>
      <Box>
        <Typography variant={'h6'}>{subjectName}</Typography>
        <Typography variant={'subtitle1'}>{subjectDescription}</Typography>
      </Box>
    </Paper>
  </>
);

export default StudentSubjectCard;
