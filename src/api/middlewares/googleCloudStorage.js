const { ApiProblem } = require('express-api-problem');
const debug = require('debug')('app:middlewares:gcs')

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
const uploadFile = (fileIndex) => (req, res, next) => {

  debug('Entered Google Cloud Storage middleware upload function...')

  /**
   * Bucket name
   *
   * @type {string}
   */
  const CLOUD_BUCKET = process.env.CLOUD_BUCKET
  debug('Google Cloud bucket is %o', CLOUD_BUCKET)

  if(!req.files[fileIndex]) {
    debug('Request file does not exist on req.files[%o]', fileIndex)
    return next(new ApiProblem({ status: 400, title: 'No file uploaded', detail: 'Please check if a valid file was uploaded', additional: {fileIndex, files: req.files}}))
  }
  debug(`Request file exists. Sending upload to Google Cloud Storage...`)

  const requestFile = req.files[fileIndex][0]

  const bucket = getGoogleCloudStorageBucket(CLOUD_BUCKET)

  const googleCloudStorageName = getFileNameOnStorage(requestFile.originalname);
  debug('Name of file on Google Cloud Storage will be %o', googleCloudStorageName)

  /**
   * Configure the file inside bucket
   * @type {File}
   */
  const blob = bucket.file(googleCloudStorageName)
  debug('Setting the path to the file inside bucket. File is %o', googleCloudStorageName)

  const options = {
    metadata: {
      contentType: requestFile.mimetype,
    },
    resumable: false,
  };
  debug('Creating write stream for file with options: %o', options)

  const blobStream = blob.createWriteStream(options)
  debug('Initializing write stream...')

  blobStream.on('error', err => {
    debug('Error on stream. Setting cloudStorageError')

    req.files[fileIndex].cloudStorageError = err
    debug('Moving to next middleware...')

    next(err)
  })

  blobStream.on('finish', async () => {

    debug('Stream finished')
    req.files[fileIndex].cloudStorageObject = googleCloudStorageName

    debug('Making file public...')
    // await blob.makePublic()

    req.files[fileIndex].cloudStoragePublicUrl = getPublicUrl(CLOUD_BUCKET, googleCloudStorageName)
    debug('File public URL is %o', req.files[fileIndex].cloudStoragePublicUrl)

    debug('Going to next middleware...')
    return next()

  })

  debug('Finishing stream setting file buffer')
  blobStream.end(requestFile.buffer)

  debug('Google Cloud Storage middleware finishing...')

}

module.exports = {
  uploadFile
}
