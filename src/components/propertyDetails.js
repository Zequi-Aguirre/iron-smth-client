import React, { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function PropertyDetails() {
  const navigate = useNavigate();
  const { propertyID } = useParams();
  const { properties, fetchProperties, deleteProperty } =
    useContext(AppContext);

  const currentProperty = properties.filter((property) => {
    return property._id === propertyID;
  });

  console.log({ properties });
  console.log({ currentProperty });

  const currentPropertyHTML = currentProperty.map((property) => {
    return <div>{property.name}</div>;
  });

  console.log({ currentPropertyHTML });

  useEffect(() => {
    fetchProperties();
  }, []);
  return (
    <div>
      <h1>Property Details</h1>
      <br />
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
    </div>
  );
}
