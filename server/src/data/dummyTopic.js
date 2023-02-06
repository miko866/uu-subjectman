'use strict';

const Topic = require('../models/topic-model');

const DUMMY_TOPIC = [
  new Topic({
    name: '1. KONZULTACE',
    subjects: [],
    learningMaterials: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  new Topic({
    name: '2. KONZULTACE - PROGRAMOVÁNÍ',
    subjects: [],
    learningMaterials: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  new Topic({
    name: '3. KONZULTACE - SOFTWAROVÝ VÝVOJ',
    subjects: [],
    learningMaterials: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  new Topic({
    name: '4. KONZULTACE - PROGRAMOVÁNÍ',
    subjects: [],
    learningMaterials: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  new Topic({
    name: '5. KONZULTACE - PROGRAMOVÁNÍ',
    subjects: [],
    learningMaterials: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
];

module.exports = {
  DUMMY_TOPIC,
};
