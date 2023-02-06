import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { Grid, Typography } from '@mui/material';

import FormSubject from 'components/FormSubject/FormSubject';
import Preloader from 'components/Preloader/Preloader';

import { useResponse } from 'utils/hooks/useResponse';
import { useMounted } from 'utils/hooks/useMounted';
import { createSubjectService } from 'api/subject/subject';

const SubjectCreate = () => {
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState({
    name: '',
    credits: 0,
    studyLanguage: 'cz',
    description: '',
    goal: '',
    userId: '',
    topics: [],
    studyPrograms: [],
  });
  const [errors, setErrors] = useState([]);
  const { setResponse } = useResponse();
  const navigate = useNavigate();

  const onSave = (subjectId, subject) => {
    setErrors([]);
    setLoading(true);

    let subjectData = {
      name: subject?.name,
      credits: subject?.credits,
      studyLanguage: subject?.studyLanguage,
      description: subject?.description,
      goal: subject?.goal,
      userId: subject?.userId,
      topics: subject?.topics.map(({ _id }) => _id),
      studyProgramIds: subject?.studyPrograms.map(({ _id }) => _id),
      subjectType: subject?.subjectType,
    }

    createSubjectService(subjectData)
      .then((response) => {
        setResponse(response?.data?.message, 'success');
        navigate('/admin/subject/list');
      })
      .catch((error) => {
        setResponse("Form contains Error!", 'error');
        setSubject(subject)
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
          Create subject
        </Typography>
        <FormSubject subject={subject} onSave={onSave} errors={errors} />
      </Grid>
    </Grid>
  ) : (
    <Preloader />
  );
};

export default SubjectCreate;
