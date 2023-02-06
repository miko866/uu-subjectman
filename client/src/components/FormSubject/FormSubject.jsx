import React, { useEffect, useMemo, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  InputLabel,
  FormControl,
  MenuItem,
  TextField,
  Select,
  FormHelperText,
} from '@mui/material';

import Preloader from '../Preloader/Preloader';

import { getUsersService } from 'api/user/user';
import { getTopicsService } from 'api/topics/topics';
import { getStudyProgramsService } from 'api/studyProgram/studyProgram';
import { useMounted } from 'utils/hooks/useMounted';

import {SUBJECT_TYPE} from "utils/constants"
import {useParams} from "react-router-dom";

const FormSubject = ({ subject, onSave, errors }) => {
  const [name, setName] = useState(subject?.name);
  const [description, setDescription] = useState(subject?.description);
  const [goal, setGoal] = useState(subject?.goal);
  const [credits, setCredits] = useState(subject?.credits);
  const [supervisor, setSupervisor] = useState(subject?.userId);
  const [studyLanguage, setStudyLanguage] = useState(subject?.studyLanguage);
  const [topics, setTopics] = useState(subject?.topics);
  const [studyPrograms, setStudyPrograms] = useState(subject?.studyPrograms);
  const [subjectType, setSubjectType] = useState('obligatory');
  const [supervisors, setSupervisors] = useState([]);
  const [availableTopics, setAvailableTopics] = useState([]);
  const [availableStudyPrograms, setAvailableStudyPrograms] = useState([]);

  const [loadingSupervisors, setLoadingSupervisors] = useState(true);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [loadingStudyPrograms, setLoadingStudyPrograms] = useState(true);

  const {id} = useParams();

  const loading = useMemo(
    () => loadingSupervisors || loadingTopics || loadingStudyPrograms,
    [loadingTopics, loadingSupervisors, loadingStudyPrograms],
  );

  const hasError = (field) => errors.filter((error) => error.field === field).length > 0;
  const getError = (field) => hasError(field) && errors.filter((error) => error.field === field)[0].message;

  const setAndValidate = (setter, value, field) => {
    setter(value);
  };

  const submitForm = () => {
    onSave(subject._id, {
      name,
      credits,
      studyLanguage,
      description,
      goal,
      userId: supervisor,
      topics,
      studyPrograms,
      subjectType,
    });
  };

  const getSupervisors = () => {
    getUsersService('supervisor')
      .then((response) => {
        setSupervisors(response?.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingSupervisors(false));
  };

  const getTopics = () => {
    getTopicsService()
      .then((response) => {
        setAvailableTopics(response?.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingTopics(false));
  };

  const getStudyPrograms = () => {
    getStudyProgramsService()
      .then((response) => {
        setAvailableStudyPrograms(response?.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingStudyPrograms(false));
  };

  const isMounted = useMounted();
  useEffect(() => {
    if (isMounted) {
      getSupervisors();
      getTopics();
      getStudyPrograms();
    }
  }, []);

  return !loading ? (
    <Box component="form">
      <Divider sx={{ pt: 3 }}>Subject</Divider>
      <TextField
        required
        fullWidth
        id="outlined-required"
        label="Subject name"
        value={name}
        onChange={(e) => setAndValidate(setName, e?.target?.value, 'name')}
        error={hasError('name')}
        helperText={getError('name')}
        sx={{ mt: 3 }}
      />
      <TextField
        required
        fullWidth
        id="outlined-required"
        label="Credits"
        type="number"
        value={credits}
        onChange={(e) => setAndValidate(setCredits, e?.target?.value, 'credits')}
        error={hasError('credits')}
        helperText={getError('credits')}
        sx={{ mt: 3 }}
      />
      {!id && <FormControl sx={{ mt: 3 }} fullWidth required>
        <InputLabel id="subject-study-type">Subject type</InputLabel>
        <Select
          labelId="subject-study-type-label"
          id="subject-study-type-helper"
          label="Subject type"
          value={subjectType}
          onChange={(e) => setSubjectType(e?.target?.value)}>{
            SUBJECT_TYPE.map((subject) => <MenuItem key={subject} value={subject}>{subject}</MenuItem>)
        }</Select>
      </FormControl>}
      <FormControl sx={{ mt: 3 }} fullWidth required>
        <InputLabel id="subject-study-language">Study language</InputLabel>
        <Select
          labelId="subject-study-language-label"
          id="subject-study-language-helper"
          label="Study language"
          value={studyLanguage}
          onChange={(e) => setStudyLanguage(e?.target?.value)}>
          <MenuItem value={'en'}>English</MenuItem>
          <MenuItem value={'cz'}>Czech</MenuItem>
        </Select>
      </FormControl>
      <TextField
        required
        fullWidth
        multiline
        id="outlined-required"
        label="Goal"
        value={goal}
        onChange={(e) => setAndValidate(setGoal, e?.target?.value, 'goal')}
        sx={{ mt: 3 }}
        error={hasError('goal')}
        helperText={getError('goal')}
      />
      <TextField
        fullWidth
        multiline
        id="outlined-required"
        label="Description"
        value={description}
        onChange={(e) => setAndValidate(setDescription, e?.target?.value, 'description')}
        sx={{ mt: 3 }}
        error={hasError('description')}
        helperText={getError('description')}
      />
      <Divider sx={{ pt: 3 }}>Supervisor</Divider>
      <FormControl sx={{ mt: 3 }} fullWidth
                   error={hasError('userId')}>
        <InputLabel id="subject-supervisor">Supervisor</InputLabel>
        <Select
          labelId="subject-supervisor-label"
          id="subject-supervisor-helper"
          label="Supervisor"
          value={supervisor}
          onChange={(e) => setSupervisor(e?.target?.value)}>
          {supervisors.map(({ _id, firstName, lastName }) => (
            <MenuItem key={_id} value={_id}>{`${firstName} ${lastName}`}</MenuItem>
          ))}
        </Select>
        { hasError('name') && <FormHelperText>{getError('userId')}</FormHelperText>}
      </FormControl>
      <Divider sx={{ pt: 3 }}>Topics</Divider>
      <Box sx={{ position: 'relative' }}>
        <Autocomplete
          fullWidth
          multiple
          limitTags={2}
          id="multiple-topics-tags"
          options={availableTopics}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          value={topics}
          onChange={(e, value) => setTopics(value)}
          renderInput={(params) => <TextField {...params} label="Topics" placeholder="Find topic" />}
          sx={{ mt: 3 }}
          disablePortal
        />
      </Box>
      <Divider sx={{ pt: 3 }}>Study programs</Divider>
      <Box sx={{ position: 'relative' }}>
        <Autocomplete
          fullWidth
          multiple
          limitTags={1}
          id="multiple-study_programs-tags"
          options={availableStudyPrograms}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          value={studyPrograms}
          onChange={(e, value) => setStudyPrograms(value)}
          renderInput={(params) => <TextField {...params} label="Study program" placeholder="Find program"
                                              error={hasError('studyProgramIds')}
                                              helperText={getError('studyProgramIds')} />}
          sx={{ mt: 3 }}
          disablePortal
        />
      </Box>
      <Button sx={{ mt: 5 }} size={'large'} variant={'contained'} onClick={submitForm}>
        Save subject
      </Button>
    </Box>
  ) : (
    <Preloader />
  );
};

export default FormSubject;
