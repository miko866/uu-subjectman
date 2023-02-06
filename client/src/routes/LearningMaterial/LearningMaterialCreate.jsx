import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { Grid, Typography } from '@mui/material';

import FormLearningMaterial from 'components/FormLearningMaterial/FormLearningMaterial';
import Preloader from 'components/Preloader/Preloader';

import { useResponse } from 'utils/hooks/useResponse';
import { useMounted } from 'utils/hooks/useMounted';
import { createLearningMaterialService } from 'api/learningMaterial/learningMaterial';

const LearningMaterialCreate = () => {
  const [loading, setLoading] = useState(true);
  const [learningMaterial, setLearningMaterial] = useState({
    name: '',
    link: '',
    img: '',
    learningMaterialTypeId: '',
    description: '',
  });
  const [errors, setErrors] = useState([]);
  const { setResponse } = useResponse();
  const navigate = useNavigate();

  const onSave = (learningMaterialId, learningMaterial) => {
    setErrors([]);
    setLoading(true);
    let learningMaterialData = {
      name: learningMaterial?.name,
      link: learningMaterial?.link,
      img: learningMaterial?.img,
      learningMaterialTypeId: learningMaterial?.learningMaterialTypeId,
      description: learningMaterial?.description,
    }

    createLearningMaterialService(learningMaterialData)
      .then((response) => {
        setResponse(response?.data?.message, 'success');
        navigate('/admin/learning-material/list');
      })
      .catch((error) => {
        setResponse("Form contains Error!", 'error');
        setLearningMaterial(learningMaterial)
        setErrors(error?.response?.data);
      })
      .finally(() => setLoading(false));
  };

  const isMounted = useMounted();
  useEffect(() => {
    if (isMounted) setLoading(false);
  }, []);

  return !loading ? (
    <Grid container sx={{ justifyContent: 'center' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant={'h3'} gutterBottom>
          Create learning material
        </Typography>
        <FormLearningMaterial learningMaterial={learningMaterial} onSave={onSave} errors={errors} />
      </Grid>
    </Grid>
  ) : (
    <Preloader />
  );
};

export default LearningMaterialCreate;
