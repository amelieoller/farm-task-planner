import Firebase from 'firebase/app'
import ReactGA from 'react-ga'

import { prepareDocForCreate } from './helpers/firestoreHelpers'

const likeField = (field) => {
  ReactGA.event({
    category: 'Field',
    action: 'Like field',
  })

  const like = prepareDocForCreate({
    fieldId: field.id,
  })

  return Firebase.firestore().collection('fieldLikes').add(like)
}

export default likeField
