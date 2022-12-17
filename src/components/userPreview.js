import React from "react";
import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import { Link } from "react-router-dom";

export default function UserPreview({ user }) {
  const { deleteUser, fetchUsers } = useContext(AppContext);
  return (
    <Link to={"/users/" + user._id}>
      <div className="user-preview" key={user._id}>
        <h2>{user.name}</h2>
        <h3>{user.email}</h3>
        <h3>{user.userType}</h3> <br />
      </div>
    </Link>
  );
}
