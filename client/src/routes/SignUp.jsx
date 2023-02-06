import React, { useState, useEffect } from 'react';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Alert,
  Box,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import isEmail from 'validator/lib/isEmail';

import { signUpService } from 'api/user/user';

import { getStudyProgramsService } from 'api/studyProgram/studyProgram';
import { setTokenCookies } from 'utils/auth';
import { LANGUAGE, GENDER } from 'utils/constants';
import { useMounted } from 'utils/hooks/useMounted';

const SignUp = () => {
  const [studyPrograms, setStudyPrograms] = useState([]);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [password, setPassword] = useState('');
  const [formValues, setFormValues] = useState({
    studyProgram: {
      value: '',
      error: false,
      errorMessage: 'You must enter study program',
    },
    studyLanguage: {
      value: '',
      error: false,
      errorMessage: 'You must enter a study language',
    },
    firstName: {
      value: '',
      error: false,
      errorMessage: 'You must enter a first name',
    },
    lastName: {
      value: '',
      error: false,
      errorMessage: 'You must enter a last name',
    },
    email: {
      value: '',
      error: false,
      errorMessage: 'You must enter an email',
    },
    gender: {
      value: '',
      error: false,
      errorMessage: 'You must enter a gender',
    },
    repeatPassword: {
      value: '',
      error: false,
      errorMessage: 'Password is not the same',
    },
  });
  const [showAlert, setShowAlert] = useState(false);

  const isMounted = useMounted();
  useEffect(() => {
    if (isMounted) {
      getStudyProgramsService().then((response) => {
        if (response) setStudyPrograms(response.data);
      });
    }
  }, []);

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
      } else if (currentValue !== '' && currentField === 'repeatPassword') {
        if (currentValue !== password) {
          newFormValues = {
            ...newFormValues,
            [currentField]: {
              ...newFormValues[currentField],
              error: true,
              errorMessage: 'Nie sú rovnaké !',
            },
          };
          validForm = false;
        }
      }
    }

    setFormValues(newFormValues);

    if (validForm) {
      const newDateOfBirth = moment(dateOfBirth.format('YYYY-MM-DD'))._i.toString();

      const payload = {
        firstName: newFormValues.firstName.value,
        lastName: newFormValues.lastName.value,
        email: newFormValues.email.value,
        gender: newFormValues.gender.value,
        password,
        dateOfBirth: newDateOfBirth,
        studyLanguage: newFormValues.studyLanguage.value,
        studyProgramId: newFormValues.studyProgram.value._id,
      };

      signUpService(payload)
        .then((response) => {
          setTokenCookies(response.data.token);
          setTimeout(() => {
            window.location.href = process.env.REACT_APP_HOST_NAME;
          }, 200);
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

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h2"
        sx={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
        }}>
        Account info
      </Typography>

      <form noValidate onSubmit={handleSubmit}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              paddingTop: '2rem',
              paddingBottom: '2rem',
            }}>
            Study program
          </Typography>

          <FormControl
            fullWidth
            sx={{
              paddingBottom: '2rem',
            }}>
            <InputLabel id="study-program-select-label">Select study program *</InputLabel>
            <Select
              required
              labelId="study-program-select-label"
              id="studyProgram"
              name="studyProgram"
              label="Select study program *"
              defaultValue={''}
              value={formValues.studyProgram.value.name}
              onChange={handleChange}
              error={formValues.studyProgram.error}>
              {studyPrograms.map((program) => (
                <MenuItem value={program} key={program.name}>
                  {program.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText id="study-program-select-label">
              {formValues.studyProgram.error && formValues.studyProgram.errorMessage}
            </FormHelperText>
          </FormControl>

          <FormControl
            fullWidth
            sx={{
              paddingBottom: '2rem',
            }}>
            <InputLabel id="study-language-select-label">Study language *</InputLabel>
            <Select
              labelId="study-language-select-label"
              id="study-language-select"
              name="studyLanguage"
              defaultValue={''}
              value={formValues.studyLanguage.value}
              label="Study language *"
              onChange={handleChange}
              error={formValues.studyLanguage.error}>
              <MenuItem value={LANGUAGE.english}>{LANGUAGE.english}</MenuItem>
              <MenuItem value={LANGUAGE.czech}>{LANGUAGE.czech}</MenuItem>
            </Select>
            <FormHelperText id="study-language-select-label">
              {formValues.studyLanguage.error && formValues.studyLanguage.errorMessage}
            </FormHelperText>
          </FormControl>
        </Box>

        <Box>
          <Typography
            variant="h4"
            sx={{
              paddingTop: '2rem',
              paddingBottom: '2rem',
            }}>
            Student
          </Typography>

          <TextField
            placeholder="Enter your first name"
            label="First name"
            name="firstName"
            variant="outlined"
            fullWidth
            required
            value={formValues.firstName.value}
            onChange={handleChange}
            error={formValues.firstName.error}
            helperText={formValues.firstName.error && formValues.firstName.errorMessage}
            sx={{
              paddingBottom: '2rem',
            }}
          />
          <TextField
            placeholder="Enter your last name"
            label="Last name"
            name="lastName"
            variant="outlined"
            fullWidth
            required
            value={formValues.lastName.value}
            onChange={handleChange}
            error={formValues.lastName.error}
            helperText={formValues.lastName.error && formValues.lastName.errorMessage}
            sx={{
              paddingBottom: '2rem',
            }}
          />

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

          <FormControl
            fullWidth
            sx={{
              paddingBottom: '2rem',
            }}>
            <InputLabel id="gender-select-label">Gender *</InputLabel>
            <Select
              labelId="gender-select-label"
              id="gender-select"
              name="gender"
              defaultValue={''}
              value={formValues.gender.value}
              label="Gender *"
              onChange={handleChange}
              error={formValues.gender.error}>
              <MenuItem value={GENDER.male}>{GENDER.male}</MenuItem>
              <MenuItem value={GENDER.female}>{GENDER.female}</MenuItem>
            </Select>
            <FormHelperText id="gender-select-label">
              {formValues.gender.error && formValues.gender.errorMessage}
            </FormHelperText>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              value={dateOfBirth}
              disableFuture
              inputFormat="DD.MM.YYYY"
              views={['day', 'month', 'year']}
              label="Date of birth"
              onChange={(newValue) => {
                setDateOfBirth(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  sx={{
                    paddingBottom: '2rem',
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Box>

        <Box>
          <Typography
            variant="h4"
            sx={{
              paddingTop: '2rem',
              paddingBottom: '2rem',
            }}>
            Password
          </Typography>

          <TextField
            placeholder="Enter your password"
            label="Password"
            name="password"
            variant="outlined"
            fullWidth
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            sx={{
              paddingBottom: '3rem',
            }}
          />

          <TextField
            placeholder="Repeat your password"
            label="Repeat password"
            name="repeatPassword"
            variant="outlined"
            fullWidth
            required
            type="password"
            value={formValues.repeatPassword.value}
            onChange={handleChange}
            error={formValues.repeatPassword.error}
            helperText={formValues.repeatPassword.error && formValues.repeatPassword.errorMessage}
            sx={{
              paddingBottom: '3rem',
            }}
          />
        </Box>

        <Button fullWidth type="submit" variant="contained" color="primary">
          Lets study
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

export default SignUp;
