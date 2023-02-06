import Client from "../client/client";

export const getStudyProgram = (studyProgramId) =>
  Client({
    url: `study-program/${studyProgramId}`,
  });

export const getStudyProgramsService = () =>
  Client({
    url: `study-programs`,
  });

export const createStudyProgramService = (payload) =>
  Client({
    url: `study-program`,
    method: `POST`,
    data: payload,
  });

export const updateStudyProgramService = (id, payload) =>
  Client({
    url: `study-program/${id}`,
    method: `PATCH`,
    data: payload,
  });

  export const deleteStudyProgramService = (id) =>
    Client({
      url: `study-program/${id}`,
      method: `DELETE`,
    });
