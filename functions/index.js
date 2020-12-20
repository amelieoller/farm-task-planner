const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp(functions.config().firebase)

const fieldLikes = require('./lib/fieldLikes')

exports.updateFieldLikeCount = functions.firestore
  .document('fieldLikes/{fieldLikeId}')
  .onWrite(fieldLikes.updateFieldLikeCount)
