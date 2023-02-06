'use strict';

const mongoose = require('mongoose');

const learningMaterialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 255,
      minlength: 4,
      trim: true,
      unique: true,
    },
    link: {
      type: String,
      trim: true,
      unique: false,
      required: true,
    },
    img: {
      type: String,
      required: false,
      maxlength: 255,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      maxlength: 255,
      trim: true,
    },
    learningMaterialTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'learningMaterialTypeId',
      select: true,
    },
    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
      },
    ],
  },
  { timestamps: true },
);

learningMaterialSchema.virtual('learningMaterialType', {
  ref: 'LearningMaterialType',
  localField: 'learningMaterialTypeId',
  foreignField: '_id',
  justOne: true,
});

learningMaterialSchema.set('toObject', {
  virtuals: true,
});
learningMaterialSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('LearningMaterial', learningMaterialSchema, 'learningMaterial');
