import React, { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import EditProperty from "./editProperty";
import RequestPreview from "./requestPreview";

export default function PropertyDetails() {
  const navigate = useNavigate();
  const { propertyID } = useParams();
  const {
    users,
    fetchUsers,
    properties,
    fetchProperties,
    deleteProperty,
    edit,
    editing,
  } = useContext(AppContext);
  const { theUser } = useContext(UserContext);

  const currentProperty = properties.filter((property) => {
    return property._id === propertyID;
  });

  console.log({ properties });
  console.log({ currentProperty });

  const currentPropertyHTML = currentProperty.map((property) => {
    console.log({ property });

    let thisPropertyRequests = property.requests.filter((request) => {
      console.log({ request });

      console.log(request.property === propertyID);
      console.log(propertyID);
      console.log(request.property);

      return request.property === propertyID;
    });

    let thisPropertyRequestsHTML = thisPropertyRequests.map((request) => {
      let thisRequestUser = users.find((user) => {
        return user._id === request.assignedTo[0];
      });

      console.log({ thisRequestUser });

      // request.assignedTo = thisRequestUser;

      console.log({ request });

      return (
        // <div>
        //   <p>Maintenance Request: {request.description}</p>
        //   <p>Status: {request.status}</p>
        //   <p>Assigned to: {thisRequestUser[0].email}</p>
        // </div>
        <RequestPreview requestInfo={request} />
      );
    });

    return (
      <div>
        <h2>{property.name}</h2>
        <h2>{property.address}</h2>
        <h3>Maintenance requests</h3>
        {thisPropertyRequestsHTML}
      </div>
    );
  });

  useEffect(() => {
    fetchProperties();
    fetchUsers();
  }, []);

  if (!theUser) {
    console.log("no User");
    navigate("/");
  }
  return (
    <div>
      {editing && <EditProperty />}
      {!editing && (
        <div>
          <div>
            <h1>Property Details</h1>
            <br />
            {currentPropertyHTML}
            <br />
            <button
              onClick={() => {
                deleteProperty(propertyID);
                fetchProperties();
                navigate("/properties");
              }}
            >
              Delete Property
            </button>
            <button
              onClick={() => {
                edit();
              }}
            >
              Edit Property
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
