'use strict';

const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 500,
      minlength: 4,
      trim: true,
      unique: false,
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
      }
    ],
    learningMaterials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LearningMaterial',
      }
    ],
  },
  { timestamps: true },
);

topicSchema.set('toObject', {
  virtuals: true,
});
topicSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Topic', topicSchema, 'topic');
