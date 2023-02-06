import React from "react";
import { Container, Box, Button, Typography } from '@mui/material';
import {useNavigate} from "react-router-dom";
import Footer from 'components/Footer/Footer';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate('/login');

  return (
    <>
      <Box
        sx={{
          background: (theme) => theme.palette.text.secondary,
          pt: 25,
          pb: 25,
          color: (theme) => theme.palette.common.white,
        }}>
        <Container fixed>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Typography variant={'h3'} gutterBottom>
              The best university ever!
            </Typography>
            <Typography variant={'subtitle'}>uuSubjectMan</Typography>
            <Button variant={'contained'} sx={{ mt: 2 }} onClick={() => handleClick()}>
              Lets start studying!
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
