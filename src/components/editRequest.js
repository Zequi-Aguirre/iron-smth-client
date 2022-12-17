import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";

export default function EditRequest() {
  const navigate = useNavigate();

  const { requestID } = useParams();

  const {
    properties,
    fetchProperties,
    sendRequestInfo,
    users,
    fetchUsers,
    fetchRequests,
    requests,
    editRequest,
    edit,
    stopEditing,
  } = useContext(AppContext);

  console.log({ requestID });
  console.log({ requests });

  const thisRequest = requests.filter((request) => {
    return request._id === requestID;
  });

  console.log({ thisRequest: thisRequest[0] });

  const [formState, setFormState] = useState({
    requestID: requestID,
    property: thisRequest[0].property,
    description: thisRequest[0].description,
    dueDate: thisRequest[0].dueDate,
    assignedTo: thisRequest[0].assignedTo,
    status: thisRequest[0].status,
  });

  const updateInput = (e, thingToUpdate) => {
    setFormState({ ...formState, [thingToUpdate]: e.target.value });
  };

  console.log(formState);

  let propertiesSelector = properties.map((property) => {
    if (thisRequest[0].property._id === property._id) {
      return (
        <option value={property._id} key={property._id} selected>
          {property.name}
        </option>
      );
    } else {
      return (
        <option value={property._id} key={property._id}>
          {property.name}
        </option>
      );
    }
  });

  let userSelector = users.map((user) => {
    console.log(thisRequest[0].assignedTo);
    console.log(user._id);
    if (thisRequest[0].assignedTo[0] === user._id) {
      return (
        <option value={user._id} key={user._id} selected>
          {user.email}
        </option>
      );
    } else {
      return (
        <option value={user._id} key={user._id}>
          {user.email}
        </option>
      );
    }
  });

  const status = ["Not Started", "In Progress", "Finished"];

  let statusSelector = status.map((status) => {
    console.log(thisRequest[0].status);
    console.log({ status });
    if (thisRequest[0].status === status) {
      return (
        <option value={status} key={status} selected>
          {status}
        </option>
      );
    } else {
      return (
        <option value={status} key={status}>
          {status}
        </option>
      );
    }
  });

  let formValid =
    formState.property !== "" &&
    formState.description !== "" &&
    formState.date !== "" &&
    formState.assignedTo !== "" &&
    formState.status !== "";

  useEffect(() => {
    fetchRequests();
    fetchProperties();
    fetchUsers();
  }, []);

  return (
    <div>
      <h3>Edit Request</h3>
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
      <div>
        Status:
        <select
          name="status"
          id="status"
          onChange={(e) => {
            updateInput(e, "status");
          }}
        >
          {statusSelector}
        </select>
      </div>

      <button
        disabled={!formValid}
        onClick={() => {
          editRequest(formState);
          stopEditing();
          // fetchRequests();

          // navigate("/properties");
        }}
      >
        Submit
      </button>
      <button
        onClick={() => {
          stopEditing();
        }}
      >
        Cancel Edit
      </button>
    </div>
  );
}
