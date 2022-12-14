import "../App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";

export default function AllUsers() {
  const { users, fetchUsers, deleteUser } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(users);

  const usersHTML = users.map((user) => {
    console.log(user.email);
    return (
      <div key={user._id}>
        <h3>{user.email}</h3>
        <h3>{user._id}</h3>
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
      </div>
    );
  });

  console.log(users);

  return (
    <div>
      <h1>All Users</h1>
      {usersHTML}
    </div>
  );
}
