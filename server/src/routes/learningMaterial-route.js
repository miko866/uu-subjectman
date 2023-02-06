'use strict';

const express = require('express');
const router = express.Router();
const { body, param, matchedData } = require('express-validator');

const { validateRequest } = require('../middleware/validate-request');
const { checkJwt } = require('../middleware/authentication');

const { isEmptyObject, isValidMongoId } = require('../utils/helpers');
const { BadRequestError } = require('../utils/errors');

const {
  createLearningMaterial,
  getLearningMaterial,
  allLearningMaterial,
  updateLearningMaterial,
  deleteLearningMaterial,
} = require('../controllers/learningMaterial-controller');

router.post(
  '/learning-material',
  checkJwt('isAdminOrSupervisor'),
  body('name').not().isEmpty().isString().trim().escape().isLength({ min: 4, max: 255 }),
  body('link').not().isEmpty().isString().trim().isURL().isLength({ max: 255 }),
  body('img').isString().trim().isLength({ max: 255 }).optional({ nullable: true }),
  body('description').isString().trim().isLength({ max: 255 }).optional({ nullable: true }),
  body('learningMaterialTypeId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const bodyData = matchedData(req, { locations: ['body'] });
      if (isEmptyObject(bodyData)) throw new BadRequestError('No body');
      const response = await createLearningMaterial(bodyData);

      if (response) res.status(201).send({ message: 'Learning material was successfully created.' });
      else res.status(400).send({ message: 'Learning material was not created.' });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/learning-material/:learningMaterialId',
  checkJwt(),
  param('learningMaterialId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { learningMaterialId } = req.params;
      const response = await getLearningMaterial(learningMaterialId);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/learning-materials', checkJwt('isAdminOrSupervisor'), validateRequest, async (req, res, next) => {
  try {
    const response = await allLearningMaterial();
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/learning-material/:learningMaterialId',
  checkJwt('isAdminOrSupervisor'),
  param('learningMaterialId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  body('name').isString().trim().escape().isLength({ min: 4, max: 255 }).optional({ nullable: true }),
  body('link').isString().trim().isLength({ max: 255 }).isURL().optional({ nullable: true }),
  body('img').isString().trim().isLength({ max: 255 }).optional({ nullable: true }),
  body('description').isString().trim().isLength({ max: 255 }).optional({ nullable: true }),
  body('learningMaterialTypeId')
    .isString()
    .trim()
    .escape()
    .optional({ nullable: true })
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { learningMaterialId } = req.params;
      const bodyData = matchedData(req, { locations: ['body'] });
      if (isEmptyObject(bodyData)) throw new BadRequestError('No body');

      const response = await updateLearningMaterial(learningMaterialId, bodyData);

      if (response) res.status(201).send({ message: 'Learning material was successfully updated.' });
      else res.status(400).send({ message: 'Learning material was not updated.' });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/learning-material/:learningMaterialId',
  checkJwt('isAdminOrSupervisor'),
  param('learningMaterialId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { learningMaterialId } = req.params;

      const response = await deleteLearningMaterial(learningMaterialId);

      if (response) res.status(201).send({ message: 'Learning material was successfully deleted.' });
      else res.status(400).send({ message: 'Learning material was not deleted.' });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = {
  learningMaterialRoute: router,
};
