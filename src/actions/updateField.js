import Firebase from 'firebase/app'
import ReactGA from 'react-ga'
import { prepareDocForUpdate } from './helpers/firestoreHelpers'

const updateField = (fieldId, values) => {
  ReactGA.event({
    category: 'Field',
    action: 'Update field',
  })

  return Firebase.firestore()
    .collection('fields')
    .doc(fieldId)
    .update(prepareDocForUpdate(values))
    .catch((error) => {
      alert(`Whoops, couldn't edit the field: ${error.message}`)
    })
}

export default updateField
