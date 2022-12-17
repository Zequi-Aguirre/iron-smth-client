import "./App.css";
import Nav from "./components/Nav";
import { UserProvider } from "./contexts/UserContext";
import { AppProps } from "./contexts/AppContext";
import { Route, Routes } from "react-router-dom";
import AllProperties from "./components/allProperties";
import CreateProperty from "./components/createProperty";
import AllRequests from "./components/allRequests";
import CreateRequest from "./components/createRequest";
import SignupOrLogin from "./components/signup";
import UserProfile from "./components/userProfile";
import PropertyDetails from "./components/propertyDetails";
import AllUsers from "./components/allUsers";
import Faq from "./components/faq";
import HomePage from "./components/homePage";
import RequestDetails from "./components/requestDetails";
import AppContext from "./contexts/AppContext";
import UserContext from "./contexts/UserContext";

import React, { useContext } from "react";
import UserDetails from "./components/userDetails";

function App() {
  return (
    <div className="main">
      <UserProvider>
        <AppProps>
          {/* wrapping our entire App here so that we can use the context values anywhere within UserProvider */}
          <Nav />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<AllProperties />} />
            <Route path="/property/:propertyID" element={<PropertyDetails />} />
            <Route path="/requests" element={<AllRequests />} />
            <Route path="/requests/:requestID" element={<RequestDetails />} />
            <Route path="/signup" element={<SignupOrLogin action="signup" />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/users/:userID" element={<UserDetails />} />
          </Routes>
        </AppProps>
      </UserProvider>
    </div>
  );
}

export default App;
