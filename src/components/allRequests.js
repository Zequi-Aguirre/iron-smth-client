import "../App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";
import CreateRequest from "./createRequest";

export default function AllRequests() {
  const { requests, fetchRequests, deleteRequest } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  console.log(requests);

  const requestsHTML = requests.map((request) => {
    console.log(request.name);
    return (
      <div key={request._id}>
        <h3>{request.property.name}</h3>
        <h5>{request.description}</h5>
        <h5>{request.dueDate}</h5>
        <h5>{request.status}</h5>
        <button
          onClick={() => {
            deleteRequest(request._id);
            fetchRequests();
            // navigate("/requests");
          }}
        >
          Delete Request
        </button>
      </div>
    );
  });

  console.log(requests);

  return (
    <div>
      <h1>All Requests</h1>
      <CreateRequest />
      {requestsHTML}
    </div>
  );
}
