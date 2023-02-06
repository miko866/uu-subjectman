import Client from "../client/client";

export const getLearningMaterialTypesService = () =>
  Client({
    url: `learning-material-types`,
  });

