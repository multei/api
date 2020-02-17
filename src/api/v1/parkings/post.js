const knex = require('../../../knex');
const openALPR = require('openalpr').create({
  secretKey: process.env.OPENALPR_SECRET_KEY
});

module.exports = async (req, res, next) => {

  if(typeof process.env.OPENALPR_SECRET_KEY === 'undefined') {
    res.status(500).send({status: 'error', message: 'Can not recognize vehicle because of internal API issues'});
    next();
  }

  if(typeof req.body !== 'object') {
    res.status(400).send({status: 'error', message: 'Request body is missing'});
    next();
  }

  if(typeof req.body['car_front_base64'] === 'undefined') {
    res.status(400).send({status: 'error', message: 'Car front base64 image is missing'});
    next();
  }

  const handleRecognitionSuccess = result => {

    if(result.error_code === 400) {
      res.status(400).send(result);
      next();
    }

    const dbSuccessCallback = response => {
      /*res.status(200).send(response);
      next();*/
    };

    const dbErrorCallback = error => {
      /*console.error('DB error callback', error);
      res.status(500).send({status: 'error', message: 'Error when creating a irregular parking report'});
      next();*/
    };

    const data = {
      car_color: null
    };

    knex('parkings').insert(data).then(dbSuccessCallback).catch(dbErrorCallback);
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
