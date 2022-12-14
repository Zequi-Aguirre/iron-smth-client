import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";

export default function CreateRequest() {
  const navigate = useNavigate();

  const {
    properties,
    fetchProperties,
    sendRequestInfo,
    users,
    fetchUsers,
    fetchRequests,
  } = useContext(AppContext);

  const [formState, setFormState] = useState({
    property: "",
    description: "",
    dueDate: "",
    assignedTo: "",
  });

  const updateInput = (e, thingToUpdate) => {
    setFormState({ ...formState, [thingToUpdate]: e.target.value });
  };

  console.log(formState);

  let propertiesSelector = properties.map((property) => {
    return (
      <option value={property._id} key={property._id}>
        {property.name}
      </option>
    );
  });

  let userSelector = users.map((user) => {
    return (
      <option value={user._id} key={user._id}>
        {user.email}
      </option>
    );
  });

  let formValid =
    formState.property !== "" &&
    formState.description !== "" &&
    formState.date !== "" &&
    formState.assignedTo !== "";

  useEffect(() => {
    fetchRequests();
    fetchProperties();
    fetchUsers();
  }, []);

  return (
    <div>
      <h3>Add Request</h3>
      <div>
        Property
        <select
          name="property"
          id="propertySelector"
          onChange={(e) => {
            updateInput(e, "property");
          }}
        >
          <option value="" key="selectProperty">
            Select Property
          </option>
          {propertiesSelector}
        </select>
      </div>
      <div>
        Description
        <input
          type="text"
          value={formState.description}
          onChange={(e) => {
            updateInput(e, "description");
          }}
        />
      </div>

      <div>
        Due Date
        <input
          type="date"
          value={formState.dueDate}
          onChange={(e) => {
            updateInput(e, "dueDate");
          }}
        />
      </div>

      <div>
        Assign To:
        <select
          name="assignedTo"
          id="assignedTo"
          onChange={(e) => {
            updateInput(e, "assignedTo");
          }}
        >
          <option value="">Select Person</option>
          {userSelector}
        </select>
      </div>

      <button
        disabled={!formValid}
        onClick={() => {
          sendRequestInfo(formState);
          // fetchRequests();

          // navigate("/properties");
        }}
      >
        Submit
      </button>
    </div>
  );
}
