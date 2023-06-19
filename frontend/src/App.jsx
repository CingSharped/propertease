import React from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Pages from "./Pages";
import { NavBar } from './components';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Pages.Home />} />
          <Route path="/ifc" element={<Pages.IfcViewer />} />
          <Route path="/login" element={<Pages.LoginSignUp />} />
          <Route path="/maintenance-request" element={<Pages.MaintenanceRequest/>} />
          <Route path= "/landlord" element={<Pages.Landlord/>} />
          <Route path= "/tenant" element={<Pages.Tenant/>} />
          <Route path= "/service" element={<Pages.Service/>} />
          {/* <Route path= "/DashboardModal" element={<Pages.DashboardModal/>} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
