import Firebase from 'firebase/app'

const deleteField = (field) =>
  Firebase.firestore()
    .collection('fields')
    .doc(field.id)
    .delete()
    .catch((error) => {
      // eslint-disable-next-line no-alert
      alert(`Whoops, couldn't delete the field: ${error.message}`)
    })

export default deleteField
