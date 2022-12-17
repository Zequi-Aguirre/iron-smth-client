import SignupOrLogin from "./signup";

import React, { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import UserContext from "../contexts/UserContext";

import { Link, useNavigate } from "react-router-dom";

import smthLogo from "../images/logo.png";
import RequestPreview from "./requestPreview";

export default function HomePage() {
  const { fetchUsers, requests, properties, fetchProperties, fetchRequests } =
    useContext(AppContext);
  const { theUser } = useContext(UserContext);
  console.log(theUser);

  console.log({ theUser });
  console.log({ requests });

  useEffect(() => {
    fetchRequests();
    fetchUsers();
  }, []);

  let thisUserRequestsHTML;

  if (theUser) {
    const thisUserRequests = requests.filter((request) => {
      return request.assignedTo.includes(theUser._id);
    });

    console.log({ thisUserRequests });

    thisUserRequestsHTML = thisUserRequests.map((request) => {
      return (
        // <Link to={`/requests/${request._id}`}>
        //   <div className="request">
        //     <div className="request-name">
        //       <h2>{request.property.name}</h2>
        //       <h4>{request.description}</h4>
        //     </div>
        //     <div className="due-date">
        //       <h2>{request.dueDate}</h2>
        //       <h4>{request.status}</h4>
        //     </div>
        //   </div>
        // </Link>
        <RequestPreview requestInfo={request} />
      );
    });
  }

  return (
    <div>
      {theUser && (
        <div>
          <h1>My Tasks</h1>
          {thisUserRequestsHTML}
        </div>
      )}
      {!theUser && (
        <div>
          <img src={smthLogo} alt="" />

          <SignupOrLogin action="login" />
        </div>
      )}
    </div>
  );
}
