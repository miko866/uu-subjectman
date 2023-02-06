'use strict';

const env = require('env-var');
const MongoClient = require('mongodb').MongoClient;

const { DUMMY_TOPIC } = require('../data/dummyTopic');
const { DUMMY_LEARNING_MATERIAL_TYPE } = require('../data/dummyLearningMaterialType');
const { DUMMY_LEARNING_MATERIAL } = require('../data/dummyLearningMaterial');
const { DUMMY_SUBJECT } = require('../data/dummySubject');
const { DUMMY_STUDY_PROGRAM } = require('../data/dummyStudyProgram');
const { DUMMY_ROLE } = require('../data/dummyRole');
const { DUMMY_USER } = require('../data/dummyUser');

const seederTopic = require('../services/seeder/seeder-topic');
const seederSubject = require('../services/seeder/seeder-subject');
const seederUser = require('../services/seeder/seeder-user');
const seederStudyProgram = require('../services/seeder/seeder-studyProgram');
const seederRole = require('../services/seeder/seeder-role');
const seederLearningMaterialType = require('../services/seeder/seeder-learningMaterialType');
const seederLearningMaterial = require('../services/seeder/seeder-learningMaterial');

const logger = require('../utils/logger');

const { BadRequestError } = require('../utils/errors');
const { ROLE, SUBJECT_TYPE } = require('../utils/constants');

/**
 * Seed DB with dummy data
 * Beware of the order
 */
const createDummyData = async () => {
  const mongoUri = env.get('MONGO_URI_DOCKER_SEED').required().asUrlString();
  const mongoDbName = env.get('DB_NAME').required().asString();

  const client = new MongoClient(mongoUri);
  try {
    await client.connect();

    logger.info('Connected correctly to the Database.');

    // Create Collections
    const topicCollection = client.db(mongoDbName).collection('topic');
    const learningMaterialTypeCollection = client.db(mongoDbName).collection('learningMaterialType');
    const learningMaterialCollection = client.db(mongoDbName).collection('learningMaterial');
    const subjectCollection = client.db(mongoDbName).collection('subject');
    const studyProgramCollection = client.db(mongoDbName).collection('studyProgram');
    const roleCollection = client.db(mongoDbName).collection('role');
    const userCollection = client.db(mongoDbName).collection('user');

    const collections = await client.db(mongoDbName).collections();

    // Drop Collections if exists
    if (collections.length > 0) {
      try {
        await Promise.all(
          Object.values(collections).map(async (collection) => {
            await collection.deleteMany({});
          }),
        );
      } catch (error) {
        logger.error(`Database dropping had problems: ${error}`);
        throw new BadRequestError('Database dropping had problems');
      }
    }

    // Seed DB
    await topicCollection.insertMany(DUMMY_TOPIC);
    await learningMaterialTypeCollection.insertMany(DUMMY_LEARNING_MATERIAL_TYPE);
    await learningMaterialCollection.insertMany(DUMMY_LEARNING_MATERIAL);
    await subjectCollection.insertMany(DUMMY_SUBJECT);
    await studyProgramCollection.insertMany(DUMMY_STUDY_PROGRAM);
    await roleCollection.insertMany(DUMMY_ROLE);
    await userCollection.insertMany(DUMMY_USER);

    // Updates models with relation seeders
    await seederTopic(topicCollection, DUMMY_SUBJECT, DUMMY_LEARNING_MATERIAL);
    await seederSubject(subjectCollection, DUMMY_STUDY_PROGRAM, DUMMY_TOPIC);
    await seederUser(userCollection, DUMMY_SUBJECT);
    await seederStudyProgram(studyProgramCollection, DUMMY_USER, SUBJECT_TYPE, DUMMY_SUBJECT);
    await seederRole(roleCollection, ROLE, DUMMY_USER);
    await seederLearningMaterialType(learningMaterialTypeCollection, DUMMY_LEARNING_MATERIAL);
    await seederLearningMaterial(learningMaterialCollection, DUMMY_TOPIC);

    logger.info('Database has been seeded successfully.');
  } catch (err) {
    logger.error(`Database seeding has been unsuccessful: ${err}`);
    throw new BadRequestError('Database seeding has been unsuccessful');
  }
};

module.exports = createDummyData;
