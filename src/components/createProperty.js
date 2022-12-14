import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";

export default function CreateProperty() {
  const navigate = useNavigate();

  const { properties, sendPropertyInfo, fetchProperties } =
    useContext(AppContext);

  const [formState, setFormState] = useState({
    name: "",
    address: "",
  });

  const updateInput = (e, thingToUpdate) => {
    setFormState({ ...formState, [thingToUpdate]: e.target.value });
  };

  console.log({ properties });

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div>
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
}
