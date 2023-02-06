'use strict';

const mongoose = require('mongoose');

const { LANGUAGE } = require('../utils/constants');

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 255,
      minlength: 4,
      trim: true,
      unique: true,
    },
    credits: {
      type: Number,
      min: 0,
      max: 12,
      required: true,
    },
    goal: {
      type: String,
      trim: true,
      required: true,
    },
    studyLanguage: {
      type: String,
      enum: [LANGUAGE.english, LANGUAGE.czech],
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'userId',
      select: true,
    },
    studyPrograms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudyProgram',
      },
    ],
    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
      },
    ],
  },
  { timestamps: true },
);

subjectSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

subjectSchema.set('toObject', {
  virtuals: true,
});
subjectSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Subject', subjectSchema, 'subject');
