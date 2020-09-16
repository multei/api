const { ApiProblem } = require('express-api-problem/dist/api-problem');

const ComplaintAlreadyCompletedException = () => {
    return new ApiProblem({ status: 405, title: 'Parking report is already completed' })
}

const CanNotRetrieveParkingDataException = () => {
    return new ApiProblem({status: 500, title: "Can not retrieve parking data"})
}

const CanNotUpdateData = () => {
    return new ApiProblem({status: 500, title: "Error when trying to update data"})
}




module.exports = { ComplaintAlreadyCompletedException, CanNotRetrieveParkingDataException, CanNotUpdateData };