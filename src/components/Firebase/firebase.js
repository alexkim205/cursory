import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Log } from "../../_helpers";

import { FirebaseConfig } from "../../_config/keys";

// Initialize Firebase app
class Firebase {
  constructor() {
    app.initializeApp(FirebaseConfig);

    this.auth = app.auth();
    this.firestore = app.firestore();

    /*
     * Google: https://console.firebase.google.com
     * Facebook: https://developers.facebook.com/apps/
     * Twitter: https://developer.twitter.com/en/apps
     * Github: https://github.com/settings/applications
     * Microsoft/Xbox/Outlook: https://portal.azure.com
     */
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
    this.githubProvider = new app.auth.GithubAuthProvider();
    this.microsoftProvider = new app.auth.OAuthProvider("microsoft.com");
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

  doSignInWithGithub = () => this.auth.signInWithPopup(this.githubProvider);

  doSignInWithMicrosoft = () =>
    this.auth.signInWithPopup(this.microsoftProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email =>
    this.auth.sendPasswordResetEmail(email, {
      url: FirebaseConfig.passwordResetRedirect
    });

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  doSendEmailVerification = (route = "") =>
    this.auth.currentUser.sendEmailVerification({
      url: FirebaseConfig.confirmationEmailRedirect + route
    });

  doReauthenticate = password =>
    this.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(
      app.auth.EmailAuthProvider.credential(
        this.auth.currentUser.email,
        password
      )
    );

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid).onSnapshot(doc => {
          const dbUser = doc.data();
          //   Log.info(dbUser, "firebase.js");

          // default empty roles
          if (dbUser && !dbUser.roles) {
            dbUser.roles = {};
          }

          // merge auth and db user
          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            providerData: authUser.providerData,
            ...dbUser
          };

          next(authUser);
        });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.firestore.collection("users").doc(`${uid}`);

  users = () => this.firestore.collection("users");

  react = () => this.firestore.collection("react"); // database to handle react states

  getUserDocuments = uid =>
    this.firestore
      .collection("users")
      .doc(`${uid}`)
      .collection("documents");
}

// Initialize database to connect to Redux
const FirebaseInstance = new Firebase();

export { FirebaseInstance };
