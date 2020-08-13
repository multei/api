const read = (whereObject, whereNotObject) => {
  const { uuid, car_plate } = whereObject;

  if (car_plate) 
    return readCompletedParkingsOnly(car_plate, whereNotObject);

  return new Promise((resolve, reject) => {
    if (uuid == "completed_uuid") {
      return resolve([{ completed_at: "sometime" }]);
    } else if (uuid == "incomplete_uuid") {
      return resolve([{ completed_at: undefined }]);
    } else {
      return reject({ error: "some error" });
    }
  });
};

const readCompletedParkingsOnly = (car_plate, whereNotObject) => {
  return new Promise((resolve, reject) => {
    if (hasFilterToReadCompletedParkingsOnly(whereNotObject))
      return resolve([
        {
          uuid: "complete_uuid",
          car_plate: car_plate,
          completed_at: "sometime",
        },
      ]);
    else 
      return reject({ error: "must read only completed parkings" });
  });
};

const hasFilterToReadCompletedParkingsOnly = (whereNotObject) => {
  if (!whereNotObject) 
    return false;

  if (!whereNotObject.hasOwnProperty("completed_at")) 
    return false;

  if (!whereNotObject.completed_at == null) 
    return false;

  return true
};

const update = (whereObject, updateObject, completed) => {
  const { uuid } = whereObject;
  return new Promise((resolve, reject) => {
    if (uuid) {
      return resolve([{ completed_at: "sometime" }]);
    } else {
      return reject({ error: "some error" });
    }
  });
};

module.exports = {
  read,
  update,
};
