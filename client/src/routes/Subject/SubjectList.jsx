import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography, Link } from '@mui/material';
import moment from 'moment';

import CrudListTable from 'components/CrudListTable/CrudListTable';
import { getSubjectsService } from 'api/subject/subject';
import { useMounted } from 'utils/hooks/useMounted';

const cols = [
  {
    label: '',
    key: 'subject',
  },
  {
    label: 'Credits',
    key: 'credits',
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

const SubjectList = () => {
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  const prepareData = (subjects) =>
    subjects.map(({ _id, name, credits, updatedAt, createdAt }) => ({
      subject: (
        <Link onClick={() => navigate(`/subject/${_id}`)} underline="none">
          {name}
        </Link>
      ),
      credits,
      updatedAt: moment(updatedAt).format('LLL'),
      createdAt: moment(createdAt).format('LLL'),
      actions: [
        {
          key: 'edit',
          link: `/admin/subject/edit/${_id}`,
        },
        {
          key: 'delete',
          link: `/admin/subject/delete/${_id}`,
        },
      ],
    }));

  const getSubjects = () => {
    getSubjectsService()
      .then((response) => {
        setSubjects(prepareData(response.data));
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const isMounted = useMounted();
  useEffect(() => {
    if (isMounted) getSubjects();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant={'h3'} sx={{ flexGrow: 1 }}>
              Subjects
            </Typography>

            <Button variant={'contained'} sx={{ ml: 2 }} onClick={() => navigate('/admin/subject/create')}>
              Create Subject
            </Button>
          </Box>

          <CrudListTable rows={subjects} cols={cols} loading={loading} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SubjectList;
