import Client from "../client/client";

export const getSubjectService = (subjectId) =>
  Client({
    url: `subject/${subjectId}`,
  });

export const getSubjectsService = () =>
  Client({
    url: `subjects`,
  });

export const createSubjectService = (subject) =>
  Client({
    url: `subject`,
    method: `POST`,
    data: subject,
  });

export const updateSubjectService = (subjectId, subject) =>
  Client({
    url: `subject/${subjectId}`,
    method: `PATCH`,
    data: subject,
  });

