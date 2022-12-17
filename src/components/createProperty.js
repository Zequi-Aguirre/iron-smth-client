import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";

export default function CreateProperty() {
  const navigate = useNavigate();

  const [addFromFUB, setAddFromFUB] = useState(false);

  const { properties, sendPropertyInfo, fetchProperties, submitAddFromFUB } =
    useContext(AppContext);

  const [formState, setFormState] = useState({
    name: "",
    address: "",
    leadID: "",
  });

  const updateInput = (e, thingToUpdate) => {
    setFormState({ ...formState, [thingToUpdate]: e.target.value });
    console.log(formState);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (!addFromFUB) {
    return (
      <div>
        <button
          onClick={() => {
            setAddFromFUB(true);
          }}
        >
          Add From FUB
        </button>
        <h3>Add a Property</h3>
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
            sendPropertyInfo(formState);
            // fetchProperties();
            setFormState({
              name: "",
              address: "",
            });
            // navigate("/properties");
          }}
        >
          Submit
        </button>
      </div>
    );
  } else if (addFromFUB) {
    return (
      <div>
        <button
          onClick={() => {
            setAddFromFUB(false);
          }}
        >
          Add Manually
        </button>
        <h3>Add from FUB</h3>
        <div>
          Lead ID{" "}
          <input
            type="text"
            value={formState.leadID}
            onChange={(e) => {
              updateInput(e, "leadID");
            }}
          />
        </div>

        <button
          onClick={() => {
            submitAddFromFUB(formState);
            // fetchProperties();
            setFormState({
              name: "",
              address: "",
              leadID: "",
            });
            // navigate("/properties");
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}
