import React, {useEffect, useState} from "react";
import { Box, Button, Grid, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import CrudListTable from 'components/CrudListTable/CrudListTable';
import { getTopicsService } from 'api/topics/topics';
import { useMounted } from 'utils/hooks/useMounted';

const cols = [
  {
    label: '',
    key: 'topic',
  },
  {
    label: 'Subjects',
    key: 'subjects',
    align: 'right',
  },
  {
    label: 'Updated at',
    key: 'updatedAt',
    align: 'right',
  },
  {
    label: 'Created at',
    key: 'createdAt',
    align: 'right',
  },
  {
    label: '',
    key: 'actions',
    align: 'right',
  },
];

const TopicList = () => {
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  const prepareData = (topics) =>
    topics.map(({ _id, subjects, name, updatedAt, createdAt }) => ({
      topic: (
        <Link onClick={() => navigate(`/topic/${_id}`)} underline="none">
          {name}
        </Link>
      ),
      // TODO: NEW LINE
      subjects: subjects.map((subject) => subject.name + ' '),
      updatedAt: moment(updatedAt).format('LLL'),
      createdAt: moment(createdAt).format('LLL'),
      actions: [
        {
          key: 'edit',
          link: `/admin/topic/edit/${_id}`,
        },
        {
          key: 'delete',
          link: `/admin/topic/delete/${_id}`,
        },
      ],
    }));

  const getTopics = () => {
    getTopicsService()
      .then((response) => {
        setTopics(prepareData(response.data));
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const isMounted = useMounted();
  useEffect(() => {
    if (isMounted) getTopics();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant={'h3'} sx={{ flexGrow: 1 }}>
              Topics
            </Typography>
            <Button variant={'contained'} sx={{ ml: 2 }} onClick={() => navigate('/admin/topic/create')}>
              Create Topic
            </Button>
          </Box>
          <CrudListTable rows={topics} cols={cols} loading={loading} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopicList;
