import React from "react";
import { Box, Chip, Typography } from '@mui/material';

const LearningMaterialContent = ({data}) => <>
  <Box sx={{
    flexGrow: 1,
    flexBasis: {xs: '33rem', sm: '33rem', md: '30rem'},
    maxWidth: {xs: '33%', sm: '33%', md: '30%'},
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: (theme) => theme.palette.grey[200],
  }}>
    {data?.img ? <img src={data.img} alt={data.name} style={{
      position: 'absolute',
      minWidth: '100%',
      minHeight: '100%',
      maxWidth: 'none',
      maxHeight: '100%',
      right: '50%',
      top: '50%',
      width: 'auto',
      height: 'auto',
      transform: 'translate3d(50%, -50%, 0)',
    }}/> : ""}
  </Box>
  <Box sx={{display: 'flex', flexDirection: 'column', p: 2, flexGrow: 1}}>
    <Box sx={{flexGrow: 1}}>
      <Typography variant={'h6'} gutterBottom>{data?.name}</Typography>
      {data?.description && <Typography variant={'body1'}>{data?.description.substr(0, 110)}</Typography>}
    </Box>
    <Box>
      <Chip label={data?.learningMaterialType?.name} color={'primary'}/>
    </Box>
  </Box>
</>

export default LearningMaterialContent;
