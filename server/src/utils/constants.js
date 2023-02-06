'use strict';

const AUTH_MODE = {
  isAdmin: 'isAdmin',
  isAdminOrSupervisor: 'isAdminOrSupervisor',
  isOwnerOrAdmin: 'isOwnerOrAdmin',
  getCurrentUser: 'getCurrentUser',
  isAllowed: 'isAllowed',
};

const DEGREE = {
  bachelor: 'Bc',
  master: 'MSc',
};

const GENDER = {
  male: 'male',
  female: 'female',
};

const LANGUAGE = {
  english: 'en',
  czech: 'cz',
};

const ROLE = {
  admin: 'admin',
  supervisor: 'supervisor',
  user: 'user',
  waiting: 'waiting',
};

const SUBJECT_TYPE = {
  obligatory: 'obligatory',
  selective: 'selective',
  obligatorySelective: 'obligatory-selective',
};

module.exports = {
  AUTH_MODE,
  DEGREE,
  GENDER,
  LANGUAGE,
  ROLE,
  SUBJECT_TYPE,
};
