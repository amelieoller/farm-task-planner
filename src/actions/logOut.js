import Firebase from 'firebase/app'

const logOut = () => Firebase.auth().signOut()

export default logOut
