const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp(functions.config().firebase)

const fieldLikes = require('./lib/fieldLikes')

exports.updateFieldInSearchIndex = functions
  .firestore
  .document('fields/{fieldId}')
  .onWrite(search.updateFieldInSearchIndex)

exports.updateFieldLikeCount = functions
  .firestore
  .document('fieldLikes/{fieldLikeId}')
  .onWrite(fieldLikes.updateFieldLikeCount)