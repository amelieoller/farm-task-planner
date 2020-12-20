import Firebase from 'firebase/app'
import ReactGA from 'react-ga'
import slugify from 'slugify'

import { prepareDocForCreate } from './helpers/firestoreHelpers'

const createField = (values) => {
  ReactGA.event({
    category: 'Field',
    action: 'Create field',
  })

  values.slug = slugify(values.title, { lower: true })
  values._likeCount = 0

  return Firebase.firestore()
    .collection('fields')
    .add(prepareDocForCreate(values))
    .then(() => values)
    .catch((error) => {
      alert(`Whoops, couldn't create the field: ${error.message}`)
    })
}

export default createField
