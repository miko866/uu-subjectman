'use strict';

const Subject = require('../models/subject-model');

const { DUMMY_USER } = require('./dummyUser');
const { DUMMY_TOPIC } = require('./dummyTopic');

const { LANGUAGE } = require('../utils/constants');

const DUMMY_SUBJECT = [
  new Subject({
    name: 'Základy softwarového vývoje',
    credits: 12,
    goal: 'V tomto předmětu získáte ucelené znalosti softwarového vývoje a seznámíte se s různými metodami analýzy a návrhů rozsáhlejších softwarových celků.',
    studyLanguage: LANGUAGE.czech,
    description:
      'V tomto předmětu získáte ucelené znalosti softwarového vývoje a seznámíte se s různými metodami analýzy a návrhů rozsáhlejších softwarových celků.',
    userId: DUMMY_USER[1],
    studyPrograms: [],
    topics: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  new Subject({
    name: 'Cloud Application Architecture',
    credits: 12,
    goal: 'You will expand your knowledge of programming from the subject Basics of Software Development, and you will learn to develop a cloud application, including its deployment in the cloud. At the same time, you will learn the basics of creating applications for uuApp Server NodeJS.',
    studyLanguage: LANGUAGE.english,
    description:
      'You will expand your knowledge of programming from the subject Basics of Software Development, and you will learn to develop a cloud application, including its deployment in the cloud. At the same time, you will learn the basics of creating applications for uuApp Server NodeJS.',
    userId: DUMMY_USER[1],
    studyPrograms: [],
    topics: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  new Subject({
    name: 'Python Lite',
    credits: 6,
    goal: 'V rámci tohoto předmětu se seznámíte s základy programování v jazyku Python. Python představuje jeden z nejpoužívanějších jazyků v dnešní době a to nejen proto, že je velmi snadno pochopitelný ale také že má velmi široké uplatnění.',
    studyLanguage: LANGUAGE.czech,
    description:
      'V rámci tohoto předmětu se seznámíte s základy programování v jazyku Python. Python představuje jeden z nejpoužívanějších jazyků v dnešní době a to nejen proto, že je velmi snadno pochopitelný ale také že má velmi široké uplatnění.',
    userId: DUMMY_USER[1],
    studyPrograms: [],
    topics: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
];

module.exports = {
  DUMMY_SUBJECT,
};
