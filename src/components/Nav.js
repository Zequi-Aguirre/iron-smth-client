import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import SignupOrLogin from "./signup";

export default function Nav() {
  const { theUser, logout, getUserInfo } = useContext(UserContext);

  console.log(theUser);

  return (
    <div>
      {/* remove ! */}
      {!theUser && (
        <div id="nav-bar">
          <Link to="/">GO HOME!!</Link>

          <ul>
            {theUser && theUser.userType === "Owner" && (
              <li>
                <Link to="/users">All Users</Link>
              </li>
            )}
            <li>
              <Link to="/properties">See Properties</Link>
            </li>
            <li>
              <Link to="/requests">See Requests</Link>
            </li>

            {
              //   !theUser && (
              //   <li>
              //     <Link to="/signup">Signup</Link>
              //   </li>
              // )
            }

            {!theUser && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}

            {/* comment this out */}
            {!theUser && (
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
            )}
            {/* comment this out */}

            {theUser && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}

            {theUser && (
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
