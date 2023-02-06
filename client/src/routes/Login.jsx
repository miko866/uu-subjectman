import React, { useState } from 'react';
import { Alert, Button, Container, Divider, TextField, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import isEmail from 'validator/lib/isEmail';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'utils/hooks/useAuth';

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: {
      value: '',
      error: false,
      errorMessage: 'You must enter email',
    },
    password: {
      value: '',
      error: false,
      errorMessage: 'You must enter a pasword',
    },
  });
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };
    let validForm = true;

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;

      if (currentValue === '') {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: true,
          },
        };
        validForm = false;
      } else if (currentValue !== '' && currentField === 'email') {
        if (!isEmail(currentValue)) {
          newFormValues = {
            ...newFormValues,
            [currentField]: {
              ...newFormValues[currentField],
              error: true,
              errorMessage: 'Neplatný email',
            },
          };
          validForm = false;
        }
      }
    }

    setFormValues(newFormValues);

    if (validForm) {
      login(newFormValues.email.value, newFormValues.password.value)
        .then(() => {
          navigate('/');
        })
        .catch(() => {
          setShowAlert(true);
          setFormValues({
            ['email']: {
              value: '',
            },
            ['password']: {
              value: '',
            },
          });
        });
    }
  };

  const handleGoogle = () => {
    window.open(`${process.env.REACT_APP_SERVER_API_URL}/auth/google`, '_self');
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h2"
        sx={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
        }}>
        Login
      </Typography>

      <GoogleIcon sx={{ fontSize: 40, cursor: 'pointer' }} onClick={() => handleGoogle()} />
      <Divider sx={{ marginBottom: '1rem' }} />

      <form noValidate onSubmit={handleSubmit}>
        <TextField
          placeholder="Enter your email"
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          required
          type="email"
          value={formValues.email.value}
          onChange={handleChange}
          error={formValues.email.error}
          helperText={formValues.email.error && formValues.email.errorMessage}
          sx={{
            paddingBottom: '2rem',
          }}
        />

        <TextField
          placeholder="Enter your password"
          label="Password"
          name="password"
          variant="outlined"
          fullWidth
          required
          type="password"
          value={formValues.password.value}
          onChange={handleChange}
          error={formValues.password.error}
          helperText={formValues.password.error && formValues.password.errorMessage}
          sx={{
            paddingBottom: '3rem',
          }}
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>

      {showAlert && (
        <Alert severity="error" sx={{ marginTop: '3rem' }}>
          This is an error alert — check it out!
        </Alert>
      )}
    </Container>
  );
};

export default Login;
