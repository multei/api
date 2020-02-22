'use strict';
const debug = require('debug')('app:lib:multer')

debug('At multer.js')

debug('Loading multer...')
const Multer = require('multer')

const multerConfig = {
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
}

debug('Configuring multer with %o', multerConfig)
const multer = Multer(multerConfig);
debug('Finishing multer config...')

module.exports = multer
