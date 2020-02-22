'use strict';
const createError = require('http-errors')
const debug = require('debug')('app:lib:gcs')

debug('At googleCloudStorage.js')

/**
 * Upload a file to the bucket
 *
 * @param req
 * @param res
 * @param next
 * @return {*}
 */
function sendUploadedFileToGCS(req, res, next) {
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

  function getPublicUrl(filename) {
    debug(`Getting public URL for ${filename}`)
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
  }

  /**
   * Upload a file to the bucket
   *
   * @return {*}
   */

  function uploadFile() {

    debug(`Sending upload to Google Cloud Storage...`)

    if(!req.file) {
      debug('Request file does not exist: %o', req.file)
      return next(createError(400, 'No file uploaded'))
    }

    const bucket = storage.bucket(CLOUD_BUCKET)

    const originalName = req.file.originalname;
    debug('File original name is %o', originalName)

    const datePrefix = Date.now();
    debug('File date prefix will be %o', datePrefix)

    const googleCloudStorageName = `${datePrefix}${originalName}`
    debug('File name will be %o on GCS', googleCloudStorageName)

    const options = {
      metadata: {
        contentType: req.file.mimetype,
      },
      resumable: false,
    };
    debug('Creating write stream for file with options: %o', options)

    /**
     * Configure the file inside bucket
     * @type {File}
     */
    const blob = bucket.file(googleCloudStorageName)
    debug('Setting the path to the file inside bucket. File is %o', googleCloudStorageName)

    const blobStream = blob.createWriteStream(options)
    debug('Initializing write stream...')

    blobStream.on('error', err => {
      debug('Error on stream. Setting cloudStorageError')

      req.file.cloudStorageError = err
      debug('Moving to next middleware...')

      console.log('Error on stream', err)
      next(err)
    })

    blobStream.on('finish', async () => {
      debug('Stream finished')
      req.file.cloudStorageObject = googleCloudStorageName
      debug('Making file public...')
      await file.makePublic()
      debug('File is public now')

      debug('Getting file public URL...')
      req.file.cloudStoragePublicUrl = getPublicUrl(googleCloudStorageName)
      debug('File public URL is %o', req.file.cloudStoragePublicUrl)
    })

    debug('Finishing stream setting file buffer: %o', req.file.buffer)
    blobStream.end(req.file.buffer)
    res.status(200)

  }

  uploadFile()

}

module.exports = {
  sendUploadedFileToGCS
}
