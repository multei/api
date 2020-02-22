'use strict';
const debug = require('debug')('app:lib:multer')

debug('At multer.js')

debug('Loading multer...')
const Multer = require('multer')

const multerConfig = {
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  storage: Multer.memoryStorage(),
}

debug('Configuring multer with %o', multerConfig)
const multerUpload = Multer(multerConfig);
debug('Finishing multer config...')

module.exports = multerUpload
