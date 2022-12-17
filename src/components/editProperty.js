import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";

export default function EditProperty() {
  const navigate = useNavigate();

  const { propertyID } = useParams();

  const {
    stopEditing,
    properties,
    sendPropertyInfo,
    fetchProperties,
    updatePropertyInfo,
  } = useContext(AppContext);

  let thisProperty = properties.find((property) => {
    return property._id === propertyID;
  });

  const [formState, setFormState] = useState({
    propertyID: propertyID,
    name: thisProperty.name,
    address: thisProperty.address,
  });

  const updateInput = (e, thingToUpdate) => {
    setFormState({ ...formState, [thingToUpdate]: e.target.value });
  };

  console.log({ thisProperty });

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div>
      <h3>Edit Property</h3>
      <div>
        Name
        <input
          type="text"
          value={formState.name}
          onChange={(e) => {
            updateInput(e, "name");
          }}
        />
      </div>
      <div>
        Address
        <input
          type="text"
          value={formState.address}
          onChange={(e) => {
            updateInput(e, "address");
          }}
        />
      </div>

      <button
        onClick={() => {
          updatePropertyInfo(formState);
          // fetchProperties();
          stopEditing();
          // navigate("/properties");
        }}
      >
        Submit
      </button>
    </div>
  );
}
