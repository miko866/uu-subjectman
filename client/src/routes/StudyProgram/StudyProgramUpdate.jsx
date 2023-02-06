import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

import Preloader from 'components/Preloader/Preloader';
import FormStudyProgram from 'components/FormStudyProgram/FormStudyProgram';

import { getStudyProgram, updateStudyProgramService } from 'api/studyProgram/studyProgram';
import { useResponse } from 'utils/hooks/useResponse';
import { useMounted } from 'utils/hooks/useMounted';

const StudyProgramUpdate = () => {
  const [loading, setLoading] = useState(true);
  const [studyProgram, setStudyProgram] = useState({});
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const { setResponse } = useResponse();
  const navigate = useNavigate();

  const getStudyProgramData = (studyProgramId) => {
    getStudyProgram(studyProgramId)
      .then((response) => {
        setStudyProgram(response?.data);
      })
      .catch((error) => {
        console.error(error);
        navigate('/not-found');
      })
      .finally(() => setLoading(false));
  };

  const onSave = (studyProgram) => {
    setErrors([]);
    setLoading(true);

    let payload = {
      name: studyProgram?.name,
      degree: studyProgram?.degree,
      length: studyProgram?.length,
    };

    updateStudyProgramService(id, payload)
      .then((response) => {
        setResponse(response?.data?.message, 'success');
        navigate('/admin/study-program/list');
      })
      .catch((error) => {
        setResponse('Form contains Error!', 'error');
        setStudyProgram(studyProgram);
        setErrors(error?.response?.data);
      })
      .finally(() => setLoading(false));
  };

  const isMounted = useMounted();
  useEffect(() => {
    if (id && isMounted) {
      getStudyProgramData(id);
    }
  }, [id]);

  return !loading ? (
    <Grid container sx={{ justifyContent: 'center' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant={'h3'} gutterBottom>
          Edit subject
        </Typography>
        <FormStudyProgram studyProgram={studyProgram} onSave={onSave} errors={errors} />
      </Grid>
    </Grid>
  ) : (
    <Preloader />
  );
};

export default StudyProgramUpdate;
