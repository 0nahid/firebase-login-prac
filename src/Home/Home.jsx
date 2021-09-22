import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import firebaseConfig from "../Firebase/Firebase";
initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const Home = () => {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
  });

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const signedUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign In with Google</button>
      {user.isSignedIn && (
        <div>
          <p> Welcome, {user.name} </p>
          <p>email: {user.email}</p>
          <img
            style={{ borderRadius: "50%" }}
            src={user.photo}
            alt={user.name}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
