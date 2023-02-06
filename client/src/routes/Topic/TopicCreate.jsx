import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { Grid, Typography } from '@mui/material';

import FormTopic from 'components/FormTopic/FormTopic';
import Preloader from 'components/Preloader/Preloader';

import { useResponse } from 'utils/hooks/useResponse';
import { createTopicService } from 'api/topics/topics';
import { useMounted } from 'utils/hooks/useMounted';

const TopicCreate = () => {
  const [loading, setLoading] = useState(true);
  const [topic] = useState({
    name: '',
    subjects: [],
    learningMaterials: [],
  });
  const { setResponse } = useResponse();
  const navigate = useNavigate();

  const onSave = (id, topic) => {
    setLoading(true);
    createTopicService(topic)
      .then((response) => {
        setResponse(response?.data?.message, 'success');
        navigate('/admin/topic/list');
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const isMounted = useMounted;
  useEffect(() => {
    if (isMounted) setLoading(false);
  }, []);

  return !loading ? (
    <Grid container sx={{ justifyContent: 'center' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant={'h3'} gutterBottom>
          Create topic
        </Typography>
        <FormTopic topic={topic} onSave={onSave} />
      </Grid>
    </Grid>
  ) : (
    <Preloader />
  );
};

export default TopicCreate;
