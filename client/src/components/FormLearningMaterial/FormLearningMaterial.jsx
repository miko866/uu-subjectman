import React, { useEffect, useMemo, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  InputLabel,
  FormControl,
  MenuItem,
  TextField,
  Select,
  FormHelperText,
} from '@mui/material';

import Preloader from '../Preloader/Preloader';
import { getLearningMaterialTypesService } from 'api/learningMaterialType/learningMaterialType';
import { useMounted } from 'utils/hooks/useMounted';

import { useParams } from 'react-router-dom';

const FormLearningMaterial = ({ learningMaterial, onSave, errors }) => {
  const [name, setName] = useState(learningMaterial?.name);
  const [link, setLink] = useState(learningMaterial?.link);
  const [img, setImg] = useState(learningMaterial?.img);
  const [description, setDescription] = useState(learningMaterial?.description);
  const [learningMaterialTypeId, setLearningMaterialTypeId] = useState(learningMaterial?.learningMaterialTypeId);
  const [availableLearningMaterialTypes, setAvailableLearningMaterialTypes] = useState([]);

  const [loadingMaterialTypes, setLoadingMaterialTypes] = useState(true);

  const { id } = useParams();
  const loading = useMemo(() => loadingMaterialTypes, [loadingMaterialTypes]);

  const hasError = (field) => errors.filter((error) => error.field === field).length > 0;
  const getError = (field) => hasError(field) && errors.filter((error) => error.field === field)[0].message;

  const setAndValidate = (setter, value, field) => {
    setter(value);
  };

  const submitForm = () => {
    onSave(learningMaterial._id, {
      name,
      link,
      img,
      learningMaterialTypeId,
      description,
    });
  };

  const getLearningMaterialTypes = () => {
    getLearningMaterialTypesService()
      .then((response) => {
        setAvailableLearningMaterialTypes(response?.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingMaterialTypes(false));
  };

  const isMounted = useMounted();
  useEffect(() => {
    if (isMounted) {
      getLearningMaterialTypes();
    }
  }, []);

  return !loading ? (
    <Box component="form">
      <Divider sx={{ pt: 3 }}>Learning Material</Divider>
      <TextField
        required
        fullWidth
        id="outlined-required"
        label="Learning material name"
        value={name}
        onChange={(e) => setAndValidate(setName, e?.target?.value, 'name')}
        error={hasError('name')}
        helperText={getError('name')}
        sx={{ mt: 3 }}
      />
      <TextField
        fullWidth
        multiline
        id="outlined"
        label="Description"
        value={description}
        onChange={(e) => setAndValidate(setDescription, e?.target?.value, 'description')}
        sx={{ mt: 3 }}
        error={hasError('description')}
        helperText={getError('description')}
      />
      <TextField
        required
        fullWidth
        id="outlined-required"
        label="Link"
        value={link}
        onChange={(e) => setAndValidate(setLink, e?.target?.value, 'link')}
        error={hasError('link')}
        helperText={getError('link')}
        sx={{ mt: 3 }}
      />
      <TextField
        fullWidth
        id="outlined"
        label="Image"
        value={img}
        onChange={(e) => setAndValidate(setImg, e?.target?.value, 'img')}
        sx={{ mt: 3 }}
        error={hasError('img')}
        helperText={getError('img')}
      />
      <FormControl sx={{ mt: 3 }} fullWidth error={hasError('learningMaterialTypeId')} required>

        <InputLabel id="learning-material-type">Learning material type</InputLabel>
        <Select
          required
          labelId="learning-material-type-label-required"
          id="learning-material-type-required"
          label="Learning material type"
          value={learningMaterialTypeId}
          onChange={(e) => setLearningMaterialTypeId(e?.target?.value)}>
          {availableLearningMaterialTypes.map(({ _id, name }) => (
            <MenuItem key={_id} value={_id}>{`${name}`}</MenuItem>
          ))}
        </Select>
        {hasError('learningMaterialTypeId') && <FormHelperText>{getError('learningMaterialTypeId')}</FormHelperText>}
      </FormControl>

      <Button sx={{ mt: 5 }} size={'large'} variant={'contained'} onClick={submitForm}>
        Save learning material
      </Button>
    </Box>
  ) : (
    <Preloader />
  );
};

export default FormLearningMaterial;
