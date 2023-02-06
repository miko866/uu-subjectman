import React from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from 'components/Footer/Footer';

const Page = () => (
  <>
    <Container sx={{ pt: 8, pb: 8 }}>
      <Outlet />
    </Container>
    <Footer />
  </>
);

export default Page;
