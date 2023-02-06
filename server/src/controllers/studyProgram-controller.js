'use strict';

const StudyProgram = require('../models/studyProgram-model');

const { RequestValidationError, NotFoundError, NoContentError } = require('../utils/errors');
const logger = require('../utils/logger');

/**
 * Create new study program can only admins
 * @param {Object} data
 * @returns Boolean
 */
const createStudyProgram = async (data) => {
  const studyProgram = new StudyProgram(data);

  return await studyProgram
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
 * Get Study Program by ID
 * @param {String} studyProgramId
 * @returns Object
 */
const getStudyProgram = async (studyProgramId) => {
  const studyProgram = await StudyProgram.findOne({ _id: studyProgramId })
    .lean()
    .populate([{ path: 'users' }])
    .populate({
      path: 'subjects',
      populate: {
        path: 'subject',
        model: 'Subject',
        select: { name: 1, credits: 1, goal: 1, description: 1, topics: 1 },
      },
    });

  if (!studyProgram) throw new NotFoundError("Study Program doesn't exists");

  return studyProgram;
};

/**
 * Get Study program by name or by degree
 * @param {String} name
 * @param {String} degree
 * @returns Array[Object]
 */
const getSearchStudyProgramBy = async (name, degree) => {
  if (!name && !degree) throw new RequestValidationError('Name or Degree need to be defined as query!');

  let query = null;
  if (name) query = { name };
  else query = { degree };

  const studyPrograms = await StudyProgram.find(query)
    .populate([{ path: 'users' }])
    .populate({
      path: 'subjects',
      populate: {
        path: 'subject',
        model: 'Subject',
        select: { name: 1, credits: 1, goal: 1, description: 1, topics: 1 },
      },
    })
    .lean();

  if (studyPrograms?.length <= 0) throw new NoContentError('No Study Programs');
  return studyPrograms;
};

/**
 * Get list of all Study Programs
 * @returns Array[Object]
 */
const allStudyPrograms = async () => {
  const studyPrograms = await StudyProgram.find()
    .populate([{ path: 'users' }])
    .populate({
      path: 'subjects',
      populate: {
        path: 'subject',
        model: 'Subject',
        select: { name: 1, credits: 1, goal: 1, description: 1, topics: 1 },
      },
    })
    .lean();

  if (studyPrograms?.length <= 0) throw new NoContentError('No Study Programs');
  return studyPrograms;
};

/**
 * Update Study Program by ID
 * @param {String} studyProgramId
 * @param {Object} data
 * @returns Boolean
 */
const updateStudyProgram = async (studyProgramId, data) => {
  const studyProgramExists = await StudyProgram.exists({ _id: studyProgramId });
  if (!studyProgramExists) {
    throw new NotFoundError("Study Program doesn't exists");
  }

  const filter = { _id: studyProgramId };
  const update = data;
  const opts = { new: false };

  const studyProgram = await StudyProgram.findOneAndUpdate(filter, update, opts);

  if (studyProgram) return true;
  else return false;
};

/**
 * Delete Study program by ID
 * @param {String} studyProgramId
 * @returns Boolean
 */
const deleteStudyProgram = async (studyProgramId) => {
  const studyProgramExists = await StudyProgram.exists({ _id: studyProgramId });
  if (!studyProgramExists) {
    throw new NotFoundError("Study Program doesn't exists");
  }

  const response = await StudyProgram.deleteOne({ _id: studyProgramId });
  if (response) {
    return true;
  } else return false;
};

module.exports = {
  createStudyProgram,
  getStudyProgram,
  getSearchStudyProgramBy,
  allStudyPrograms,
  updateStudyProgram,
  deleteStudyProgram,
};
