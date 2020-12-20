const admin = require('firebase-admin')

// update _likeCount on a Field when it's liked or unliked
exports.updateFieldLikeCount = (change, context) => {
  const fieldId = change.after.exists
    ? change.after.data().fieldId
    : change.before.data().fieldId
  return getNumberOfFieldLikes(fieldId).then((count) =>
    setFieldLikeCount(fieldId, count),
  )
}

const getNumberOfFieldLikes = (fieldId) =>
  admin
    .firestore()
    .collection('fieldLikes')
    .where('fieldId', '==', fieldId)
    .get()
    .then((snapshot) => snapshot.size)

const setFieldLikeCount = (fieldId, count) =>
  admin.firestore().collection('fields').doc(fieldId).update({
    _likeCount: count,
  })
