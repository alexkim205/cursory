import * as firebase from 'firebase';
import 'firebase/auth';
import {FirebaseConfig} from '../../_config/keys';

// Initialize Firebase app
class Firebase {
  constructor() {
    // console.log(FirebaseConfig);
    firebase.initializeApp(FirebaseConfig);

    this.auth = firebase.auth();

  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

}

// Initialize database to connect to Redux
const FirebaseInstance = new Firebase();
const databaseRef = firebase.database().ref();
const writingRef = databaseRef.child('writing');

export {FirebaseInstance, writingRef};
