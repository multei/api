'use strict';
const debug = require('debug')('app:lib:gcs')

debug('At googleCloudStorage.js')

const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT
debug('Google Cloud project is %o', GOOGLE_CLOUD_PROJECT)

/**
 * Bucket name
 *
 * @type {string}
 */
const CLOUD_BUCKET = process.env.CLOUD_BUCKET
debug('Google Cloud bucket is %o', CLOUD_BUCKET)

/**
 * Imports the Google Cloud client library
 */
const { Storage } = require('@google-cloud/storage')

/**
 * Creates a client
 * @type {Storage}
 */
const storage = new Storage()

const bucket = storage.bucket(CLOUD_BUCKET)

function getPublicUrl(filename) {
  debug(`Getting public URL for ${filename}`)
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

/**
 * Upload a file to the bucket
 *
 * @param req
 * @param res
 * @param next
 * @return {*}
 */
function sendUploadedFileToGCS(req, res, next) {

  debug(`Sending upload to Google Cloud Storage...`)
  if(!req.file) {
    debug('Request file does not exist: %o', req.file)
    return next()
  }

  const originalName = req.file.originalname;
  debug('File original name is %o', originalName)

  const datePrefix = Date.now();
  debug('File date prefix will be %o', datePrefix)

  const googleCloudStorageName = `${datePrefix}${originalName}`
  debug('File name will be %o on GCS', googleCloudStorageName)

  const file = bucket.file(googleCloudStorageName)

  debug('Creating write stream for file')
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
    resumable: false,
  })

  stream.on('error', err => {
    debug('Error on stream')
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', async () => {
    debug('Stream finished')
    req.file.cloudStorageObject = googleCloudStorageName
    debug('Making file public...')
    await file.makePublic()
    debug('File is public now')

    debug('Getting file public URL...')
    req.file.cloudStoragePublicUrl = getPublicUrl(googleCloudStorageName)
    debug('File public URL is %o', req.file.cloudStoragePublicUrl)

    next()
  })

  stream.end(req.file.buffer)

}

module.exports = {
  sendUploadedFileToGCS
}
