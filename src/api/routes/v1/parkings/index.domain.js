const { isCompleted } = require('./validator')
const { read, update } = require('../../../services/db')
const { ApiProblem } = require('express-api-problem');


function finishComplaint(res, next, uuid, coordinates) {
  const whereObject = { 'uuid': uuid }

  read(whereObject).then(parking => {

    if (isCompleted(parking[0])) {
      next(new ApiProblem({ status: 405, title: 'Parking report is already completed' }));
    }
    else {
      updateComplaintLocation(res, next, whereObject, coordinates);
    }
  }).catch(error => {
    next(new ApiProblem({ status: 500, title: 'Can not retrieve parking data' }));
  })
}

function updateComplaintLocation(res, next, whereObject, coordinates) {
  const updateObject = { 'coordinates': coordinates };
  update(whereObject, updateObject, true).then(data => {
    res.status(200).json({
      status: 'sucess',
      data: whereObject
    });
  }).catch(error => {
    next(new ApiProblem({ status: 500, title: 'Error when trying to update data' }));
  });
}

module.exports = { finishComplaint }