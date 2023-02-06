'use strict';

const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    route: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    data: {
      type: String,
    },
    error: {
      type: String,
    },
  },
  { timestamps: true },
);

auditLogSchema.set('toObject', {
  virtuals: true,
});
auditLogSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('AuditLog', auditLogSchema, 'auditLog');
