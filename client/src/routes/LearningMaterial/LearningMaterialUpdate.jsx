import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Grid, Typography } from '@mui/material';

import Preloader from 'components/Preloader/Preloader';

import { useResponse } from 'utils/hooks/useResponse';
import { useMounted } from 'utils/hooks/useMounted';
import { getMaterialService, updateLearningMaterialService } from "api/learningMaterial/learningMaterial";
import FormLearningMaterial from "components/FormLearningMaterial/FormLearningMaterial";

const LearningMaterialUpdate = () => {
  const [loading, setLoading] = useState(true);
  const [learningMaterial, setLearningMaterial] = useState({});
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const { setResponse } = useResponse();
  const navigate = useNavigate();

  const getLearningMaterial = (learningMaterialId) => {
    getMaterialService(learningMaterialId)
      .then((response) => {
        setLearningMaterial(response?.data);
      })
      .catch((error) => {
        console.error(error);
        navigate('/not-found');
      })
      .finally(() => setLoading(false));
  };

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
    updateLearningMaterialService(learningMaterialId, learningMaterialData)
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
    if (id && isMounted) {
      getLearningMaterial(id);
    }
  }, [id]);

  return !loading ? (
    <Grid container sx={{ justifyContent: 'center' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant={'h3'} gutterBottom>
          Edit learning material
        </Typography>
        <FormLearningMaterial learningMaterial={learningMaterial} onSave={onSave} errors={errors} />
      </Grid>
    </Grid>
  ) : (
    <Preloader />
  );
};

export default LearningMaterialUpdate;
