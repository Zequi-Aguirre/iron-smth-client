import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import AppContext from "../contexts/AppContext";
import UserContext from "../contexts/UserContext";

import RequestComments from "./requestComments";

import EditRequest from "./editRequest";
import EditUser from "./editUser";

export default function UserDetails() {
  const navigate = useNavigate();
  const { userID } = useParams();

  const {
    users,
    fetchUsers,
    deleteUser,
    requests,
    properties,
    fetchProperties,
    deleteProperty,
    fetchRequests,
    deleteRequest,
    edit,
    editing,
  } = useContext(AppContext);
  const { theUser } = useContext(UserContext);

  let user = users.find((user) => {
    return user._id === userID;
  });

  useEffect(() => {
    fetchProperties();
    fetchUsers();
  }, []);

  console.log({ users });

  console.log({ user });

  return (
    <div>
      {editing && <EditUser user={user} />}
      {!editing && (
        <div>
          <div>
            <h1>User Details</h1>

            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
            <h2>{user.userType}</h2>

            {user.userType !== "Owner" && (
              <button
                onClick={() => {
                  deleteUser(user._id);
                  fetchUsers();
                  // navigate("/users");
                }}
              >
                Delete User
              </button>
            )}

            <button
              onClick={() => {
                edit();
              }}
            >
              Edit User
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
