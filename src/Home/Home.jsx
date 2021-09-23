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
    password: "",
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
      .then(() => {
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
    let fromValidate = true;
    if (e.target.name === "email") {
      const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
      fromValidate = isEmailValid;
    }
    if (e.target.name === "password") {
      const isPasswordValid =
        e.target.value.length > 6 && e.target.value.length < 32;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      fromValidate = isPasswordValid && passwordHasNumber;
    }
    if (fromValidate) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
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
      <h1>User Name: {user.name}</h1>
      <h1>Email: {user.email}</h1>
      <h1>Password: {user.password}</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onBlur={handleChange}
        />
        <br />
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
