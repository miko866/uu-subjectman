import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete, Button, Box, Divider, TextField } from '@mui/material';

import Preloader from '../Preloader/Preloader';

import { getSubjectsService } from 'api/subject/subject';
import { getMaterialsService } from 'api/learningMaterial/learningMaterial';
import { useResponse } from 'utils/hooks/useResponse';
import { useMounted } from 'utils/hooks/useMounted';

const FormTopic = ({ topic, onSave }) => {
  const [name, setName] = useState(topic?.name);
  const [subjects, setSubjects] = useState(topic?.subjects);

  const [learningMaterials, setLearningMaterials] = useState(topic?.learningMaterials);

  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [availableLearningMaterials, setAvailableLearningMaterials] = useState([]);

  const [loadingLearningMaterials, setLoadingLearningMaterials] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  const [errors, setErrors] = useState({});

  const { setResponse } = useResponse();
  const loading = useMemo(
    () => loadingLearningMaterials || loadingSubjects,
    [loadingLearningMaterials, loadingSubjects],
  );

  const hasError = (field) => !!errors[field];

  const getError = (field) => hasError(field) && errors[field];

  const setAndValidate = (setter, value, field) => {
    if (hasError(field)) {
      let errorsTemp = { ...errors };
      delete errorsTemp[field];
      setErrors(errorsTemp);
    }

    if (!value || value.length === 0) {
      setErrors({ ...errors, [field]: 'Invalid value!' });
    }

    setter(value);
  };

  const submitForm = () => {
    if (Object.keys(errors).length > 0) {
      setResponse('Form contains errors!', 'error');

      return;
    }

    onSave(topic._id, {
      name,
      subjects: subjects.map((subject) => subject._id),
      learningMaterials: learningMaterials.map((material) => material._id),
    });
  };

  const getSubjects = () => {
    getSubjectsService()
      .then((response) => {
        setAvailableSubjects(response?.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingSubjects(false));
  };

  const getLearningMaterials = () => {
    getMaterialsService()
      .then((response) => {
        setAvailableLearningMaterials(response?.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingLearningMaterials(false));
  };

  const isMounted = useMounted();
  useEffect(() => {
    if (isMounted) {
      getSubjects();
      getLearningMaterials();
    }
  }, []);

  return !loading ? (
    <Box component="form">
      <Divider sx={{ pt: 3 }}>Topic</Divider>
      <TextField
        required
        fullWidth
        id="outlined-required"
        label="Topic name"
        value={name}
        onChange={(e) => setAndValidate(setName, e?.target?.value, 'name')}
        error={hasError('name')}
        helperText={getError('name')}
        sx={{ mt: 3 }}
      />
      <Divider sx={{ pt: 3 }}>Subjects</Divider>
      <Box sx={{ position: 'relative' }}>
        <Autocomplete
          fullWidth
          multiple
          limitTags={2}
          id="multiple-subjects-tags"
          options={availableSubjects}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          value={subjects}
          onChange={(e, value) => setSubjects(value)}
          renderInput={(params) => <TextField {...params} label="Subjects" placeholder="Find subjects" />}
          sx={{ mt: 3 }}
          disablePortal
        />
      </Box>
      <Divider sx={{ pt: 3 }}>Learning Materials</Divider>
      <Box sx={{ position: 'relative' }}>
        <Autocomplete
          fullWidth
          multiple
          limitTags={2}
          id="multiple-learning_materials-tags"
          options={availableLearningMaterials}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          value={learningMaterials}
          onChange={(e, value) => setLearningMaterials(value)}
          renderInput={(params) => (
            <TextField {...params} label="Learning materials" placeholder="Find learning materials" />
          )}
          sx={{ mt: 3 }}
          disablePortal
        />
      </Box>
      <Button sx={{ mt: 5 }} size={'large'} variant={'contained'} onClick={submitForm}>
        Save topic
      </Button>
    </Box>
  ) : (
    <Preloader />
  );
};

export default FormTopic;
