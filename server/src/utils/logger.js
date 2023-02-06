'use strict';

const Pino = require('pino');
const env = require('env-var');
const path = require('path');

const logger = Pino(
  env.get('NODE_ENV').required().asString() === 'development'
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
        level: 'trace',
      }
    : undefined,

  Pino.destination(path.join(__dirname, '..', 'logs', 'logs.log')),
);

module.exports = logger;
