const admin = require('firebase-admin')
const chalk = require('chalk')

const fieldData = require("./data/fake-fields.json")

// init firebase
const serviceAccount = require('./serviceAccountKey.dev.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const db = require('firebase-admin').firestore()

// add fake fields
console.log(chalk.blue(`Adding fake field data...`))
fieldData.map( field => db.collection('fields').add(field) )
console.log(chalk.green(`...added fake fields`))
