import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Grid, Typography } from '@mui/material';

import Preloader from 'components/Preloader/Preloader';
import FormTopic from 'components/FormTopic/FormTopic';

import { getTopicService, updateTopicService } from 'api/topics/topics';
import { useResponse } from 'utils/hooks/useResponse';
import { useMounted } from 'utils/hooks/useMounted';

const TopicUpdate = () => {
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState({});
  const { id } = useParams();
  const { setResponse } = useResponse();
  const navigate = useNavigate();

  const getTopic = (topicId) => {
    getTopicService(topicId)
      .then((response) => {
        setTopic(response?.data);
      })
      .catch((error) => {
        console.error(error);
        navigate('/not-found');
      })
      .finally(() => setLoading(false));
  };

  const onSave = (topicId, topic) => {
    setLoading(true);
    updateTopicService(topicId, topic)
      .then((response) => {
        setResponse(response?.data?.message, 'success');
        navigate('/admin/topic/list');
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const isMounted = useMounted();
  useEffect(() => {
    if (id && isMounted) {
      getTopic(id);
    }
  }, [id]);

  return !loading ? (
    <Grid container sx={{ justifyContent: 'center' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant={'h3'} gutterBottom>
          Edit topic
        </Typography>
        <FormTopic topic={topic} onSave={onSave} />
      </Grid>
    </Grid>
  ) : (
    <Preloader />
  );
};

export default TopicUpdate;
