import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import moment from 'moment';

import CrudListTable from 'components/CrudListTable/CrudListTable';
import { getStudyProgramsService } from 'api/studyProgram/studyProgram';
import { useMounted } from 'utils/hooks/useMounted';

const cols = [
  {
    label: 'Name',
    key: 'name',
  },
  {
    label: 'Degree',
    key: 'degree',
    align: 'right',
  },
  {
    label: 'Length',
    key: 'length',
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

const StudyProgramList = () => {
  const [loading, setLoading] = useState(true);
  const [studyPrograms, setStudyPrograms] = useState([]);
  const navigate = useNavigate();

  const prepareData = (subjects) =>
    subjects.map(({ _id, name, degree, length, updatedAt, createdAt }) => ({
      name,
      degree,
      length,
      updatedAt: moment(updatedAt).format('LLL'),
      createdAt: moment(createdAt).format('LLL'),
      actions: [
        {
          key: 'edit',
          link: `/admin/study-program/edit/${_id}`,
        },
        {
          key: 'delete',
          link: `/admin/study-program/delete/${_id}`,
        },
      ],
    }));

  const getStudyPrograms = () => {
    getStudyProgramsService()
      .then((response) => {
        setStudyPrograms(prepareData(response.data));
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const isMounted = useMounted();
  useEffect(() => {
    if (isMounted) getStudyPrograms();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant={'h3'} sx={{ flexGrow: 1 }}>
              Study Programs
            </Typography>

            <Button variant={'contained'} sx={{ ml: 2 }} onClick={() => navigate('/admin/study-program/create')}>
              Create Study Program
            </Button>
          </Box>

          <CrudListTable rows={studyPrograms} cols={cols} loading={loading} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StudyProgramList;
