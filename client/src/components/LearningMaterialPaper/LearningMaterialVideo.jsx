import React from "react";
import { Box, Typography, Button } from '@mui/material';

const LearningMaterialVideo = ({data}) => <Box sx={{
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}}>
  <Box sx={{
    display: 'flex',
    flexGrow: 1,
    backgroundImage: data?.img && `url(${data?.img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: (theme) => theme.palette.grey[200],
  }}><Box sx={{
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.7)',
  }}>
    <Button variant={'contained'}>Play video</Button>
  </Box>
  </Box>
  <Box sx={{p: 2}}>
    <Typography variant={'h6'}>{data?.name.substr(0, 52)}</Typography>
  </Box>
</Box>

export default LearningMaterialVideo;
