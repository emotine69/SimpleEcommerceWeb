import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCJCyW80L2DlYyBZ1XLOA_PxOiKwEvY2_s',
  authDomain: 'auth-dev-b47fd.firebaseapp.com',
  projectId: 'auth-dev-b47fd',
  storageBucket: 'auth-dev-b47fd.appspot.com',
  messagingSenderId: '114363059820',
  appId: '1:114363059820:web:3ad080ec14635d47fc9249',
});

export const auth = app.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const githubProvider = new firebase.auth.GithubAuthProvider();

// export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// const googleProvider = new firebase.auth.GoogleAuthProvider();

// export const signInWithGoogle = () => {
//   auth
//     .signInWithPopup(googleProvider)
//     .then((res) => {
//       console.log(res.user);
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// };

export { app,googleProvider,githubProvider };
