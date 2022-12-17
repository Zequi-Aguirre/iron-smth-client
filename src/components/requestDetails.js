import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import AppContext from "../contexts/AppContext";
import UserContext from "../contexts/UserContext";

import RequestComments from "./requestComments";

import EditRequest from "./editRequest";

export default function RequestDetails() {
  const navigate = useNavigate();
  const { requestID } = useParams();

  const {
    users,
    fetchUsers,
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

  console.log(requestID);

  const thisRequest = requests.filter((request) => {
    return request._id === requestID;
  });

  console.log({ users });

  const thisRequestUser = users.filter((user) => {
    console.log(user._id);
    return user._id === thisRequest[0].assignedTo[0];
  });

  console.log({ thisRequest });
  console.log({ thisRequestUser });

  useEffect(() => {
    fetchProperties();
    fetchUsers();
  }, []);

  return (
    <div>
      {editing && <EditRequest />}
      {!editing && (
        <div>
          <div>
            <h1>Request Details</h1>
            <Link to={`/property/` + thisRequest[0].property._id}>
              {" "}
              <h2>{thisRequest[0].property.name}</h2>
            </Link>
            <h2>{thisRequest[0].description}</h2>
            <h3>{thisRequestUser[0].email}</h3>
            <h3>{thisRequest[0].dueDate}</h3>
            <h3>{thisRequest[0]._id}</h3>

            <button
              onClick={() => {
                //   console.log(thisRequest[0]._id);
                deleteRequest(thisRequest[0]._id);
                fetchRequests();
                navigate("/requests");
              }}
            >
              Delete Request
            </button>

            <button
              onClick={() => {
                edit();
              }}
            >
              Edit Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
