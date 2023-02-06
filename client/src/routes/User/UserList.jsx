import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import moment from 'moment';

import CrudListTable from 'components/CrudListTable/CrudListTable';
import { getUsersService } from 'api/user/user';
import { useMounted } from 'utils/hooks/useMounted';

const cols = [
  {
    label: 'First Name',
    key: 'firstName',
    align: 'right',
  },
  {
    label: 'Last Name',
    key: 'lastName',
    align: 'right',
  },
  {
    label: 'Email',
    key: 'email',
    align: 'right',
  },
  {
    label: 'Gender',
    key: 'gender',
    align: 'right',
  },
  {
    label: 'Role',
    key: 'role',
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

const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const prepareData = (users) =>
    users.map(({ _id, firstName, lastName, email, gender, role, updatedAt, createdAt }) => ({
      _id,
      firstName,
      lastName,
      email,
      gender,
      role: role.name,
      updatedAt: moment(updatedAt).format('LLL'),
      createdAt: moment(createdAt).format('LLL'),
      actions: [
        {
          key: 'allowUser',
        },
        {
          key: 'edit',
          link: `/admin/user/edit/${_id}`,
        },
        {
          key: 'delete',
          link: `/admin/user/delete/${_id}`,
        },
      ],
    }));

  const getUsers = () => {
    getUsersService()
      .then((response) => {
        setUsers(prepareData(response.data));
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  const isMounted = useMounted();
  useEffect(() => {
    if (isMounted) getUsers();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant={'h3'} sx={{ flexGrow: 1 }}>
              Users
            </Typography>
            {/*
            <Button variant={'contained'} sx={{ ml: 2 }} onClick={() => navigate('/admin/topic/create')}>
              Create User
            </Button> */}
          </Box>

          <CrudListTable rows={users} cols={cols} loading={loading} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserList;
