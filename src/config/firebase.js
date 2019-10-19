const firebase = require('firebase/app')
require('firebase/firestore')
require('firebase/auth')

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDqkiXCq-yTQYzHCP-SkjQCQvTmvGiHpCA',
  authDomain: 'kanban-d99f9.firebaseapp.com',
  projectId: 'kanban-d99f9'
})

module.exports = firebase
