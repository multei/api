const { ApiProblem } = require("express-api-problem/dist/api-problem");

const ComplaintAlreadyCompletedException = () => {
  return new ApiProblem({
    status: 405,
    title: "Complaint report is already completed",
  });
};

const CanNotRetrieveParkingDataException = () => {
  return new ApiProblem({
    status: 500,
    title: "Internal error trying to retrieve complaint data",
  });
};

const CanNotUpdateDataException = () => {
  return new ApiProblem({
    status: 500,
    title: "Error when trying to update data",
  });
};

const CanNotSaveDataException = () => {
  return new ApiProblem({
    status: 500,
    title: "Error when trying to save data",
    detail: "It is an internal server error",
  });
};

const NoComplaintsFoundException = () => {
  return new ApiProblem({
    status: 404,
    title: "No complaints found with this plate",
    detail: "Please check if car plate is correct",
  });
};

const DeletingComplaintNotAllowedException = () => {
  return new ApiProblem({
    status: 405,
    title: "Deleting complaint is not allowed",
  });
};

module.exports = {
  ComplaintAlreadyCompletedException,
  CanNotRetrieveParkingDataException,
  CanNotUpdateDataException,
  CanNotSaveDataException,
  NoComplaintsFoundException,
  DeletingComplaintNotAllowedException,
};
