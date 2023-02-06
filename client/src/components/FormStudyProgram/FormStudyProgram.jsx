import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

import { DEGREE } from 'utils/constants';

const FormStudyProgram = ({ studyProgram, onSave, errors }) => {
  const [name, setName] = useState(studyProgram?.name);
  const [degree, setDegree] = useState(studyProgram?.degree);
  const [length, setLength] = useState(studyProgram?.length);

  const hasError = (field) => errors.filter((error) => error.field === field).length > 0;
  const getError = (field) => hasError(field) && errors.filter((error) => error.field === field)[0].message;

  const setAndValidate = (setter, value, field) => {
    setter(value);
  };

  const submitForm = () => {
    onSave({
      name,
      degree,
      length,
    });
  };

  return (
    <Box component="form">
      <TextField
        required
        fullWidth
        id="outlined-required"
        label="Name"
        value={name}
        onChange={(e) => setAndValidate(setName, e?.target?.value, 'name')}
        error={hasError('name')}
        helperText={getError('name')}
        sx={{ mt: 3 }}
      />
      <FormControl sx={{ mt: 3 }} fullWidth required>
        <InputLabel id="study-program-label">Subject type</InputLabel>
        <Select
          labelId="study-program-label"
          id="study-program-label"
          label="Study Program"
          value={degree}
          onChange={(e) => setDegree(e?.target?.value)}>
          {DEGREE.map((subject) => (
            <MenuItem key={subject} value={subject}>
              {subject}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        required
        fullWidth
        id="outlined-required"
        label="Length"
        type="number"
        value={length}
        onChange={(e) => setAndValidate(setLength, e?.target?.value, 'length')}
        error={hasError('length')}
        helperText={getError('length')}
        sx={{ mt: 3 }}
      />

      <Button sx={{ mt: 5 }} size={'large'} variant={'contained'} onClick={submitForm}>
        Save study program
      </Button>
    </Box>
  );
};

export default FormStudyProgram;
