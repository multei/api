const { ApiProblem } = require('express-api-problem');
const debug = require('debug')('app:middlewares:gcs')

debug('At googleCloudStorage.js mock')

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
  const CLOUD_BUCKET = 'mockBucket'

  if(!req.files[fileIndex]) {
    debug('Request file does not exist on req.files[%o]', fileIndex)
    return next(new ApiProblem({ status: 400, title: 'No file uploaded', detail: 'Please check if a valid file was uploaded', additional: {fileIndex, files: req.files}}))
  }
  
  const requestFile = req.files[fileIndex][0]

  const googleCloudStorageName = getFileNameOnStorage(requestFile.originalname);
  
  req.files[fileIndex].cloudStorageObject = googleCloudStorageName
  req.files[fileIndex].cloudStoragePublicUrl = getPublicUrl(CLOUD_BUCKET, googleCloudStorageName)

  next()
}

module.exports = {
  uploadFile
}
