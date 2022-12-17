import "../App.css";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";
import UserContext from "../contexts/UserContext";
import AddUser from "./addUser";
import UserPreview from "./userPreview";

export default function AllUsers() {
  const { users, fetchUsers, deleteUser } = useContext(AppContext);
  const { theUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!theUser) {
    console.log("no User");
    navigate("/");
  } else if (theUser.userType !== "Owner") {
    console.log("no Access for you");
    navigate("/");
  }

  console.log(users);

  const usersHTML = users.map((user) => {
    console.log(user.email);
    return <UserPreview user={user} />;
  });

  console.log(users);

  return (
    <div>
      <h1>All Users</h1>
      <AddUser />
      {usersHTML}
    </div>
  );
}
