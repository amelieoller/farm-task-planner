import Firebase from 'firebase/app'

const logIn = () => {
  const provider = new Firebase.auth.GoogleAuthProvider()

  return Firebase.auth()
    .signInWithRedirect(provider)
    .then((result) => {
      // eslint-disable-next-line no-console
      console.log(`logged in as ${result.user.displayName}`)
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('could not sign in', error)
    })
}

export default logIn
