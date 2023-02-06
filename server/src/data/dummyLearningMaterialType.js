'use strict';

const LearningMaterialType = require('../models/learningMaterialType-model');

const DUMMY_LEARNING_MATERIAL_TYPE = [
  new LearningMaterialType({
    name: 'Books',
    color: '#0000FF',
    learningMaterials: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  new LearningMaterialType({
    name: 'Courses',
    color: '#FF0000',
    learningMaterials: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  new LearningMaterialType({
    name: 'Videos',
    color: '#00FF00',
    learningMaterials: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
];
module.exports = {
  DUMMY_LEARNING_MATERIAL_TYPE,
};
