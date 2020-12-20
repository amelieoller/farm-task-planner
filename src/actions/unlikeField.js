import Firebase from 'firebase/app'

const unlikeField = (userLike) =>
  Firebase.firestore().collection('fieldLikes').doc(userLike.id).delete()

export default unlikeField
