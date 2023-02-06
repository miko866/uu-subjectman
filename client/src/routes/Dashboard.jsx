import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert, Grid, Typography } from '@mui/material';

import UserInfo from 'components/UserInfo/UserInfo';
import StudentSubjectCard from 'components/StudentSubjectCard/StudentSubjectCard';
import Preloader from 'components/Preloader/Preloader';

import { getStudyProgram } from 'api/studyProgram/studyProgram';
import { useAuth } from 'utils/hooks/useAuth';
import { useMounted } from 'utils/hooks/useMounted';

const Dashboard = () => {
  const { isAdmin, isSupervisor, isWaiting, user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const alertMessage = isWaiting ? 'Your account is still not approved.' : 'You have not enrolled subjects.';

  const getSubjects = (studyProgramId) => {
    getStudyProgram(studyProgramId)
      .then((response) => {
        setSubjects(response?.data?.subjects);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  const isMounted = useMounted();
  useEffect(() => {
    if (loading && !isWaiting && !isAdmin && !isSupervisor && isMounted) {
      getSubjects(user.studyProgramId);
    } else {
      setLoading(false);
    }
  }, []);

  if (isAdmin || isSupervisor) {
    return <Navigate to={'/admin'} />;
  }

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
            Enrolled Subjects
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {!loading ? (
            <Grid container spacing={2}>
              {subjects.length > 0 ? (
                subjects.map((subject, index) => (
                  <Grid item xs={4} key={`subject-${index}`}>
                    <StudentSubjectCard
                      subjectName={subject?.subject?.name}
                      subjectDescription={`${subject?.subject?.description.substring(0, 35)}...`}
                      subjectCredit={subject?.subject?.credits}
                      onClick={() => navigate(`/subject/${subject?.subject?.id}`)}
                    />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Alert severity="info">{alertMessage}</Alert>
                </Grid>
              )}
            </Grid>
          ) : (
            <Preloader />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
