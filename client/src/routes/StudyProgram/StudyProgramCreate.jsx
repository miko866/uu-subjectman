import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

import FormStudyProgram from 'components/FormStudyProgram/FormStudyProgram';
import Preloader from 'components/Preloader/Preloader';

import { useResponse } from 'utils/hooks/useResponse';
import { useMounted } from 'utils/hooks/useMounted';
import { createStudyProgramService } from 'api/studyProgram/studyProgram';

const StudyProgramCreate = () => {
  const [loading, setLoading] = useState(true);
  const [studyProgram, setStudyProgram] = useState({
    name: '',
    degree: '',
    length: 0,
  });
  const [errors, setErrors] = useState([]);
  const { setResponse } = useResponse();
  const navigate = useNavigate();

  const onSave = (studyProgram) => {
    setErrors([]);
    setLoading(true);

    let subjectData = {
      name: studyProgram?.name,
      degree: studyProgram?.degree,
      length: studyProgram?.length,
    };

    createStudyProgramService(subjectData)
      .then((response) => {
        setResponse(response?.data?.message, 'success');
        navigate('/admin/study-program/list');
      })
      .catch((error) => {
        setResponse('Form contains Error!', 'error');
        setStudyProgram(subjectData);
        setErrors(error?.response?.data);
      })
      .finally(() => setLoading(false));
  };

  const isMounted = useMounted();
  useEffect(() => {
    if (isMounted) setLoading(false);
  }, []);

  return !loading ? (
    <Grid container sx={{ justifyContent: 'center' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant={'h3'} gutterBottom>
          Create study program
        </Typography>
        <FormStudyProgram studyProgram={studyProgram} onSave={onSave} errors={errors} />
      </Grid>
    </Grid>
  ) : (
    <Preloader />
  );
};

export default StudyProgramCreate;
