import "../App.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";
import CreateProperty from "./createProperty";

export default function AllProperties() {
  const navigate = useNavigate();

  const { requests, properties, fetchProperties, fetchRequests } =
    useContext(AppContext);

  // console.log({ properties });

  const propertiesHTML = properties.map((property) => {
    // console.log(property.name);

    console.log({ requests });
    console.log({ property });

    const thisPropertyRequests = requests.filter((request) => {
      return request.property._id === property._id;
    });

    const thisPropertyRequestsHTML = thisPropertyRequests.map((request) => {
      console.log(request);
      return (
        <div>
          <p>
            {request.description} - Due date: {request.dueDate}
          </p>
        </div>
      );
    });

    console.log({ thisPropertyRequests });
    console.log({ thisPropertyRequestsHTML });

    return (
      <div key={property._id}>
        <h2>{property.name}</h2>
        <h4>{property.address}</h4>
        {thisPropertyRequestsHTML} <br />
        <Link to={"/property/" + property._id}>See Property Details</Link>
        <br />
      </div>
    );
  });

  // console.log(properties);

  useEffect(() => {
    fetchProperties();
    fetchRequests();
  }, []);

  return (
    <div>
      <h1>All Properties</h1>
      <CreateProperty />
      {propertiesHTML}
    </div>
  );
}
