import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteTopicService } from 'api/topics/topics';
import { useResponse } from 'utils/hooks/useResponse';
import { useMounted } from 'utils/hooks/useMounted';

const TopicDelete = () => {
  const { id } = useParams();
  const { setResponse } = useResponse();
  const navigate = useNavigate();

  const deleteTopic = (topicId) => {
    deleteTopicService(topicId)
      .then((response) => {
        setResponse(response?.data?.message, 'success');
        navigate('/admin/topic/list');
      })
      .catch((error) => console.error(error));
  };

  const isMounted = useMounted;
  useEffect(() => {
    if (isMounted) deleteTopic(id);
  }, []);

  return;
};

export default TopicDelete;
