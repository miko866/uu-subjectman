import React from 'react';
import ReactDOM from 'react-dom/client';
import {ThemeProvider} from '@mui/material/styles';
import {BrowserRouter} from 'react-router-dom';

import './resources/css/index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from 'App';
import reportWebVitals from 'reportWebVitals';
import theme from 'theme';
import { AuthProvider } from 'utils/hooks/useAuth';
import { ResponseProvider } from 'utils/hooks/useResponse';

// Disable all logs for production
/* eslint-disable no-console */
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
  console.debug = () => {};
}
/* eslint-enable no-console */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <ResponseProvider>
            <App/>
          </ResponseProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
