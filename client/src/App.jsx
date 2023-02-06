import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { CircularProgress, Box, Snackbar, Alert } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import GuestRoute from 'routes/GuestRoute';
import ProtectedRoute from 'routes/ProtectedRoute';
import AdminOrSupervisorRoute from 'routes/AdminOrSupervisorRoute';
import NotFound from 'routes/NotFound';
import Home from 'routes/Home';
import Login from 'routes/Login';
import SignUp from 'routes/SignUp';
import Admin from 'routes/Admin';
import Dashboard from 'routes/Dashboard';
import StudyProgramList from 'routes/StudyProgram/StudyProgramList';
import StudyProgramCreate from 'routes/StudyProgram/StudyProgramCreate';
import StudyProgramUpdate from 'routes/StudyProgram/StudyProgramUpdate';
import StudyProgramDelete from 'routes/StudyProgram/StudyProgramDelete';
import Subject from 'routes/Subject';
import SubjectList from 'routes/Subject/SubjectList';
import SubjectCreate from 'routes/Subject/SubjectCreate';
import SubjectUpdate from 'routes/Subject/SubjectUpdate';
import Topic from 'routes/Topic';
import TopicList from 'routes/Topic/TopicList';
import TopicCreate from 'routes/Topic/TopicCreate';
import TopicUpdate from 'routes/Topic/TopicUpdate';
import TopicDelete from 'routes/Topic/TopicDelete';
import UserList from 'routes/User/UserList';
import LearningMaterialCreate from 'routes/LearningMaterial/LearningMaterialCreate';
import LearningMaterialUpdate from 'routes/LearningMaterial/LearningMaterialUpdate';
import LearningMaterialList from 'routes/LearningMaterial/LearningMaterialList';
import LearningMaterialDelete from 'routes/LearningMaterial/LearningMaterialDelete';

import Navbar from 'components/Navbar/Navbar';
import Page from 'components/Page/Page';

import { setTokenCookies } from 'utils/auth';
import { useAuth } from 'utils/hooks/useAuth';
import { useResponse } from 'utils/hooks/useResponse';
import { useMounted } from 'utils/hooks/useMounted';

const routesMap = [
  {
    title: 'Home',
    key: 'home',
    path: '/',
    element: <Home title={'Learn With Us!'} />,
  },
  {
    title: 'Page',
    key: 'page',
    element: <Page />,
    children: [
      {
        title: 'GuestRoutes',
        element: <GuestRoute />,
        children: [
          {
            title: 'Login',
            path: 'login',
            key: 'login',
            element: <Login />,
          },
          {
            title: 'SignUp',
            key: 'signup',
            path: 'signup',
            element: <SignUp />,
          },
        ],
      },
      {
        title: 'ProtectedRoutes',
        element: <ProtectedRoute />,
        children: [
          {
            title: 'Dashboard',
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            title: 'Subject',
            path: 'subject/:id',
            element: <Subject />,
          },
          {
            title: 'Topic',
            path: 'topic/:id',
            element: <Topic />,
          },
          {
            title: 'AdminRoutes',
            element: <AdminOrSupervisorRoute />,
            children: [
              {
                title: 'Admin',
                path: 'admin',
                element: <Admin />,
              },
              {
                title: 'Study Programs',
                key: 'StudyProgramsList',
                path: 'admin/study-program/list',
                element: <StudyProgramList />,
              },
              {
                title: 'Create a study program',
                key: 'studyProgramCreation',
                path: 'admin/study-program/create',
                element: <StudyProgramCreate />,
              },
              {
                title: 'Update study program',
                key: 'studyProgramEdit',
                path: 'admin/study-program/edit/:id',
                element: <StudyProgramUpdate />,
              },
              {
                title: 'Delete study program',
                key: 'studyProgramDelete',
                path: 'admin/study-program/delete/:id',
                element: <StudyProgramDelete />,
              },
              {
                title: 'Subjects',
                key: 'SubjectsList',
                path: 'admin/subject/list',
                element: <SubjectList />,
              },
              {
                title: 'Create a subject',
                key: 'subjectCreation',
                path: 'admin/subject/create',
                element: <SubjectCreate />,
              },
              {
                title: 'Update subject',
                key: 'subjectEdit',
                path: 'admin/subject/edit/:id',
                element: <SubjectUpdate />,
              },
              {
                title: 'Topics',
                key: 'TopicsList',
                path: 'admin/topic/list',
                element: <TopicList />,
              },
              {
                title: 'Create a topic',
                key: 'topicCreation',
                path: 'admin/topic/create',
                element: <TopicCreate />,
              },
              {
                title: 'Update topic',
                key: 'topicEdit',
                path: 'admin/topic/edit/:id',
                element: <TopicUpdate />,
              },
              {
                title: 'Delete topic',
                key: 'topicDelete',
                path: 'admin/topic/delete/:id',
                element: <TopicDelete />,
              },
              {
                title: 'Users',
                key: 'UsersList',
                path: 'admin/user/list',
                element: <UserList />,
              },
              {
                title: 'Create a learning material',
                key: 'learningMaterialCreate',
                path: 'admin/learning-material/create',
                element: <LearningMaterialCreate />,
              },
              {
                title: 'Update a learning material',
                key: 'learningMaterialUpdate',
                path: 'admin/learning-material/edit/:id',
                element: <LearningMaterialUpdate />,
              },
              {
                title: 'Learning materials',
                key: 'learningMaterialList',
                path: 'admin/learning-material/list',
                element: <LearningMaterialList />,
              },
              {
                title: 'Delete a learning material',
                key: 'learningMaterialDelete',
                path: 'admin/learning-material/delete/:id',
                element: <LearningMaterialDelete />,
              },
            ],
          },
        ],
      },
      {
        title: 'Not Found',
        path: '*',
        key: 'not-found',
        element: <NotFound />,
      },
    ],
  },
];

const navItems = [
  {
    name: 'Home',
    path: '/',
    logged: false,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    logged: true,
  },
];

function App() {
  const routes = useRoutes(routesMap);
  const { initializing } = useAuth();
  const { responseMessages, onClose } = useResponse();

  const isMounted = useMounted();
  useEffect(() => {
    if (isMounted) {
      const { href } = window.location;
      const isToken = href?.split('/')[3].split('=')[0];

      if (isToken === '?token') {
        const token = href?.split('/')[3]?.split('=')[1];

        if (token) {
          setTokenCookies(token);
          window.history.replaceState(null, '', '/');
        }
      }
    }
  }, []);

  return initializing ? (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <CircularProgress size={150} />
    </Box>
  ) : (
    <>
      <CssBaseline />

      <Navbar navItems={navItems} />
      {responseMessages &&
        responseMessages.map(({ message, severity }, index) => (
          <Snackbar
            key={`${message}-${index}`}
            open={!!responseMessages[index]}
            autoHideDuration={6000}
            onClose={() => onClose(index)}>
            <Alert severity={severity} sx={{ width: '100%' }} onClose={() => onClose(index)}>
              {message}
            </Alert>
          </Snackbar>
        ))}
      {routes}
    </>
  );
}

export default App;
