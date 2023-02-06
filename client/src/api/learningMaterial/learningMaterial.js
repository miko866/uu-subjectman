import Client from "../client/client";

export const getMaterialService = (materialId) =>
  Client({
    url: `learning-material/${materialId}`,
  });

export const getMaterialsService = () =>
  Client({
    url: `learning-materials`,
  });

export const createLearningMaterialService = (learningMaterial) =>
  Client({
    url: `learning-material`,
    method: `POST`,
    data: learningMaterial,
  });

export const updateLearningMaterialService = (learningMaterialId, learningMaterial) =>
  Client({
    url: `learning-material/${learningMaterialId}`,
    method: `PATCH`,
    data: learningMaterial,
  });

  export const deleteLearningMaterialService = (learningMaterialId) =>
  Client({
    url: `learning-material/${learningMaterialId}`,
    method: `DELETE`,
  });
