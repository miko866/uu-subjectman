'use strict';

const User = require('../models/user-model');
const StudyProgram = require('../models/studyProgram-model');
const Topic = require('../models/topic-model');
const Subject = require('../models/subject-model');

const { getUser } = require('./user-controller');

const { studyProgramIsIn } = require('../services/subject-service');

const { ConflictError, NotFoundError, NoContentError, RequestValidationError } = require('../utils/errors');
const { ROLE } = require('../utils/constants');
const logger = require('../utils/logger');
const { checkAllTrue } = require('../utils/helpers');

/**
 * Create new subject can only admins
 * @param {Object} data
 * @returns Boolean
 */
const createSubject = async (data) => {
  const subjectExists = await Subject.exists({ name: data.name });
  if (subjectExists) throw new RequestValidationError([{msg: 'Subject exists', param: 'name'}]);

  const user = await getUser(data.userId);
  if (!user && user.role.name !== ROLE.supervisor) throw new NotFoundError();

  const studyProgramExists = await StudyProgram.find({ _id : { $in : data.studyProgramIds } });
  if (studyProgramExists?.length < data?.studyProgramIds?.length) {
    throw new NotFoundError("Study Program doesn't exists");
  }

  if(typeof data.studyProgramIds === 'undefined')
    throw new RequestValidationError([{msg: "Please select Study Program!", param: 'studyProgramIds'}]);

  const topicsIds = data?.topics ? data?.topics : [];
  const topicExists = Promise.all(
    topicsIds.map(async (topic) => {
      const response = await Topic.exists({ _id: topic });
      if (!response) return false;
      return true;
    }),
  );
  const topicExistsResponse = await topicExists;
  if (!checkAllTrue(topicExistsResponse)) throw new NotFoundError("Topic doesn't exists");

  const oldData = { ...data };

  delete data.subjectType;
  delete data.studyProgramIds;

  const subject = new Subject(data);

  return await subject
    .save()
    .then(async (response) => {
      await Subject.findOneAndUpdate(
        { _id: response._id },
        {
          $push: { studyPrograms: oldData.studyProgramIds },
        },
      );

      if (oldData?.topics?.length > 0) {
        oldData.topics.forEach(async (topic) => {
          await Topic.findOneAndUpdate(
            { _id: topic },
            {
              $push: {
                subjects: response._id,
              },
            },
          );
        });
      }

      await User.findOneAndUpdate(
        { _id: data.userId },
        {
          $push: {
            subjects: response._id,
          },
        },
      );
      
      await StudyProgram.updateMany(
        { _id : { $in : oldData.studyProgramIds } },
        {
          $push: {
            subjects: [
              {
                subjectType: oldData.subjectType,
                subject: response._id,
              },
            ],
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

const getSubject = async (subjectId) => {
  const subject = await Subject.findOne({ _id: subjectId })
    .lean()
    .populate([{ path: 'user' }])
    .populate([{ path: 'studyPrograms' }])
    .populate([{ path: 'topics' }]);

  if (!subject) throw new NotFoundError("Subject doesn't exists");

  return subject;
};

/**
 * Get one Subject by name
 * @param {String} name
 * @returns Object
 */
const getSearchSubjectByName = async (name) => {
  const subject = await Subject.findOne({ name });

  if (!subject) throw new NotFoundError("Subject with current name doesn't exists");
  return subject;
};

/**
 * Get list of all Subjects
 * @returns Array[Object]
 */
const allSubjects = async () => {
  const subjects = await Subject.find()
    .populate([{ path: 'user' }])
    .populate([{ path: 'studyPrograms' }])
    .populate([{ path: 'topics' }])
    .lean();

  if (subjects?.length <= 0) throw new NoContentError('No subjects');
  return subjects;
};

/**
 * Update Subject by ID
 * @param {string} subjectId
 * @param {Object} data
 * @returns Boolean
 */
const updateSubject = async (subjectId, data) => {
  const checkSubject = await Subject.findOne({ _id: subjectId }).lean();
  if (!checkSubject) throw new NotFoundError("Subject doesn't exists");

  // If user is not null and it not the same, update subject with new user
  if (data.userId && checkSubject.userId !== data.userId) {
    const userExists = await User.exists({ _id: data.userId });
    if (!userExists) {
      throw new NotFoundError("User doesn't exists");
    }

    await Subject.findOneAndUpdate(
      { _id: data.subjectId },
      {
        user: data.userId,
      },
    );

    await User.findOneAndUpdate(
      { _id: checkSubject.userId },
      {
        $pull: {
          subjects: checkSubject._id,
        },
      },
    );
    await User.findOneAndUpdate(
      { _id: data.userId },
      {
        $push: {
          subjects: checkSubject._id,
        },
      },
    );
  }

  if (data?.topics?.length > 0) {
    await Subject.findOneAndUpdate(
      { _id: data.subjectId },
      {
        $pull: {
          topics: checkSubject.topics,
        },
      },
    );

    checkSubject?.topics?.forEach(async (topic) => {
      await Topic.findOneAndUpdate(
        { _id: topic },
        {
          $pull: {
            subjects: data.subjectId,
          },
        },
      );
    });

    data.topics.forEach(async (topic) => {
      await Topic.findOneAndUpdate(
        { _id: topic },
        {
          $push: {
            subjects: data.subjectId,
          },
        },
      );
    });
  }

  if(typeof checkSubject.studyPrograms !== 'undefined' && typeof data.studyProgramIds === 'undefined')
    throw new RequestValidationError([{msg: "Please select Study Program!", param: 'studyProgramIds'}]);

  if (data.studyProgramIds && data.subjectType) {
    const studyProgramExists = await StudyProgram.find({ _id : { $in : data.studyProgramIds } });
    if (studyProgramExists?.length < data.studyProgramIds.length) {
      throw new NotFoundError("Study Program doesn't exists");
    }

    checkSubject?.studyPrograms?.forEach(async (program) => {
      await Subject.findOneAndUpdate(
        { _id: subjectId },
        {
          $pull: {
            studyPrograms: program.toString(),
          },
        },
      );
    });

    await Subject.findOneAndUpdate(
      { _id: subjectId },
      {
        $push: {
          studyPrograms: data.studyProgramIds,
        },
      },
    );

    await StudyProgram.updateMany(
      { _id : { $in : checkSubject.studyPrograms } },
      {
        $pull: {
          subjects: { subject: checkSubject._id },
        },
      },
    );

    await StudyProgram.updateMany(
      { _id : { $in : data.studyProgramIds } },
      {
        $push: {
          subjects: [
            {
              subjectType: data.subjectType,
              subject: checkSubject._id,
            },
          ],
        },
      },
    );
  }

  delete data.studyProgramIds;
  delete data.subjectType;
  delete data.userId;

  const filter = { _id: subjectId };
  const update = data;
  const opts = { new: false };

  const subject = await Subject.findOneAndUpdate(filter, update, opts);

  if (subject) return true;
  else return false;
};

/**
 * Delete Subject with Cascade
 * @param {String} subjectId
 * @returns Boolean
 */
const deleteSubject = async (subjectId) => {
  const subject = await Subject.findOne({ _id: subjectId });
  if (!subject) throw new NotFoundError("Subject doesn't exists");

  const response = await Subject.deleteOne({ _id: subjectId });
  if (response) {
    await User.findOneAndUpdate(
      { _id: subject.userId },
      {
        $pull: { subjects: subjectId },
      },
    );

    subject.studyPrograms.forEach(async (program) => {
      await StudyProgram.findOneAndUpdate(
        { _id: program },
        {
          $pull: {
            subjects: subjectId,
          },
        },
      );
    });

    subject.topics.forEach(async (topic) => {
      await Topic.findOneAndUpdate(
        { _id: topic },
        {
          $pull: {
            subjects: subjectId,
          },
        },
      );
    });

    return true;
  } else return false;
};

module.exports = { createSubject, getSubject, getSearchSubjectByName, allSubjects, updateSubject, deleteSubject };
