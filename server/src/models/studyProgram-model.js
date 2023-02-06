'use strict';

const mongoose = require('mongoose');

const { DEGREE, SUBJECT_TYPE } = require('../utils/constants');

const studyProgramSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      maxlength: 255,
      minlength: 4,
      trim: true,
      unique: false,
    },
    length: {
      type: Number,
      min: 2,
      max: 6,
      required: true,
    },
    degree: {
      type: String,
      enum: [DEGREE.bachelor, DEGREE.master],
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    subjects: [
      {
        subjectType: {
          type: String,
          enum: [SUBJECT_TYPE.obligatory, SUBJECT_TYPE.selective, SUBJECT_TYPE.obligatorySelective],
          required: false,
        },
        subject: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Subject',
        },
      },
    ],
  },
  { timestamps: true },
);

studyProgramSchema.set('toObject', {
  virtuals: true,
});
studyProgramSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('StudyProgram', studyProgramSchema, 'studyProgram');
