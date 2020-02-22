const openALPR = require('openalpr').create({
  secretKey: process.env.OPENALPR_SECRET_KEY
});

module.exports = async (req, res, next) => {

  if(typeof process.env.OPENALPR_SECRET_KEY === 'undefined') {
    return res.status(500).send({status: 'error', message: 'Can not recognize vehicle because of internal API issues'});
  }

  if(typeof req.body !== 'object') {
    return res.status(400).send({status: 'error', message: 'Request body is missing'});
  }

  if(typeof req.body['car_front_base64'] === 'undefined') {
    return res.status(400).send({status: 'error', message: 'Car front base64 image is missing'});
  }

  const handleRecognitionSuccess = result => {
    if(result.error_code === 400) {
      return res.status(400).send(result);
    }
  };

  const handleRecognitionError = error => {
    console.error('Recognition error callback', error);
    res.status(500).send({status: 'error', message: 'Error when recognizing vehicle plate'});
  };

  try {
    const result = await openALPR.recognize(req.body['car_front_base64']);
    handleRecognitionSuccess(result);
  } catch(err) {
    handleRecognitionError(err);
  }

  next();

};
