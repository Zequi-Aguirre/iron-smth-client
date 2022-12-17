import "../App.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";
import CreateProperty from "./createProperty";
import UserContext from "../contexts/UserContext";

export default function AllProperties() {
  const navigate = useNavigate();

  const { requests, properties, fetchProperties, fetchRequests } =
    useContext(AppContext);
  const { theUser } = useContext(UserContext);

  console.log(theUser);
  // console.log({ properties });

  const propertiesHTML = properties.map((property) => {
    // console.log(property.name);

    console.log({ requests });
    console.log({ property });

    const thisPropertyRequests = requests.filter((request) => {
      return request.property._id === property._id;
    });

    const thisPropertyRequestsHTML = thisPropertyRequests.filter((request) => {
      console.log(request);
      if (request.status !== "Finished") {
        return (
          <div>
            <p>
              {request.description} - Due date: {request.dueDate}
            </p>
          </div>
        );
      }
    });

    console.log({ thisPropertyRequests });
    console.log({ thisPropertyRequestsHTML });

    return (
      <Link to={"/property/" + property._id}>
        <div key={property._id}>
          <h2>{property.name}</h2>
          <h4>{property.address}</h4>
          {thisPropertyRequestsHTML.length}{" "}
          {thisPropertyRequestsHTML.length === 1 ? "Request" : "Requests"}{" "}
          Pending
          <br />
          <br />
        </div>
      </Link>
    );
  });

  // console.log(properties);

  useEffect(() => {
    fetchProperties();
    fetchRequests();
  }, []);

  if (!theUser) {
    console.log("no User");
    navigate("/");
  }

  return (
    <div>
      <h1>All Properties</h1>
      <CreateProperty />
      {propertiesHTML}
    </div>
  );
}
