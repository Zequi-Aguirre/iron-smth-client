import React from "react";
import { Link } from "react-router-dom";

export default function RequestPreview({ requestInfo }) {
  console.log({ requestInfo });
  return (
    <Link to={`/requests/${requestInfo._id}`}>
      <br />
      <div className="request">
        <div className="request-name">
          <h2>{requestInfo.property.name}</h2>
          <h3>{requestInfo.description}</h3>
        </div>
        <div className="due-date">
          <h2>{requestInfo.dueDate}</h2>
          <h4>{requestInfo.status}</h4>
        </div>
      </div>
    </Link>
  );
}
