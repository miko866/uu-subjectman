'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const { GENDER, LANGUAGE } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 255,
      minlength: 2,
      trim: true,
      unique: false,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 255,
      minlength: 2,
      trim: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      maxlength: 255,
      minlength: 4,
      trim: true,
      unique: true,
    },
    encrypt_password: {
      type: String,
      required: true,
      minlength: 4,
      select: false,
    },
    gender: {
      type: String,
      enum: [GENDER.male, GENDER.female],
      required: true,
    },
    studyLanguage: {
      type: String,
      enum: [LANGUAGE.english, LANGUAGE.czech],
      required: false,
    },
    dateOfBirth: {
      type: Date,
      required: true,
      unique: false,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'roleId',
      select: true,
    },
    studyProgramId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'studyProgramId',
      select: true,
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
      },
    ],
    salt: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.virtual('role', {
  ref: 'Role',
  localField: 'roleId',
  foreignField: '_id',
  justOne: true,
});
userSchema.virtual('studyProgram', {
  ref: 'StudyProgram',
  localField: 'studyProgramId',
  foreignField: '_id',
  justOne: true,
});

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encrypt_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.set('toObject', {
  virtuals: true,
});
userSchema.set('toJSON', {
  virtuals: true,
});

userSchema.methods = {
  authenticate(plainPassword) {
    return this.securePassword(plainPassword) === this.encrypt_password;
  },

  securePassword(plainPassword) {
    if (!plainPassword) return '';

    try {
      return crypto.createHmac('sha512', this.salt).update(plainPassword).digest('hex');
    } catch (err) {
      return '';
    }
  },
};

module.exports = mongoose.model('User', userSchema, 'user');
