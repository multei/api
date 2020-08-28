

function isCompleted(complaint) {
  return complaint.completed_at ? true : false
}

module.exports = {
  isCompleted
}
