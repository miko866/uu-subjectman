import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: {
      main: '#00B0EE',
      contrastText: '#fff',
    },
    secondary: {
      main: '#EB9929',
      contrastText: '#fff',
    },
    text: {
      primary: '#374955',
      secondary: '#9BAEBC',
    },
    background: {
      default: '#fff',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#fff',
          color: '#374955',
        },
      },
    },
  },
});
