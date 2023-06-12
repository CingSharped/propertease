import React from "react";
import { Routes, Route } from "react-router-dom";
import * as Pages from "./Pages";
import { NavBar } from "./components";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Pages.Home />} />
          <Route path="/ifc" element={<Pages.IfcViewer />} />
          <Route
            path="/LandlordDashboard"
            element={<Pages.LandlordDashboard />}
          />
          <Route path="/TenantDashboard" element={<Pages.TenantDashboard />} />
          <Route path="/Maintainance" element={<Pages.Maintainance />} />
          <Route path="/Property" element={<Pages.Property />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
