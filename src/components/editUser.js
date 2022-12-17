import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import AppContext from "../contexts/AppContext";

export default function EditUser({ user }) {
  const navigate = useNavigate();
  const { userID } = useParams();

  console.log(userID);

  const [formState, setFormState] = useState({
    userID: userID,
    name: user.name,
    email: user.email,
    userType: user.userType,
  });

  const { theUser, getUserInfo } = useContext(UserContext);
  const { fetchUsers, stopEditing } = useContext(AppContext);

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
        "http://localhost:5005/user/update/" + userID,
        {
          name: formState.name,
          email: formState.email,
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
  let userTypeArray = ["User", "Admin", "Owner"];

  let userTypeSelector = userTypeArray.map((userType) => {
    console.log(user.userType);
    console.log({ userType });
    if (user.userType === userType) {
      return (
        <option value={userType} key={userType} selected>
          {userType}
        </option>
      );
    } else {
      return (
        <option value={userType} key={userType}>
          {userType}
        </option>
      );
    }
  });

  return (
    <div>
      <div className="login-signup-container">
        <div>
          Update User!
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
            User Type:
            <select
              name="userType"
              id="userType"
              onChange={(e) => {
                updateInput(e, "userType");
              }}
            >
              {userTypeSelector}
            </select>
          </div>
          <button
            onClick={() => {
              submitSignupForm();
              stopEditing();
            }}
          >
            Submit
          </button>
          <button
            onClick={() => {
              stopEditing();
            }}
          >
            Cancel Edit
          </button>
        </div>
      </div>
    </div>
  );
}
