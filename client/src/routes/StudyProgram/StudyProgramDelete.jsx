import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteStudyProgramService } from 'api/studyProgram/studyProgram';
import { useResponse } from 'utils/hooks/useResponse';
import { useMounted } from 'utils/hooks/useMounted';

const StudyProgramDelete = () => {
  const { id } = useParams();
  const { setResponse } = useResponse();
  const navigate = useNavigate();

  const deleteStudyProgram = (topicId) => {
    deleteStudyProgramService(topicId)
      .then((response) => {
        setResponse(response?.data?.message, 'success');
        navigate('/admin/study-program/list');
      })
      .catch((error) => console.error(error));
  };

  const isMounted = useMounted;
  useEffect(() => {
    if (isMounted && id) deleteStudyProgram(id);
  }, []);

  return;
};

export default StudyProgramDelete;
