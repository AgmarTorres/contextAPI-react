import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBqUS17nIU2bIWL7hV5TcGTY2lvy_prvh8",
  authDomain: "crwn-db-caa78.firebaseapp.com",
  databaseURL: "https://crwn-db-caa78.firebaseio.com",
  projectId: "crwn-db-caa78",
  storageBucket: "crwn-db-caa78.appspot.com",
  messagingSenderId: "62962786635",
  appId: "1:62962786635:web:d0e3fac192ef551bac08ce",
  measurementId: "G-SDS49KMQD3"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
