import Firebase from 'firebase/app'
import slugify from 'slugify'

import { prepareDocForCreate } from './helpers/firestoreHelpers'

const createField = (values) => {
  const newValues = {
    ...values,
    slug: slugify(values.title, { lower: true }),
    _likeCount: 0,
  }

  return Firebase.firestore()
    .collection('fields')
    .add(prepareDocForCreate(newValues))
    .then(() => newValues)
    .catch((error) => {
      alert(`Whoops, couldn't create the field: ${error.message}`)
    })
}

export default createField
