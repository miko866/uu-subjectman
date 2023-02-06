import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography, TextField } from '@mui/material';
import moment from 'moment';

import CrudListTable from 'components/CrudListTable/CrudListTable';
import { getMaterialsService } from 'api/learningMaterial/learningMaterial';
import { useMounted } from 'utils/hooks/useMounted';

const cols = [
  {
    label: 'Name',
    key: 'name',
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

const LearningMaterialList = () => {
  const [loading, setLoading] = useState(true);
  const [learningMaterials, setLearningMaterials] = useState([]);
  const navigate = useNavigate();

  const prepareData = (learningMaterials) =>
  learningMaterials.map(({ _id, name, updatedAt, createdAt }) => ({

      name: (
        <Typography>
          {name}
        </Typography>
      ),
      updatedAt: moment(updatedAt).format('LLL'),
      createdAt: moment(createdAt).format('LLL'),
      actions: [
        {
          key: 'edit',
          link: `/admin/learning-material/edit/${_id}`,
        },
        {
          key: 'delete',
          link: `/admin/learning-material/delete/${_id}`,
        },
      ],
    }));

  const getLearningMaterials = () => {
    getMaterialsService()
      .then((response) => {
        setLearningMaterials(prepareData(response.data));
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const isMounted = useMounted();
  useEffect(() => {
    if (isMounted) getLearningMaterials();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant={'h3'} sx={{ flexGrow: 1 }}>
              Learning materials
            </Typography>

            <Button variant={'contained'} sx={{ ml: 2 }} onClick={() => navigate('/admin/learning-material/create')}>
              Create learning material
            </Button>
          </Box>

          <CrudListTable rows={learningMaterials} cols={cols} loading={loading} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LearningMaterialList;
