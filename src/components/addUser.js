import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import AppContext from "../contexts/AppContext";

export default function AddUser() {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
  });

  const { theUser, getUserInfo } = useContext(UserContext);
  const { fetchUsers } = useContext(AppContext);

  const updateInput = (e, thingToUpdate) => {
    setFormState({ ...formState, [thingToUpdate]: e.target.value });
  };

  let userTypeSelectorDefault = () => {
    if (formState.assignedTo === "") {
      return (
        <option value="" selected>
          Select Person
        </option>
      );
    }
  };

  const submitSignupForm = () => {
    axios
      .post(
        "http://localhost:5005/auth/signup",
        {
          name: formState.name,
          email: formState.email,
          password: formState.password,
          userType: formState.userType,
        },
        { withCredentials: true }
      )
      .then((response) => {
        // console.log(response);
        fetchUsers();

        // navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(theUser);

  return (
    <div>
      <div className="login-signup-container">
        <div>
          Add User!
          <div>
            Name
            <input
              type="name"
              value={formState.name}
              onChange={(e) => {
                updateInput(e, "name");
              }}
            />
          </div>
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
          <div>
            User Type:
            <select
              name="userType"
              id="userType"
              onChange={(e) => {
                updateInput(e, "userType");
              }}
            >
              {userTypeSelectorDefault()}
              <option value="User" key="User">
                User
              </option>
              <option value="Admin" key="Admin">
                Admin
              </option>
              <option value="Owner" key="Owner">
                Owner
              </option>
            </select>
          </div>
          <button
            onClick={() => {
              submitSignupForm();
              setFormState({
                name: "",
                email: "",
                password: "",
                userType: "",
              });
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
