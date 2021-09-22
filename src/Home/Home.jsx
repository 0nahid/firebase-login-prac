import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
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
          isSignedIn: true,
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
  const handleSignOut = () => {
    signOut(auth)
      .then((res) => {
        const signedUser = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
        };
        setUser(signedUser);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = () => {
    console.log("Submitted");
  };

  const handleChange = (e) => {
    console.log(e.target.name , e.target.value);
  };

  return (
    <div>
      {user.isSignedIn ? (
        <button onClick={handleSignOut}> Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
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
      <h1>Our own Authentication System</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="input-email"
          placeholder="Enter your email address"
          onBlur={handleChange}
          required
        />{" "}
        <br />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          onBlur={handleChange}
          required
        />{" "}
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Home;
