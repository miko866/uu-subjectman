import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import { Alert, Accordion, AccordionSummary, AccordionDetails, Box, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Preloader from 'components/Preloader/Preloader';
import LearningMaterialPaper from 'components/LearningMaterialPaper/LearningMaterialPaper';
import { getSubjectService } from 'api/subject/subject';
import { useMounted } from 'utils/hooks/useMounted';

const Subject = () => {
  const [subject, setSubject] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
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

  const isMounted = useMounted();
  useEffect(() => {
    if (isMounted) getSubject(id);
  }, []);

  return !loading ? (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Typography variant={'h3'} gutterBottom>
          {subject?.name}
        </Typography>
        <Typography variant={'body1'}>{subject?.description}</Typography>
        <Box sx={{ pt: 2 }}>
          {subject?.user && (
            <Box sx={{ display: 'flex' }}>
              <Typography variant={'body2'} color={'text.secondary'}>
                Supervisor:
              </Typography>
              &nbsp;
              <Typography variant={'body2'}>
                {subject?.user?.firstName} {subject?.user?.lastName}
              </Typography>
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: { xs: 'start', sm: 'end' } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant={'subtitle1'} color={'text.secondary'}>
            credits
          </Typography>
          <Typography variant={'h1'}>{subject?.credits}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant={'h4'} sx={{ mt: 5 }} gutterBottom>
          Study materials
        </Typography>

        {subject?.topics?.length > 0 ? (
          subject?.topics.map((topic, index) => (
            <Accordion key={`topic-${index}`}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`topic-${index}-content`}
                id={`topic-${index}-header`}>
                <Typography>{topic?.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {topic?.learningMaterials.length > 0 ? (
                  <Grid container spacing={2}>
                    {topic.learningMaterials.map((material, index) => (
                      <Grid item xs={12} md={6} key={`topic-${index}-${topic._id}`}>
                        <LearningMaterialPaper id={material} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Alert severity="info" key={`topic-${index}-${topic._id}`}>
                    This topic have not materials.
                  </Alert>
                )}
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Alert severity="info">This subject have not topics.</Alert>
        )}
      </Grid>
    </Grid>
  ) : (
    <Preloader />
  );
};

export default Subject;
