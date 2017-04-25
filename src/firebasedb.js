import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB9tm_kLW-G1lrH8MStDXW9a-S2S-rr7Oo',
  authDomain: 'lab3-2e26b.firebaseapp.com',
  databaseURL: 'https://lab3-2e26b.firebaseio.com',
  storageBucket: 'lab3-2e26b.appspot.com',
};
firebase.initializeApp(config);

const database = firebase.database();

export function deleteNote(id) {
  database.ref('notes').child(id).remove();
}

export function createNote(title) {  // from https://firebase.google.com/docs/database/web/read-and-write
  // A post entry.
  const postData = {
    title,
    text: '',
    x: (Math.random() + 0.5) * 500,
    y: (Math.random() + 0.5) * 100,
    zIndex: 0,
  };

  // Get a key for a new Post.
  const newNoteKey = firebase.database().ref('notes').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates[`${newNoteKey}`] = postData;
  // updates[`/user-notes/${newNoteKey}`] = postData;

  return firebase.database().ref('notes').update(updates);
}

export function updateNote(id, fields) {
  const updates = fields;
  return firebase.database().ref('notes').child(id).update(updates);
}

export function fetchNotes(callback) {
  firebase.database().ref('notes').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}
