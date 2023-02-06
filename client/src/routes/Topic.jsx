import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Alert, AccordionSummary, AccordionDetails, Accordion, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Preloader from 'components/Preloader/Preloader';
import LearningMaterialPaper from 'components/LearningMaterialPaper/LearningMaterialPaper';
import { getTopicService } from 'api/topics/topics';
import { useMounted } from 'utils/hooks/useMounted';

const Topic = () => {
  const [topic, setTopic] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
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

  const isMounted = useMounted();
  useEffect(() => {
    if (isMounted) getTopic(id);
  }, []);

  return !loading ? (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Typography variant={'h3'} gutterBottom>
          {topic?.name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant={'h4'} sx={{ mt: 5 }} gutterBottom>
          Study materials
        </Typography>

        {topic?.subjects?.length > 0 ? (
          topic?.subjects.map((subject, index) => (
            <Accordion key={`subject-${index}`}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`subject-${index}-content`}
                id={`subject-${index}-header`}>
                <Typography>{subject?.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {topic?.learningMaterials.length > 0 ? (
                  <Grid container spacing={2}>
                    {topic.learningMaterials.map((material, index) => (
                      <Grid item xs={12} md={6} key={`topic-${index}-${topic._id}`}>
                        <LearningMaterialPaper id={material._id} />
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
          <Alert severity="info">This topic is not included in any subject.</Alert>
        )}
      </Grid>
    </Grid>
  ) : (
    <Preloader />
  );
};

export default Topic;
