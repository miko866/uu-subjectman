'use strict';

const LearningMaterial = require('../models/learningMaterial-model');
const LearningMaterialType = require('../models/learningMaterialType-model');

const { NotFoundError, NoContentError } = require('../utils/errors');
const logger = require('../utils/logger');

/**
 * Create learning material
 * @param {String} data
 * @returns {Boolean}
 */
const createLearningMaterial = async (data) => {
  const learningMaterial = new LearningMaterial(data);
  const learningMaterialType = await LearningMaterialType.exists({ _id: data.learningMaterialTypeId });
  if (!learningMaterialType) throw new NotFoundError('Learning material type was not found.');

  return await learningMaterial
    .save()
    .then(async () => {
      await LearningMaterialType.findOneAndUpdate(
        { _id: learningMaterialType },
        {
          $push: {
            learningMaterials: learningMaterial._id,
          },
        },
      );
      return true;
    })
    .catch((error) => {
      logger.error(error);
      return false;
    });
};

/**
 * Get learning material by id
 * @param {String} id
 * @returns {Object } learning material
 */
const getLearningMaterial = async (id) => {
  const learningMaterial = await LearningMaterial.findOne({ _id: id }).populate({path: 'learningMaterialType'}).lean();
  if (!learningMaterial) throw new NotFoundError('Learning material was not found.');
  return learningMaterial;
};

/**
 * Get all learning materials
 * @returns {Array[Object]} learning materials
 */
const allLearningMaterial = async () => {
  const learningMaterials = await LearningMaterial.find().lean();

  if (learningMaterials?.length <= 0) throw new NoContentError('No learning materials were not found.');
  return learningMaterials;
};

/**
 * Update learning material
 * @param {String} learningMaterialTypeId
 * @param {String} data
 * @returns {Boolean}
 */
const updateLearningMaterial = async (learningMaterialId, data) => {
  const learningMaterial = await LearningMaterial.exists({ _id: learningMaterialId });
  if (!learningMaterial) throw new NotFoundError('Learning material was not found.');

  if (data?.learningMaterialTypeId) {
    const learningMaterialType = await LearningMaterialType.exists({ _id: data.learningMaterialTypeId });

    if (!learningMaterialType) throw new NotFoundError('Learning material type was not found.');

    await LearningMaterialType.findOneAndUpdate(
      { _id: learningMaterial.learningMaterialTypeId },
      {
        $pull: {
          learningMaterials: learningMaterial._id,
        },
      },
    );
    await LearningMaterialType.findOneAndUpdate(
      { _id: learningMaterialType },
      {
        $push: {
          learningMaterials: learningMaterial._id,
        },
      },
    );
  }

  const update = await LearningMaterial.findOneAndUpdate({ _id: learningMaterialId }, data, { new: false });
  return update ? true : false;
};

const deleteLearningMaterial = async (learningMaterialId) => {
  const learningMaterial = await LearningMaterial.exists({ _id: learningMaterialId });
  if (!learningMaterial) throw new NotFoundError("Learning material was not found.");

    await LearningMaterialType.findOneAndUpdate(
      { _id: learningMaterial.learningMaterialTypeId },
      {
        $pull: {
          learningMaterials: learningMaterial._id,
        },
      },
    );
  const response = await LearningMaterial.deleteOne({ _id: learningMaterialId });
  return response ? true : false;
};

module.exports = {
  createLearningMaterial,
  getLearningMaterial,
  allLearningMaterial,
  updateLearningMaterial,
  deleteLearningMaterial,
};
