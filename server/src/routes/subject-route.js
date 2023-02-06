'use strict';

const express = require('express');
const router = express.Router();
const { body, param, query, matchedData, check } = require('express-validator');

const { validateRequest } = require('../middleware/validate-request');
const { checkJwt } = require('../middleware/authentication');

const { LANGUAGE, SUBJECT_TYPE } = require('../utils/constants');
const { isEmptyObject, isValidMongoId } = require('../utils/helpers');
const { BadRequestError } = require('../utils/errors');

const {
  createSubject,
  getSubject,
  getSearchSubjectByName,
  allSubjects,
  updateSubject,
  deleteSubject,
} = require('../controllers/subject-controller');

router.post(
  '/subject',
  checkJwt('isAdmin'),
  body('name').not().isEmpty().isString().trim().escape().isLength({ min: 4, max: 255 }),
  body('credits').not().isEmpty().isInt({ min: 1, max: 12 }),
  body('goal').not().isEmpty().isString().trim().escape(),
  body('description').isString().trim().escape().optional({ nullable: true }),
  body('studyLanguage').not().isEmpty().isString().trim().escape().isIn([LANGUAGE.english, LANGUAGE.czech]),
  body('subjectType')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .isIn([SUBJECT_TYPE.obligatory, SUBJECT_TYPE.obligatorySelective, SUBJECT_TYPE.selective]),
  body('userId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  body('studyProgramIds.*')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  body('topics.*')
    .optional({ nullable: true })
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const bodyData = matchedData(req, { locations: ['body'] });
      if (isEmptyObject(bodyData)) throw new BadRequestError('No body');

      const response = await createSubject(bodyData);

      if (response) res.status(201).send({ message: 'Subject successfully created' });
      else res.status(400).send({ message: 'Subject cannot be created' });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/subject/:subjectId',
  checkJwt(),
  param('subjectId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { subjectId } = req.params;

      const response = await getSubject(subjectId);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/subject',
  checkJwt(),
  query('name').not().isEmpty().isString().trim().escape(),
  validateRequest,
  async (req, res, next) => {
    try {
      const name = req.query.name;

      const response = await getSearchSubjectByName(name);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/subjects', checkJwt(), validateRequest, async (req, res, next) => {
  try {
    const response = await allSubjects();

    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/subject/:subjectId',
  checkJwt('isAdminOrSupervisor'),
  param('subjectId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  body('name').optional({ nullable: true }).isString().trim().escape().isLength({ min: 4, max: 255 }),
  body('credits').optional({ nullable: true }).isInt({ min: 1, max: 12 }),
  body('goal').optional({ nullable: true }).isString().trim().escape(),
  body('description').optional({ nullable: true }).escape().optional({ nullable: true }),
  body('studyLanguage')
    .optional({ nullable: true })
    .isString()
    .trim()
    .escape()
    .isIn([LANGUAGE.english, LANGUAGE.czech]),
  body('subjectType')
    .optional({ nullable: true })
    .isString()
    .trim()
    .escape()
    .isIn([SUBJECT_TYPE.obligatory, SUBJECT_TYPE.obligatorySelective, SUBJECT_TYPE.selective]),
  body('userId')
    .optional({ nullable: true })
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  body('studyProgramIds.*')
    .optional({ nullable: true })
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  body('topics.*')
    .optional({ nullable: true })
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { subjectId } = req.params;
      const bodyData = matchedData(req, { locations: ['body'] });
      if (isEmptyObject(bodyData)) throw new BadRequestError('No body');

      const response = await updateSubject(subjectId, bodyData);

      if (response) res.status(201).send({ message: 'Subject successfully updated' });
      else res.status(400).send({ message: 'Subject cannot be updated' });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/subject/:subjectId',
  checkJwt('isAdmin'),
  param('subjectId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { subjectId } = req.params;

      const response = await deleteSubject(subjectId);

      if (response) res.status(201).send({ message: `Subject successfully deleted` });
      else res.status(400).send({ message: `Subject cannot be deleted` });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = {
  subjectRoute: router,
};
