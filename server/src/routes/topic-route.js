'use strict';

const express = require('express');
const router = express.Router();
const { body, param, matchedData, check } = require('express-validator');

const { validateRequest } = require('../middleware/validate-request');
const { checkJwt } = require('../middleware/authentication');

const { isEmptyObject, isValidMongoId } = require('../utils/helpers');
const { BadRequestError } = require('../utils/errors');

const { createTopic, getTopic, allTopics, updateTopic, deleteTopic } = require('../controllers/topic-controller');

router.post(
  '/topic/create',
  checkJwt('isAdminOrSupervisor'),
  body('name').not().isEmpty().isString().trim().escape().isLength({ min: 4, max: 255 }),
  check('learningMaterials.*')
    .optional({ nullable: true })
    .trim()
    .escape()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
    check('subjects.*')
    .optional({ nullable: true })
    .trim()
    .escape()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const bodyData = matchedData(req, { locations: ['body'] });
      if (isEmptyObject(bodyData)) throw new BadRequestError('No body');

      const response = await createTopic(bodyData);

      if (response) res.status(201).send({ message: 'Topic successfully created' });
      else res.status(400).send({ message: 'Topic cannot be created' });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/topic/:topicId',
  checkJwt('isAdminOrSupervisor'),
  param('topicId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { topicId } = req.params;

      const response = await getTopic(topicId);
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/topics', checkJwt('isAdminOrSupervisor'), async (req, res, next) => {
  try {
    const response = await allTopics();

    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/topic/:topicId',
  checkJwt('isAdminOrSupervisor'),
  param('topicId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  body('name').not().isEmpty().isString().trim().escape().isLength({ min: 4, max: 255 }),
  check('learningMaterials.*')
    .optional({ nullable: true })
    .trim()
    .escape()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  check('subjects.*')
    .optional({ nullable: true })
    .trim()
    .escape()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { topicId } = req.params;
      const bodyData = matchedData(req, { locations: ['body'] });
      if (isEmptyObject(bodyData)) throw new BadRequestError('No body');
      const response = await updateTopic(topicId, bodyData);

      if (response) res.status(201).send({ message: 'Topic successfully updated' });
      else res.status(400).send({ message: 'Topic cannot be updated' });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/topic/:topicId',
  checkJwt('isAdminOrSupervisor'),
  param('topicId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { topicId } = req.params;

      const response = await deleteTopic(topicId);
      if (response) res.status(201).send({ message: `Topic successfully deleted` });
      else res.status(400).send({ message: `Topic cannot be deleted` });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = {
  topicRoute: router,
};
