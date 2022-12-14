import { createContext, useState } from "react";
import axios from "axios";

const AppContext = createContext();

// export const UserProvider = (props) => {
// const { children } = props;

export const AppProps = ({ children }) => {
  // -=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=- SCHEMAS -=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-

  const [properties, setProperties] = useState([]);
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);

  // -=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=- SCHEMAS -=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-

  // -=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=- PROPERTY PROPS -=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-

  const fetchProperties = () => {
    console.log("fetchProperties");
    axios
      .get("http://localhost:5005/property/all")
      .then((response) => {
        console.log(response);
        setProperties(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendPropertyInfo = (formState) => {
    console.log("formState");
    console.log({ formState });
    axios
      .post("http://localhost:5005/property/create", {
        name: formState.name,
        address: formState.address,
      })
      .then((response) => {
        console.log("{ response }");
        console.log({ response });
        fetchProperties();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProperty = (propertyId) => {
    axios
      .post("http://localhost:5005/property/delete/" + propertyId)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // -=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=- PROPERTY PROPS -=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-

  // -=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=- REQUEST PROPS -=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-

  const fetchRequests = () => {
    axios
      .get("http://localhost:5005/request/all")
      .then((response) => {
        console.log(response);
        setRequests(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendRequestInfo = (formState) => {
    console.log(formState);
    axios
      .post("http://localhost:5005/request/create", {
        property: formState.property,
        description: formState.description,
        dueDate: formState.dueDate,
        assignedTo: formState.assignedTo,
      })
      .then((response) => {
        console.log({ response });
        // fetchProperties();
        fetchRequests();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteRequest = (requestId) => {
    axios
      .post("http://localhost:5005/request/delete/" + requestId)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // -=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=- REQUEST PROPS -=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-

  // -=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=- USER PROPS -=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-

  const fetchUsers = () => {
    axios
      .get("http://localhost:5005/user/all")
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = (userID) => {
    axios
      .post("http://localhost:5005/user/delete/" + userID)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // -=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=- USER PROPS -=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-

  return (
    // which states/functions we want as global variables. you have to pass the value in order for it to be available.
    <AppContext.Provider
      value={{
        properties,
        fetchProperties,
        sendPropertyInfo,
        deleteProperty,
        requests,
        fetchRequests,
        sendRequestInfo,
        deleteRequest,
        users,
        fetchUsers,
        deleteUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

// To Create a Context
// 1. Create a context.jsx file, add all necessary boilerplate code and the states
// 2. Wrap your App with the contextProvider in App.js
// 3. Use useContext(contextName) method to get your state values in any component you want.
