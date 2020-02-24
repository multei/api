'use strict';
const createError = require('http-errors')
const debug = require('debug')('app:lib:gcs')

debug('At googleCloudStorage.js')

function getGoogleCloudStorageBucket(bucketName) {

  /**
   * Imports the Google Cloud client library
   */
  const {Storage} = require('@google-cloud/storage')

  /**
   * Instantiates a client
   *
   * We don't specify credentials because the client library will look for credentials
   * in the environment variables.
   *
   * @type {Storage}
   */
  const storage = new Storage()

  return storage.bucket(bucketName)

}

function getPublicUrl(bucketName, filename) {
  debug(`Getting public URL for ${filename}`)
  return `https://storage.googleapis.com/${bucketName}/${filename}`;
}

function getFileNameOnStorage(originalName) {

  debug('File original name is %o', originalName)

  const datePrefix = Date.now();
  debug('File date prefix will be %o', datePrefix)

  const googleCloudStorageName = `${datePrefix}${originalName}`
  debug('File name will be %o on GCS', googleCloudStorageName)

  return googleCloudStorageName
}

/**
 * Upload a file to the bucket
 *
 * @param req
 * @param res
 * @param next
 * @return {*}
 */
function uploadFile(req, res, next) {

  /**
   * Bucket name
   *
   * @type {string}
   */
  const CLOUD_BUCKET = process.env.CLOUD_BUCKET
  debug('Google Cloud bucket is %o', CLOUD_BUCKET)

  if(!req.file) {
    debug('Request file does not exist: %o', req.file)
    return next(createError(400, 'No file uploaded'))
  }
  debug(`Request file exists. Sending upload to Google Cloud Storage...`)

  const bucket = getGoogleCloudStorageBucket(CLOUD_BUCKET)

  const googleCloudStorageName = getFileNameOnStorage(req.file.originalname);

  /**
   * Configure the file inside bucket
   * @type {File}
   */
  const blob = bucket.file(googleCloudStorageName)
  debug('Setting the path to the file inside bucket. File is %o', googleCloudStorageName)

  const options = {
    metadata: {
      contentType: req.file.mimetype,
    },
    resumable: false,
  };
  debug('Creating write stream for file with options: %o', options)

  const blobStream = blob.createWriteStream(options)
  debug('Initializing write stream...')

  blobStream.on('error', err => {
    debug('Error on stream. Setting cloudStorageError')

    req.file.cloudStorageError = err
    debug('Moving to next middleware...')

    next(err)
  })

  blobStream.on('finish', async () => {

    debug('Stream finished')
    req.file.cloudStorageObject = googleCloudStorageName

    debug('Making file public...')
    await blob.makePublic()

    req.file.cloudStoragePublicUrl = getPublicUrl(CLOUD_BUCKET, googleCloudStorageName)
    debug('File public URL is %o', req.file.cloudStoragePublicUrl)
    next()

  })

  debug('Finishing stream setting file buffer: %o', req.file.buffer)
  blobStream.end(req.file.buffer)

}

module.exports = {
  uploadFile
}
