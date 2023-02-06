'use strict';

const express = require('express');
const router = express.Router();
const { body, param, matchedData, query } = require('express-validator');

const { validateRequest } = require('../middleware/validate-request');
const { checkJwt } = require('../middleware/authentication');

const { DEGREE } = require('../utils/constants');
const { isEmptyObject, isValidMongoId } = require('../utils/helpers');
const { BadRequestError } = require('../utils/errors');

const {
  createStudyProgram,
  getStudyProgram,
  getSearchStudyProgramBy,
  allStudyPrograms,
  updateStudyProgram,
  deleteStudyProgram,
} = require('../controllers/studyProgram-controller');

router.post(
  '/study-program',
  checkJwt('isAdmin'),
  body('name').not().isEmpty().isString().trim().escape().isLength({ min: 4, max: 255 }),
  body('length').not().isEmpty().isInt({ min: 2, max: 6 }),
  body('degree').not().isEmpty().isString().trim().escape().isIn([DEGREE.bachelor, DEGREE.master]),
  validateRequest,
  async (req, res, next) => {
    try {
      const bodyData = matchedData(req, { locations: ['body'] });
      if (isEmptyObject(bodyData)) throw new BadRequestError('No body');
      const response = await createStudyProgram(bodyData);

      if (response) res.status(201).send({ message: 'Study program successfully created' });
      else res.status(400).send({ message: 'Study program cannot be created' });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/study-program/:studyProgramId',
  checkJwt(),
  param('studyProgramId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { studyProgramId } = req.params;

      const response = await getStudyProgram(studyProgramId);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/study-program',
  checkJwt('isAdmin'),
  query('name').isString().trim().escape().optional({ nullable: true }),
  query('degree')
    .isString()
    .trim()
    .escape()
    .optional({ nullable: true, checkFalsy: true })
    .isIn([DEGREE.bachelor, DEGREE.master]),
  validateRequest,
  async (req, res, next) => {
    try {
      const { name, degree } = req.query;

      const response = await getSearchStudyProgramBy(name, degree);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/study-programs', async (req, res, next) => {
  try {
    const { waiting } = req.query;
    const response = await allStudyPrograms(waiting);

    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/study-program/:studyProgramId',
  checkJwt('isAdmin'),
  param('studyProgramId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  body('length').optional({ nullable: true }).isInt({ min: 2, max: 6 }),
  body('degree').optional({ nullable: true }).isString().trim().escape().isIn([DEGREE.bachelor, DEGREE.master]),
  body('name').isString().trim().escape().isLength({ min: 4, max: 255 }).optional({ nullable: true }),
  validateRequest,
  async (req, res, next) => {
    try {
      const { studyProgramId } = req.params;
      const bodyData = matchedData(req, { locations: ['body'] });
      if (isEmptyObject(bodyData)) throw new BadRequestError('No body');

      const response = await updateStudyProgram(studyProgramId, bodyData);

      if (response) res.status(201).send({ message: 'Study Program successfully updated' });
      else res.status(400).send({ message: 'Study Program cannot be updated' });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/study-program/:studyProgramId',
  checkJwt('isAdmin'),
  param('studyProgramId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { studyProgramId } = req.params;

      const response = await deleteStudyProgram(studyProgramId);

      if (response) res.status(201).send({ message: `Study Program successfully deleted` });
      else res.status(400).send({ message: `Study Program cannot be deleted` });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = {
  studyProgramRoute: router,
};
