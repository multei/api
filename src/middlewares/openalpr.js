const createError = require('http-errors')
const debug = require('debug')('app:api:middlewares:openalpr')

const openALPR = require('openalpr').create({
  secretKey: process.env.OPENALPR_SECRET_KEY
});

module.exports = async (req, res, next) => {

  debug('Entered OpenALPR middleware...')

  if(typeof process.env.OPENALPR_SECRET_KEY === 'undefined') {
    return next(createError(500, 'Can not recognize vehicle because of internal API issues'));
  }

  const handleRecognition = result => {

    debug('Recognition result: %o', result)

    if(result.status === 400) {
      return next(createError(400, 'Can not recognize vehicle'))
    }

    debug('Success recognizing vehicle!');
    req.recognitionData = result;

  };

  try {
    const encoded = req.file.buffer.toString('base64')
    debug('Generating encoded base64 file')

    debug('Starting vehicle recognition')
    const result = await openALPR.recognize(encoded);

    debug('Starting to handle recognition...')
    handleRecognition(result);

    next()

  } catch(err) {
    debug('Vehicle recognition failed')
    next(err)
  }

}
