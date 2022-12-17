import "../App.css";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";
import CreateRequest from "./createRequest";
import RequestPreview from "./requestPreview";

import UserContext from "../contexts/UserContext";

export default function AllRequests() {
  const { requests, fetchRequests, deleteRequest } = useContext(AppContext);
  const { theUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  console.log(requests);

  const requestsHTML = requests.map((request) => {
    console.log(request.name);
    return (
      <div key={request._id}>
        <br />
        {/* <Link to={`/requests/${request._id}`}>
          <div className="request">
            <div className="request-name">
              <h2>{request.property.name}</h2>
              <h4>{request.description}</h4>
            </div>
            <div className="due-date">
              <h2>{request.dueDate}</h2>
              <h4>{request.status}</h4>
            </div>
          </div>
    </Link> */}
        <RequestPreview requestInfo={request} />
      </div>
    );
  });

  console.log(requests);

  if (!theUser) {
    console.log("no User");
    navigate("/");
  }

  return (
    <div>
      <h1>All Requests</h1>
      <CreateRequest />
      {requestsHTML}
    </div>
  );
}
