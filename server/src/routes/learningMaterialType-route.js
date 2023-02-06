'use strict';

const express = require('express');
const router = express.Router();
const { body, param, matchedData } = require('express-validator');

const { validateRequest } = require('../middleware/validate-request');
const { checkJwt } = require('../middleware/authentication');

const { isEmptyObject, isValidMongoId, hexColorChecker } = require('../utils/helpers');
const { BadRequestError } = require('../utils/errors');

const {
  createLearningMaterialType,
  getLearningMaterialType,
  allLearningMaterialTypes,
  updateLearningMaterialType,
  deleteLearningMaterialType,
} = require('../controllers/learningMaterialType-controller');

router.post(
  '/learning-material-type',
  checkJwt('isAdminOrSupervisor'),
  body('name').not().isEmpty().isString().trim().escape().isLength({ min: 4, max: 255 }),
  body('color').not().isEmpty().isString().trim().escape().isLength({ min: 7, max: 7 }),
  validateRequest,
  async (req, res, next) => {
    try {
      if (!hexColorChecker(req.body.color)) throw new BadRequestError('Wrong hex color value!');
      const bodyData = matchedData(req, { locations: ['body'] });
      if (isEmptyObject(bodyData)) throw new BadRequestError('No body');
      const response = await createLearningMaterialType(bodyData);

      if (response) res.status(201).send({ message: 'Learning material type was successfully created.' });
      else res.status(400).send({ message: 'Learning material type was not created.' });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/learning-material-type/:learningMaterialTypeId',
  checkJwt('isAdminOrSupervisor'),
  param('learningMaterialTypeId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { learningMaterialTypeId } = req.params;
      const response = await getLearningMaterialType(learningMaterialTypeId);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/learning-material-types', checkJwt('isAdminOrSupervisor'), validateRequest, async (req, res, next) => {
  try {
    const response = await allLearningMaterialTypes();
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/learning-material-type/:learningMaterialTypeId',
  checkJwt('isAdminOrSupervisor'),
  param('learningMaterialTypeId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  body('name').isString().trim().escape().isLength({ min: 4, max: 255 }).optional({ nullable: true }),
  body('color').isString().trim().escape().isLength({ min: 7, max: 7 }).optional({ nullable: true }),
  validateRequest,
  async (req, res, next) => {
    try {
      if (req.body?.color && !hexColorChecker(req.body.color)) throw new BadRequestError('Wrong hex color value!');
      const { learningMaterialTypeId } = req.params;
      const bodyData = matchedData(req, { locations: ['body'] });
      if (isEmptyObject(bodyData)) throw new BadRequestError('No body');

      const response = await updateLearningMaterialType(learningMaterialTypeId, bodyData);

      if (response) res.status(201).send({ message: 'Learning material type was successfully updated.' });
      else res.status(400).send({ message: 'Learning material type was not updated.' });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/learning-material-type/:learningMaterialTypeId',
  checkJwt('isAdminOrSupervisor'),
  param('learningMaterialTypeId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { learningMaterialTypeId } = req.params;
      const response = await deleteLearningMaterialType(learningMaterialTypeId);

      if (response) res.status(201).send({ message: 'Learning material type was successfully deleted.' });
      else res.status(400).send({ message: 'Learning material type was not deleted.' });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = {
  learningMaterialTypeRoute: router,
};
