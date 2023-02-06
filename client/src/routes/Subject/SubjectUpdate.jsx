import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Grid, Typography } from '@mui/material';

import Preloader from 'components/Preloader/Preloader';
import FormSubject from 'components/FormSubject/FormSubject';

import { getSubjectService, updateSubjectService } from 'api/subject/subject';
import { useResponse } from 'utils/hooks/useResponse';
import { useMounted } from 'utils/hooks/useMounted';

const SubjectUpdate = () => {
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState({});
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const { setResponse } = useResponse();
  const navigate = useNavigate();

  const getSubject = (subjectId) => {
    getSubjectService(subjectId)
      .then((response) => {
        setSubject(response?.data);
      })
      .catch((error) => {
        console.error(error);
        navigate('/not-found');
      })
      .finally(() => setLoading(false));
  };

  const onSave = (subjectId, subject) => {
    setErrors([]);
    setLoading(true);

    let topics = subject?.topics.map(({ _id }) => _id);

    let subjectData = {
      name: subject?.name,
      credits: subject?.credits,
      studyLanguage: subject?.studyLanguage,
      description: subject?.description,
      goal: subject?.goal,
      userId: subject?.userId,
      topics: topics?.length > 0 ? topics : [],
      studyProgramIds: subject?.studyPrograms.map(({ _id }) => _id),
      subjectType: subject?.subjectType,
    }

    updateSubjectService(subjectId, subjectData)
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
    if (id && isMounted) {
      getSubject(id);
    }
  }, [id]);

  return !loading ? (
    <Grid container sx={{ justifyContent: 'center' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant={'h3'} gutterBottom>
          Edit subject
        </Typography>
        <FormSubject subject={subject} onSave={onSave} errors={errors} />
      </Grid>
    </Grid>
  ) : (
    <Preloader />
  );
};

export default SubjectUpdate;
