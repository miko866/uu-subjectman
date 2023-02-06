'use strict';

const mongoose = require('mongoose');

const learningMaterialTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 255,
      minlength: 4,
      trim: true,
    },
    color: {
      type: String,
      minlength: 7,
      maxlength: 7,
      required: true,
      trim: true,
    },
    learningMaterials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LearningMaterial',
      },
    ],
  },
  { timestamps: true },
);

learningMaterialTypeSchema.set('toObject', {
  virtuals: true,
});
learningMaterialTypeSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('LearningMaterialType', learningMaterialTypeSchema, 'learningMaterialType');
