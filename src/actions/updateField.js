import Firebase from 'firebase/app'
import { prepareDocForUpdate } from './helpers/firestoreHelpers'

const updateField = (fieldId, values) =>
  Firebase.firestore()
    .collection('fields')
    .doc(fieldId)
    .update(prepareDocForUpdate(values))
    .catch((error) => {
      // eslint-disable-next-line no-alert
      alert(`Whoops, couldn't edit the field: ${error.message}`)
    })

export default updateField
