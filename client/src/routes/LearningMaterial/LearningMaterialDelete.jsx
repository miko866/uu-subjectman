import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useResponse } from 'utils/hooks/useResponse';
import { useMounted } from 'utils/hooks/useMounted';
import { deleteLearningMaterialService } from 'api/learningMaterial/learningMaterial';

const LearningMaterialDelete = () => {
  const { id } = useParams();
  const { setResponse } = useResponse();
  const navigate = useNavigate();

  const deleteLearningMaterial = (learningMaterialId) => {
    deleteLearningMaterialService(learningMaterialId)
      .then((response) => {
        setResponse(response?.data?.message, 'success');
        navigate('/admin/learning-material/list');
      })
      .catch((error) => console.error(error));
  };

  const isMounted = useMounted;
  useEffect(() => {
    if (isMounted) deleteLearningMaterial(id);
  }, []);

  return;
};

export default LearningMaterialDelete;
