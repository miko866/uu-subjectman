'use strict';

const Topic = require('../models/topic-model');
const LearningMaterial = require('../models/learningMaterial-model');
const Subject = require('../models/subject-model');

const { ConflictError, NotFoundError, NoContentError, ForbiddenError } = require('../utils/errors');
const logger = require('../utils/logger');

/**
 * Only admins and supervisors can create new topic.
 * @param {Object} data
 * @returns {Boolean}
 */
const createTopic = async (data) => {

  const topicExists = await Topic.exists({ name: data.name });
  if (topicExists) throw new ConflictError('Topic with this name already exists');

  if (data?.subjects?.length > 0) {
    for (const subject of data.subjects) {
      const subjectsExists = await Subject.exists({ _id: subject });
      if (!subjectsExists) throw new NotFoundError("Subject doesn't exists");
    }
  }
  if (data?.learningMaterials?.length > 0) {
    for (const learningMaterial of data.learningMaterials) {
      const learningMaterialExists = await LearningMaterial.exists({ _id: learningMaterial });
      if (!learningMaterialExists) throw new NotFoundError("Learning Material doesn't exists");
    }
  }

  const topic = new Topic(data);

  return await topic
    .save()
    .then(async () => {
      if (data?.subjects?.length > 0) {
        for (const subject of data.subjects) {
          await Subject.findOneAndUpdate(
            { _id: subject },
            {
              $push: { topics: topic._id },
            },
          );
        }
      }

      if (data?.learningMaterials?.length > 0) {
        for (const learningMaterial of data.learningMaterials) {
          await LearningMaterial.findOneAndUpdate(
            { _id: learningMaterial._id },
            {
              $push: { topics: topic._id },
            },
          );
        }
      }

      return true;
    })
    .catch((error) => {
      logger.error(error);
      return false;
    });
};

/**
 * Get one topic by ID
 * @param {String} topicId
 * @returns {Object} topic
 */
const getTopic = async (topicId) => {
  const topic = await Topic.findOne({ _id: topicId })
  // .populate([{ path: 'subjects', model: 'Subject', select: { name: 1, credits: 1, goal: 1, description: 1, topics: 1 } }, ])
    .populate([{ path: 'subjects' }, ])
    .populate([{ path: 'learningMaterials' }])
    .lean();

  if (!topic) throw new NotFoundError("Topic doesn't exists");
  return topic;
};

/**
 * Get list of all topics
 * @returns Array[Object]
 */
const allTopics = async () => {
  const topics = await Topic.find()
    .populate([{ path: 'subjects', select: { name: 1, credits: 1, goal: 1, description: 1, topics: 1 } }])
    .populate([{ path: 'learningMaterials', select: { _id: 1 } }])
    .lean();

  if (topics?.length <= 0) throw new NoContentError('No topics');
  return topics;
};

/**
 * Update topic, only admins or supervisors can do it
 * @param {String} topicId
 * @param {Object} data
 * @returns Boolean
 */
const updateTopic = async (topicId, data) => {
  // TODO: REVISION OF TOPICS
  const topicExists = await Topic.exists({ _id: topicId });
  if (!topicExists) throw new NotFoundError("Topic doesn't exist");


  if (data?.learningMaterials?.length > 0) {
    for (const learningMaterial of data.learningMaterials) {
      const learningMaterialExists = await LearningMaterial.exists({ _id: learningMaterial });
      if (!learningMaterialExists) throw new NotFoundError("Learning Material doesn't exist");
    }
  }

  let preUpdateObjects = await Topic.findOne({ _id: topicId });
  let preUpdate = [];

  preUpdateObjects = preUpdateObjects.learningMaterials;
  if (preUpdateObjects?.length > 0)
  for (let learningMaterial of preUpdateObjects) {
    preUpdate.push(String(learningMaterial));
  }

  let toUpdate = [];

  let toUpdateObjects = data.learningMaterials;
  if (toUpdateObjects?.length > 0)
  for (let learningMaterial of toUpdateObjects) {
    toUpdate.push(String(learningMaterial));
  }

  let createBonds = toUpdate.filter((x) => !preUpdate.includes(x));
  let deleteBonds = preUpdate.filter((x) => !toUpdate.includes(x));

  if (!data?.subjects) data.subjects = [];
  if (!data?.learningMaterials) data.learningMaterials = [];

  const filter = { _id: topicId };
  const update = data;
  const opts = { new: false };
  const topic = await Topic.findOneAndUpdate(filter, update, opts);

  return await topic
    .save()
    .then(async () => {
      if (createBonds?.length > 0) {
        for (const learningMaterialId of createBonds) {
          await LearningMaterial.findOneAndUpdate(
            { _id: learningMaterialId },
            {
              $push: { topics: topicId },
            },
          );
        }
      }

      if (deleteBonds?.length > 0) {
        for (const learningMaterialId of deleteBonds) {
          await LearningMaterial.findOneAndUpdate(
            { _id: learningMaterialId },
            {
              $pull: { topics: topicId },
            },
          );
        }
      }

      return true;
    })
    .catch((error) => {
      logger.error(error);
      return false;
    });
};

/**
 * Only admins can delete everyone or the same user can delete yourself
 * @param {String} topicId
 * @returns Boolean
 */
const deleteTopic = async (topicId) => {
  const topic = await Topic.findOne({ _id: topicId }).lean();
  if (!topic) throw new NotFoundError("Topic doesn't exists");

  if (topic.subjects.length + topic.learningMaterials.length)
    throw new ForbiddenError("Topic can't be deleted due to external dependencies.");

  const response = await Topic.deleteOne({ _id: topicId });
  if (response) {
    return true;
  } else return false;
};

module.exports = {
  createTopic,
  getTopic,
  allTopics,
  updateTopic,
  deleteTopic
};
