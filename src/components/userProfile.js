import React, { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import AppContext from "../contexts/AppContext";

export default function UserProfile() {
  const { theUser } = useContext(UserContext);
  const { requests, fetchRequests } = useContext(AppContext);

  console.log({ theUser });
  console.log({ requests });

  useEffect(() => {
    fetchRequests();
  }, []);

  const thisUserRequests = requests.filter((request) => {
    return request.assignedTo.includes(theUser._id);
  });

  console.log({ thisUserRequests });

  const thisUserRequestsHTML = thisUserRequests.map((request) => {
    return (
      <div>
        <p>
          {request.property.name} - {request.description} - {request.dueDate}
        </p>
      </div>
    );
  });

  return (
    <div>
      {theUser && (
        <div>
          <h1>Profile</h1>
          <h3>{theUser.email}</h3>
          {thisUserRequestsHTML}
        </div>
      )}
    </div>
  );
}
