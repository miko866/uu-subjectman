'use strict';

const User = require('../models/user-model');

const { GENDER, LANGUAGE } = require('../utils/constants');

const { DUMMY_ROLE } = require('./dummyRole');
const { DUMMY_STUDY_PROGRAM } = require('./dummyStudyProgram');

const DUMMY_USER = [
  // adminPassword
  new User({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@gmail.com',
    gender: GENDER.male,
    encrypt_password:
      '2dc1e70234e738211cfb984338a4b56aece53f8e1cc4585419e69b545c9c6b1ab7859399fde1e81c9ff34d1dba5c461fedaa573a734e054650c8ed49bd5e66ef',
    studyLanguage: null,
    dateOfBirth: '02.09.1988',
    roleId: DUMMY_ROLE[0],
    studyProgramId: null,
    subjects: [],
    salt: 'ba1c23c5-875f-4d80-ac92-fcb90e6b7150',
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  // supervisorPassword
  new User({
    firstName: 'Supervisor',
    lastName: 'User',
    email: 'supervisor@gmail.com',
    gender: GENDER.female,
    encrypt_password:
      'c58c1a4b5052cf83f73c54a5b180e29546c092b03b6521d22c26d76c40f5fcb0f82753b059f404c3f51e831dae996774f76421f24014cc1a248e5c78d07c3f00',
    studyLanguage: null,
    dateOfBirth: '02.09.1988',
    roleId: DUMMY_ROLE[1],
    studyProgramId: null,
    subjects: [],
    salt: '03c4ef17-3fef-44ca-b944-b5a1307467a5',
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  new User({
    // userPassword
    firstName: 'Simple',
    lastName: 'User',
    email: 'simpleuser@gmail.com',
    gender: GENDER.male,
    encrypt_password:
      'd8f5dbfbddf057119587f8f8b38875c030e2e49df1749e4b40e62dcf87c177e2263d31f6612acb60712cd2675f014edad0be075211639bcd24d581795a059f26',
    studyLanguage: LANGUAGE.czech,
    dateOfBirth: '02.09.1988',
    roleId: DUMMY_ROLE[2],
    studyProgramId: DUMMY_STUDY_PROGRAM[0],
    subjects: [],
    salt: '02ba3ee1-52c0-4993-845c-606f7c4de92e',
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  new User({
    // userPassword
    firstName: 'Simple2',
    lastName: 'User',
    email: 'simpleuser2@gmail.com',
    gender: GENDER.female,
    encrypt_password:
      'd8f5dbfbddf057119587f8f8b38875c030e2e49df1749e4b40e62dcf87c177e2263d31f6612acb60712cd2675f014edad0be075211639bcd24d581795a059f26',
    studyLanguage: LANGUAGE.english,
    dateOfBirth: '02.09.1988',
    roleId: DUMMY_ROLE[2],
    studyProgramId: DUMMY_STUDY_PROGRAM[1],
    subjects: [],
    salt: '02ba3ee1-52c0-4993-845c-606f7c4de92e',
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  new User({
    // Test Google Auth per Passport
    firstName: 'Michal',
    lastName: 'Durik',
    email: 'mdurik2@gmail.com',
    gender: GENDER.male,
    encrypt_password:
      '2dc1e70234e738211cfb984338a4b56aece53f8e1cc4585419e69b545c9c6b1ab7859399fde1e81c9ff34d1dba5c461fedaa573a734e054650c8ed49bd5e66ef',
    studyLanguage: null,
    dateOfBirth: '02.09.1988',
    roleId: DUMMY_ROLE[0],
    studyProgramId: null,
    subjects: [],
    salt: 'ba1c23c5-875f-4d80-ac92-fcb90e6b7150',
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  new User({
    // Waiting User
    firstName: 'Waiting',
    lastName: 'User',
    email: 'waiting@gmail.com',
    gender: GENDER.male,
    encrypt_password:
      '2dc1e70234e738211cfb984338a4b56aece53f8e1cc4585419e69b545c9c6b1ab7859399fde1e81c9ff34d1dba5c461fedaa573a734e054650c8ed49bd5e66ef',
    studyLanguage: LANGUAGE.english,
    dateOfBirth: '02.09.1988',
    roleId: DUMMY_ROLE[3],
    studyProgramId: DUMMY_STUDY_PROGRAM[0],
    subjects: [],
    salt: 'ba1c23c5-875f-4d80-ac92-fcb90e6b7150',
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
];

module.exports = {
  DUMMY_USER,
};

