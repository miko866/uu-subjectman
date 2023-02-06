import React from "react";
import { Grid, Typography } from '@mui/material';
import {useNavigate} from "react-router-dom";

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TopicIcon from '@mui/icons-material/Topic';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GroupIcon from '@mui/icons-material/Group';

import UserInfo from 'components/UserInfo/UserInfo';
import { useAuth } from 'utils/hooks/useAuth';
import AdminSectionCard from 'components/AdminSectionCard/AdminSectionCard';

const Admin = () => {
  const { user, isSupervisor } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={10}>
          <UserInfo user={user} />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <Typography variant={'h3'} gutterBottom>
            Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {!isSupervisor && (
              <Grid item xs={3} sx={{ cursor: 'pointer' }}>
                <AdminSectionCard
                  onClick={() => navigate('/admin/study-program/list')}
                  sectionName={'Study programs'}
                  sectionDescription={'CRUD study programs'}
                  icon={<LocalLibraryIcon fontSize="large" />}
                />
              </Grid>
            )}
            <Grid item xs={3} sx={{ cursor: 'pointer' }}>
              <AdminSectionCard
                onClick={() => navigate('/admin/subject/list')}
                sectionName={'Subjects'}
                sectionDescription={'CRUD subjects'}
                icon={<MenuBookIcon fontSize="large" />}
              />
            </Grid>
            <Grid item xs={3} sx={{ cursor: 'pointer' }}>
              <AdminSectionCard
                sectionName={'Topics'}
                onClick={() => navigate('/admin/topic/list')}
                sectionDescription={'CRUD topics'}
                icon={<TopicIcon fontSize="large" />}
              />
            </Grid>
            <Grid item xs={3} sx={{ cursor: 'pointer' }}>
              <AdminSectionCard sectionName={'Learning Materials'} icon={<LibraryBooksIcon fontSize="large" />} onClick={() => navigate('/admin/learning-material/list')} sectionDescription={'CRUD learning materials'} />
            </Grid>
            <Grid item xs={3} sx={{ cursor: 'pointer' }}>
              <AdminSectionCard
                sectionName={'Users'}
                onClick={() => navigate('/admin/user/list')}
                sectionDescription={'Manage App Users'}
                icon={<GroupIcon fontSize="large" />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Admin;
