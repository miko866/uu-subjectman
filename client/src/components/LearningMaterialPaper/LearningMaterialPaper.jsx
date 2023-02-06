import React, {useEffect, useState} from "react";
import { Box, Paper } from '@mui/material';

import Preloader from "../Preloader/Preloader";

import LearningMaterialContent from './LearningMaterialContent';
import LearningMaterialVideo from './LearningMaterialVideo';

import { getMaterialService } from 'api/learningMaterial/learningMaterial';
import { useMounted } from 'utils/hooks/useMounted';

const LearningMaterialPaper = ({ id }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const getMaterial = (materialId) => {
    getMaterialService(materialId)
      .then((response) => {
        setData(response?.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  const isMounted = useMounted();
  useEffect(() => {
    if (id && isMounted) {
      getMaterial(id);
    }
  }, []);

  return (
    <>
      <Paper sx={{ overflow: 'hidden' }}>
        {!loading ? (
          <Box
            onClick={() => handleClick(data?.link)}
            sx={{
              display: 'flex',
              height: '15rem',
              cursor: 'pointer',
            }}>
            {data?.learningMaterialType?.name === 'digitalContentType.videos' ? (
              <LearningMaterialVideo data={data} />
            ) : (
              <LearningMaterialContent data={data} />
            )}
          </Box>
        ) : (
          <Preloader />
        )}
      </Paper>
    </>
  );
};

export default LearningMaterialPaper;
