import Client from "../client/client";

export const getTopicService = (topicId) =>
  Client({
    url: `topic/${topicId}`,
  });

export const getTopicsService = () =>
  Client({
    url: `topics`,
  });

export const createTopicService = (topic) =>
  Client({
    url: `topic/create`,
    method: `POST`,
    data: topic,
  });

export const updateTopicService = (topicId, topic) =>
  Client({
    url: `topic/${topicId}`,
    method: `PATCH`,
    data: topic,
  });

export const deleteTopicService = (topicId) =>
Client({
  url: `topic/${topicId}`,
  method: `DELETE`,
});
