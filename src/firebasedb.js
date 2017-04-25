import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB9tm_kLW-G1lrH8MStDXW9a-S2S-rr7Oo',
  authDomain: 'lab3-2e26b.firebaseapp.com',
  databaseURL: 'https://lab3-2e26b.firebaseio.com',
  storageBucket: 'lab3-2e26b.appspot.com',
};
firebase.initializeApp(config);

const database = firebase.database();
let board = 'notes';

export function changeBoard(name) {
  board = name;
}

export function deleteNote(id) {
  database.ref(board).child(id).remove();
}

export function createNote(title) {  // from https://firebase.google.com/docs/database/web/read-and-write
  const postData = {
    title,
    text: '',
    x: 50,
    y: 50,
  };

  const newNoteKey = firebase.database().ref(board).push().key;

  const updates = {};
  updates[`${newNoteKey}`] = postData;

  return firebase.database().ref(board).update(updates);
}

export function updateNote(id, fields) {
  const updates = fields;
  return firebase.database().ref(board).child(id).update(updates);
}

export function fetchNotes(callback) {
  firebase.database().ref(board).on('value', (snapshot) => {
    callback(snapshot.val());
  });
}
