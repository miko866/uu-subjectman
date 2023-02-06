'use strict';

const StudyProgram = require('../models/studyProgram-model');
const { DEGREE } = require('../utils/constants');

const DUMMY_STUDY_PROGRAM = [
  new StudyProgram({
    name: 'Software Development',
    length: 3,
    degree: DEGREE.bachelor,
    users: [],
    subjects: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  new StudyProgram({
    name: 'Business Management',
    length: 3,
    degree: DEGREE.bachelor,
    users: [],
    subjects: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  new StudyProgram({
    name: 'Software Engineering And BigData',
    length: 2,
    degree: DEGREE.master,
    users: [],
    subjects: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  new StudyProgram({
    name: 'Applied Economics And Data Analysis',
    length: 2,
    degree: DEGREE.master,
    users: [],
    subjects: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
];

module.exports = {
  DUMMY_STUDY_PROGRAM,
};
