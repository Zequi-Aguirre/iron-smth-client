import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function SignupOrLogin({ action }) {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const { theUser, getUserInfo } = useContext(UserContext);

  const updateInput = (e, thingToUpdate) => {
    setFormState({ ...formState, [thingToUpdate]: e.target.value });
  };

  const submitSignupForm = () => {
    let endpoint;
    if (action === "signup") endpoint = "signup";
    if (action === "login") endpoint = "login";

    axios
      .post(
        "http://localhost:5005/auth/" + endpoint,
        {
          email: formState.email,
          password: formState.password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        // console.log(response);
        getUserInfo();
        // navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(theUser);

  return (
    <div>
      {!theUser && (
        <div className="login-signup-container">
          <div className={action}>
            {action === "signup" ? "Signup" : "Login"}
            <div>
              Email
              <input
                type="email"
                value={formState.email}
                onChange={(e) => {
                  updateInput(e, "email");
                }}
              />
            </div>
            <div>
              Password
              <input
                type="email"
                value={formState.password}
                onChange={(e) => {
                  updateInput(e, "password");
                }}
              />
            </div>
            <button onClick={submitSignupForm}>Submit</button>
          </div>
        </div>
      )}
      {theUser && (
        <div className={action}>
          <h1>already logged in as {theUser.email}</h1>
          <Link to={`/profile`}>See Profile</Link>
        </div>
      )}
    </div>
  );
}
