const read = (whereObject) => {
  const { uuid } = whereObject

  return new Promise((resolve, reject) => {
    if (uuid == 'completed_uuid') {
      return resolve([{ completed_at: 'sometime' }]);
    }
    else if (uuid == 'incomplete_uuid') {
        return resolve([{ completed_at: undefined }]);
    }
    else {
      return reject({ error: 'some error' });
    }
  })
}

const update = (whereObject, updateObject, completed) => {
  const { uuid } = whereObject
  return new Promise((resolve, reject) => {
    if (uuid) {
      return resolve([{ completed_at: 'sometime' }]);
    }
    else {
      return reject({ error: 'some error' });
    }
  })
}

module.exports = {
  read,
  update
}
