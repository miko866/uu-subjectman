'use strict';

const LearningMaterialType = require('../models/learningMaterialType-model');

const { ConflictError, ForbiddenError, NotFoundError, NoContentError } = require('../utils/errors');
const logger = require('../utils/logger');

/**
 * Create learning material type
 * @param {String} data
 * @returns {Boolean}
 */
const createLearningMaterialType = async (data) => {
  const materialTypeExists = await LearningMaterialType.exists({ name: data.name });
  if (materialTypeExists) throw new ConflictError('LearningMaterialType with this name already exists');

  const learningMaterialType = new LearningMaterialType(data);

  return await learningMaterialType
    .save()
    .then(async () => {
      return true;
    })
    .catch((error) => {
      logger.error(error);
      return false;
    });
};

/**
 * Get learning material type by id
 * @param {String} id
 * @returns {Object} learning material type
 */
const getLearningMaterialType = async (id) => {
  const learningMaterialType = await LearningMaterialType.findOne({ _id: id }).lean();

  if (!learningMaterialType) throw new NotFoundError('Learning material type was not found.');
  return learningMaterialType;
};

/**
 * Get all learning material types
 * @returns {Array[Object]} learning material types
 */
const allLearningMaterialTypes = async () => {
  const learningMaterialTypes = await LearningMaterialType.find().lean();

  if (learningMaterialTypes?.length <= 0) throw new NoContentError('No learning material type were not found.');
  return learningMaterialTypes;
};
/**
 * Update learning material type
 * @param {String} learningMaterialTypeId
 * @param {String} data
 * @returns {Boolean}
 */
const updateLearningMaterialType = async (learningMaterialTypeId, data) => {
  const learningMaterialType = await LearningMaterialType.exists({ _id: learningMaterialTypeId });
  if (!learningMaterialType) throw new NotFoundError('Learning material type was not found.');
  const update = await LearningMaterialType.findOneAndUpdate({ _id: learningMaterialTypeId }, data, { new: false });
  return update ? true : false;
};

const deleteLearningMaterialType = async (learningMaterialTypeId) => {
  const learningMaterialType = await LearningMaterialType.exists({ _id: learningMaterialTypeId });
  if (!learningMaterialType) throw new NotFoundError('Learning material type was not found.');

  if (learningMaterialType.learningMaterials.length > 0)
    throw new ForbiddenError("Topic can't be deleted due to external dependencies.");

  const response = await LearningMaterialType.deleteOne({ _id: learningMaterialTypeId });
  return response ? true : false;
};

module.exports = { createLearningMaterialType,
  getLearningMaterialType,
  allLearningMaterialTypes,
  updateLearningMaterialType,
  deleteLearningMaterialType, };
