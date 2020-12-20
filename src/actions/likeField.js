import Firebase from 'firebase/app'

import { prepareDocForCreate } from './helpers/firestoreHelpers'

const likeField = (field) => {
  const like = prepareDocForCreate({
    fieldId: field.id,
  })

  return Firebase.firestore().collection('fieldLikes').add(like)
}

export default likeField
